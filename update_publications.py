
import json
from scholarly import scholarly

def fetch_publications(author_id):
    print(f"Fetching publications for author ID: {author_id}...")
    search_query = scholarly.search_author_id(author_id)
    author = scholarly.fill(search_query)
    
    pubs_list = []
    
    for pub in author['publications']:
        # Fill specific publication to get full details including author names
        try:
            filled_pub = scholarly.fill(pub)
            bib = filled_pub.get('bib', {})
        except Exception as e:
            print(f"Warning: Could not fill publication details: {e}")
            bib = pub.get('bib', {})
        
        # Determine type based on venue or fields
        pub_type = "Conference Paper"
        if "Journal" in bib.get('citation', '') or "Journal" in bib.get('venue', ''):
             pub_type = "Journal Article"
        
        entry = {
            "title": bib.get('title', 'Untitled'),
            "authors": bib.get('author', 'Unknown'),
            "venue": bib.get('citation', bib.get('venue', 'Unknown Venue')),
            "year": bib.get('pub_year', 'N/A'),
            "type": pub_type,
            "link": f"https://scholar.google.com/citations?view_op=view_citation&hl=en&user={author_id}&citation_for_view={pub.get('author_pub_id','')}"
        }
        pubs_list.append(entry)
        print(f"Found: {entry['title']} ({entry['year']})")

    # Sort by year descending
    pubs_list.sort(key=lambda x: x['year'], reverse=True)
    
    return pubs_list

if __name__ == "__main__":
    AUTHOR_ID = '4EihBncAAAAJ'
    try:
        publications = fetch_publications(AUTHOR_ID)
        
        with open('publications.json', 'w') as f:
            json.dump(publications, f, indent=4)
            
        print("\nSuccess! 'publications.json' has been updated.")
        print("To verify, open your website with: python -m http.server")
        
    except Exception as e:
        print(f"Error fetching data: {e}")
        print("Make sure you have installed scholarly: pip install scholarly")
