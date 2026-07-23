const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
const statePath = path.join(__dirname, 'indexing-state.json');
const keyPath = path.join(__dirname, '../service-account.json');

// Default daily limit for Google Indexing API is 200 URL requests
const DAILY_LIMIT = parseInt(process.env.LIMIT || '200', 10);
const DRY_RUN = process.argv.includes('--dry-run') || !fs.existsSync(keyPath);

async function main() {
  console.log('🚀 Starting Google Search Console Indexing Submission Tool...');
  
  // 1. Verify sitemap.xml exists
  if (!fs.existsSync(sitemapPath)) {
    console.error(`❌ Error: Sitemap not found at ${sitemapPath}`);
    console.log('💡 Run "npm run build" or "node scripts/generate-sitemap.js" first to generate the sitemap.');
    process.exit(1);
  }

  // 2. Load or initialize indexing state
  let state = { submitted: {}, lastRun: null };
  if (fs.existsSync(statePath)) {
    try {
      state = JSON.parse(fs.readFileSync(statePath, 'utf8'));
    } catch (e) {
      console.warn('⚠️ Warning: Failed to parse indexing-state.json. Initializing new state.');
    }
  }

  // 3. Read sitemap.xml and extract URLs
  console.log('📁 Reading sitemap.xml...');
  const sitemapXml = fs.readFileSync(sitemapPath, 'utf8');
  const locRegex = /<loc>([^<]+)<\/loc>/g;
  const urls = [];
  let match;
  
  while ((match = locRegex.exec(sitemapXml)) !== null) {
    urls.push(match[1].trim());
  }
  
  console.log(`✅ Found ${urls.length} total URLs in sitemap.xml.`);

  // 4. Filter for URLs not yet submitted
  const pendingUrls = urls.filter(url => !state.submitted[url]);
  console.log(`📝 Found ${pendingUrls.length} pending (unsubmitted) URLs.`);

  if (pendingUrls.length === 0) {
    console.log('🎉 All URLs are already submitted! Nothing to do.');
    process.exit(0);
  }

  // 5. Select batch of URLs to submit
  const batch = pendingUrls.slice(0, DAILY_LIMIT);
  console.log(`📦 Prepared a batch of ${batch.length} URLs for submission (Limit: ${DAILY_LIMIT}).`);

  // 6. Handle authentication
  let indexingClient = null;
  if (DRY_RUN) {
    if (!fs.existsSync(keyPath)) {
      console.log('\n⚠️  [DRY RUN MODE] service-account.json was not found in the root directory.');
      console.log('👉 To run in active mode, please:');
      console.log('   1. Obtain your Google Service Account key JSON file.');
      console.log('   2. Place it in the root folder as "service-account.json".');
      console.log('   3. Grant Owner permission to the service account email in Google Search Console.');
    } else {
      console.log('\n⚠️  [DRY RUN MODE] Run with absolute API calls disabled via command argument.');
    }
    console.log(`🧪 Running dry-run simulation for ${batch.length} URLs...\n`);
  } else {
    try {
      console.log('🔑 Authenticating with Google APIs...');
      const auth = new google.auth.GoogleAuth({
        keyFile: keyPath,
        scopes: ['https://www.googleapis.com/auth/indexing'],
      });
      const authClient = await auth.getClient();
      indexingClient = google.indexing({
        version: 'v3',
        auth: authClient,
      });
      console.log('✅ Google API authentication successful.');
    } catch (err) {
      console.error('❌ Google Authentication Error:', err.message);
      process.exit(1);
    }
  }

  // 7. Submit URLs in batch
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < batch.length; i++) {
    const url = batch[i];
    const indexNumber = i + 1;
    
    if (DRY_RUN) {
      console.log(`[DRY-RUN] [${indexNumber}/${batch.length}] Submit URL: ${url}`);
      state.submitted[url] = {
        dryRun: true,
        submittedAt: new Date().toISOString(),
      };
      successCount++;
    } else {
      try {
        console.log(`📤 [${indexNumber}/${batch.length}] Submitting: ${url}`);
        const response = await indexingClient.urlNotifications.publish({
          requestBody: {
            url: url,
            type: 'URL_UPDATED',
          },
        });
        
        state.submitted[url] = {
          dryRun: false,
          submittedAt: new Date().toISOString(),
          notifyTime: response.data.urlNotificationMetadata?.latestUpdate?.notifyTime || new Date().toISOString(),
        };
        successCount++;
        
        // Minor sleep to prevent rapid hammering of API endpoints
        await new Promise(resolve => setTimeout(resolve, 300));
      } catch (err) {
        failCount++;
        console.error(`❌ Failed to submit URL: ${url}`);
        console.error(`   Reason: ${err.response?.data?.error?.message || err.message}`);
        
        // Quota exceeded or permission errors should halt the entire execution
        if (err.response?.status === 403 || err.response?.status === 429) {
          console.error('\n🛑 Critical failure: API permission denied or daily quota exceeded.');
          console.error('👉 Please verify service account roles in Google Cloud and Search Console properties.');
          break;
        }
      }
    }

    // Save state dynamically after each submission to prevent loss in case of unexpected abort
    try {
      state.lastRun = new Date().toISOString();
      fs.writeFileSync(statePath, JSON.stringify(state, null, 2), 'utf8');
    } catch (saveErr) {
      console.error('⚠️ Failed to save state file:', saveErr.message);
    }
  }

  console.log('\n🏁 Submission batch completed.');
  console.log(`   - Successful submissions: ${successCount}`);
  console.log(`   - Failed submissions: ${failCount}`);
  console.log(`💡 State file saved to: scripts/indexing-state.json`);
  if (!DRY_RUN) {
    console.log(`👉 Remaining pending URLs to index: ${pendingUrls.length - successCount}`);
  }
}

main().catch(err => {
  console.error('💥 Fatal error in execution:', err);
  process.exit(1);
});
