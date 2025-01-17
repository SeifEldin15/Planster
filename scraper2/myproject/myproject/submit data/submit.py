import json
import requests

# Define your API endpoint
API_ENDPOINT = "http://localhost:5000/api/venues"  # Replace with your actual API URL

# Read the JSON file containing venue data
with open("../imagedownloader/output.json", "r") as f:
    venues = json.load(f)

# Function to submit venue data to the API
def submit_venue(venue):
    # Handle rating conversion
    try:
        rating = float(venue.get("rating", 0))
    except (ValueError, TypeError):
        rating = 0

    # Handle reviews conversion
    try:
        reviews = int(venue.get("reviews", "0").replace(',', ''))
    except (ValueError, TypeError):
        reviews = 0

    # Clean up category by removing Unicode artifacts and extra whitespace
    category = venue.get("category", "not provided")
    if category:
        # Remove Unicode artifacts and trim whitespace
        category = category.split('·')[0].strip()
        # Remove all special Unicode characters including Â
        category = category.replace('\u00e2\u20ac\u00a2', '').replace('\u00C2', '').replace('Â', '').strip()
        # Remove any double spaces that might result from the cleaning
        category = ' '.join(category.split())

    # Prepare the data according to the Mongoose model
    venue_data = {
        "name": venue.get("name") if venue.get("name") else "Unknown Venue",
        "address": venue.get("address") if venue.get("address") else "Address not provided",
        "email": venue.get("email") if venue.get("email") else "info@venue.com",
        "phone": venue.get("phone") if venue.get("phone") else "Phone not provided",
        "website": venue.get("website") if venue.get("website") else "Website not provided",
        "image_url": venue.get("image_url") if venue.get("image_url") else "",
        "rating": rating if rating else 0,
        "reviews": reviews if reviews else 0,
        "category": category if category else "not provided",
        "hours": venue.get("hours") if venue.get("hours") else "Not specified",
        "original_url": venue.get("original_url") if venue.get("original_url") else "",
        "search_city": venue.get("search_city") if venue.get("search_city") else "sydney"
    }

    try:
        # Send a POST request to the API with the venue data
        response = requests.post(API_ENDPOINT, json=venue_data)
        
        # Check for successful submission
        response.raise_for_status()
        
        print(f"Successfully submitted: {venue['name']}")
    
    except requests.exceptions.RequestException as e:
        print(f"Error submitting {venue['name']}: {str(e)}")
        if hasattr(e.response, 'text'):
            print(f"Response details: {e.response.text}")

# Iterate over each venue and submit it to the API
for venue in venues:
    submit_venue(venue)

print("\nAll submissions complete!")
