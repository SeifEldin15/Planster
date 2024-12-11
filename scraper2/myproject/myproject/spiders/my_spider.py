from scrapy import Spider
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import re

class LocationSpider(Spider):
    name = "myspider"
    start_urls = [
        'https://www.google.com/maps/search/wedding+venues+sydney+cbd?hl=en',
    ]

    def __init__(self):
        self.driver = webdriver.Chrome() 

    def parse(self, response):
        self.driver.get(response.url)
        
        wait = WebDriverWait(self.driver, 10)
        wait.until(EC.presence_of_all_elements_located((By.CLASS_NAME, 'Nv2PK')))
        
        previous_venues_count = 0
        current_venues_count = 0
        scroll_attempts = 0
        max_scroll_attempts = 40  
        
        while scroll_attempts < max_scroll_attempts:
            venues = self.driver.find_elements(By.CLASS_NAME, 'Nv2PK')
            current_venues_count = len(venues)
            
            if current_venues_count == previous_venues_count:
                scroll_attempts += 1
                if scroll_attempts >= 3:
                    break
            else:
                scroll_attempts = 0
            
            previous_venues_count = current_venues_count
            self.driver.execute_script("arguments[0].scrollIntoView();", venues[-1])
            time.sleep(2)  
            
            try:
                show_more = self.driver.find_element(By.CSS_SELECTOR, "button[aria-label='Show more']")
                show_more.click()
                time.sleep(1)
            except:
                pass

        venues = self.driver.find_elements(By.CLASS_NAME, 'Nv2PK')
        processed_names = set()  
        
        for venue in venues:
            try:
                name = venue.find_element(By.CLASS_NAME, 'fontHeadlineSmall').text
                
                if name in processed_names:
                    continue
                    
                processed_names.add(name)

                # Extracting email and phone number from venue details or description
                details_text = venue.text
                
                email = self.extract_email(details_text)
                phone_number = self.extract_phone_number(details_text)

                try:
                    image_element = venue.find_element(By.CSS_SELECTOR, 'img[src^="https"]')
                    image_url = image_element.get_attribute('src')
                except:
                    image_url = None

                try:
                    details = venue.find_elements(By.CSS_SELECTOR, '.W4Efsd > *')
                    category = None
                    address = None
                    
                    if len(details) > 1:
                        second_element = details[1].text.strip()
                        if ' · ' in second_element:
                            category = second_element.split(' · ')[0].strip()
                        else:
                            category = second_element
                    
                    for detail in details[1:]:
                        text = detail.text.strip()
                        if text and text != "·":
                            if ' · ' in text:
                                address = text.split(' · ')[-1].strip()
                            else:
                                address = text
                            break
                            
                except Exception as e:
                    self.logger.error(f"Error extracting details: {str(e)}")
                    category = "Not available"
                    address = "Not available"

                try:
                    rating_element = venue.find_element(By.CLASS_NAME, 'MW4etd')
                    reviews_element = venue.find_element(By.CLASS_NAME, 'UY7F9')
                    rating = rating_element.text.strip() if rating_element else None
                    reviews = reviews_element.text.strip('()') if reviews_element else None
                except:
                    rating = None
                    reviews = None

                if name and name.strip():
                    yield {
                        'name': name.strip(),
                        'category': category.strip() if category else "Not available",
                        'address': address.strip() if address else "Not available",
                        'rating': rating,
                        'reviews': reviews,
                        'area': response.url.split('venues+')[-1].replace('+', ' '),
                        'image_url': image_url,
                        'email': email,
                        'phone_number': phone_number,
                    }
            except Exception as e:
                self.logger.error(f"Error processing venue: {str(e)}")
                continue

    def extract_email(self, text):
        """Extract email from the given text using regex."""
        email_pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
        emails_found = re.findall(email_pattern, text)
        return emails_found[0] if emails_found else None

    def extract_phone_number(self, text):
        """Extract phone number from the given text using regex."""
        phone_pattern = r'\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}'
        phones_found = re.findall(phone_pattern, text)
        return phones_found[0] if phones_found else None

    def closed(self, reason):
        self.driver.quit()
