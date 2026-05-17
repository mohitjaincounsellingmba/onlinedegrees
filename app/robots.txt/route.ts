import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export function GET() {
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/

Sitemap: https://onlineshiksha.online/sitemap.xml
`;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
