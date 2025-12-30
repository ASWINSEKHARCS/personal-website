import json
from scholarly import scholarly

AUTHOR_ID = '4EihBncAAAAJ'

print(f"Fetching author {AUTHOR_ID}...")
search_query = scholarly.search_author_id(AUTHOR_ID)
author = scholarly.fill(search_query)

print(f"Found {len(author.get('publications', []))} publications.")

if author['publications']:
    pub = author['publications'][0]
    print("\n--- First Publication (Raw) ---")
    print(json.dumps(pub.get('bib', {}), indent=2))
    
    print("\n--- Filling Publication ---")
    try:
        filled_pub = scholarly.fill(pub)
        print(json.dumps(filled_pub.get('bib', {}), indent=2))
    except Exception as e:
        print(f"Error filling publication: {e}")
