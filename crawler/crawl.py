#!/usr/bin/env python3
"""Web Crawler

A simple, configurable crawler that starts from a given URL, follows internal links up to a
specified depth, and saves extracted data (page title, meta description, URL, and outbound
links) as JSON.

Features
--------
* Configurable start URL, maximum depth, and output file.
* Limits crawling to the same domain to avoid unintentionally scraping external sites.
* Respects a short delay between requests (default 1 s) to be polite.
* Graceful error handling – skips pages that cannot be fetched.
* JSON output ready for downstream processing or analysis.

Usage
-----
```bash
python3 crawl.py --start https://example.com --depth 2 --output crawl_results.json
```

You can also view help:
```bash
python3 crawl.py -h
```
"""

import argparse
import json
import time
import urllib.parse
from collections import deque
from pathlib import Path

import requests
from bs4 import BeautifulSoup

# ---------------------------------------------------------------------------
# Helper functions
# ---------------------------------------------------------------------------

def is_same_domain(base_url: str, target_url: str) -> bool:
    """Return True if *target_url* belongs to the same domain as *base_url*.

    This guards the crawler against wandering off‑site.
    """
    base = urllib.parse.urlparse(base_url)
    target = urllib.parse.urlparse(target_url)
    return base.netloc == target.netloc

def normalize_url(base_url: str, link: str) -> str:
    """Resolve *link* (which may be relative) against *base_url* and return an
    absolute URL string.
    """
    return urllib.parse.urljoin(base_url, link)

def extract_page_data(url: str) -> dict:
    """Fetch *url* and return a dictionary with the information we care about.

    The dictionary contains:
    * ``url`` – the page URL (canonicalized).
    * ``title`` – the ``<title>`` tag content (or ``None``).
    * ``description`` – the content of the ``meta[name="description"]`` tag.
    * ``links`` – a list of absolute URLs found in ``<a href=…>`` tags.
    """
    try:
        resp = requests.get(url, timeout=10, headers={"User-Agent": "AntigravityCrawler/1.0"})
        resp.raise_for_status()
    except Exception as e:
        print(f"[⚠️] Failed to fetch {url}: {e}")
        return {"url": url, "title": None, "description": None, "links": []}

    soup = BeautifulSoup(resp.text, "lxml")
    title_tag = soup.find("title")
    title = title_tag.get_text(strip=True) if title_tag else None

    description_tag = soup.find("meta", attrs={"name": "description"})
    description = description_tag["content"].strip() if description_tag and description_tag.get("content") else None

    raw_links = [a.get("href") for a in soup.find_all("a", href=True)]
    # Resolve relative URLs and deduplicate
    links = list({normalize_url(url, link) for link in raw_links if link})

    return {"url": url, "title": title, "description": description, "links": links}

# ---------------------------------------------------------------------------
# Main crawling routine
# ---------------------------------------------------------------------------

def crawl(start_url: str, max_depth: int, delay: float = 1.0) -> list:
    """Bread‑first crawl starting from *start_url* up to *max_depth*.

    Returns a list of page dictionaries (as produced by ``extract_page_data``).
    """
    visited = set()
    results = []
    queue = deque([(start_url, 0)])

    while queue:
        current_url, depth = queue.popleft()
        if current_url in visited or depth > max_depth:
            continue
        visited.add(current_url)
        print(f"[🔎] Crawling (depth {depth}): {current_url}")
        page_data = extract_page_data(current_url)
        results.append(page_data)
        # Enqueue internal links for the next depth level
        if depth < max_depth:
            for link in page_data["links"]:
                if is_same_domain(start_url, link) and link not in visited:
                    queue.append((link, depth + 1))
        time.sleep(delay)
    return results

# ---------------------------------------------------------------------------
# CLI entry point
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(description="Simple site crawler.")
    parser.add_argument("--start", required=True, help="Root URL to start crawling from.")
    parser.add_argument("--depth", type=int, default=1, help="Maximum link depth to follow (default: 1).")
    parser.add_argument("--output", default="crawl_results.json", help="File to write JSON output (default: crawl_results.json).")
    parser.add_argument("--delay", type=float, default=1.0, help="Delay in seconds between requests (default: 1.0).")
    args = parser.parse_args()

    start_url = args.start.rstrip("/")
    results = crawl(start_url, args.depth, delay=args.delay)

    out_path = Path(args.output)
    out_path.write_text(json.dumps(results, indent=2, ensure_ascii=False))
    print(f"\n✅ Crawl finished – {len(results)} pages saved to {out_path.resolve()}")

if __name__ == "__main__":
    main()
