import requests
from bs4 import BeautifulSoup
import pandas as pd

base_site = "https://books.toscrape.com/"
category_url = base_site + "catalogue/category/books/"
all_books = []

# Step 1: Get all categories
response = requests.get(base_site)
soup = BeautifulSoup(response.text, "html.parser")
categories = soup.select("ul.nav-list ul li a")

category_links = {
    cat.text.strip(): base_site + cat['href']
    for cat in categories
}

# Step 2: Loop through each category
for category_name, url in category_links.items():
    print(f"Scraping category: {category_name}")
    
    while url:
        res = requests.get(url)
        soup = BeautifulSoup(res.text, 'html.parser')

        books = soup.select(".product_pod")
        for book in books:
            title = book.h3.a['title']
            price = book.select_one('.price_color').text
            availability = book.select_one('.availability').text.strip()
            rating = book.p['class'][1]
            book_url = base_site + "catalogue/" + book.h3.a['href'].replace('../../../', '')
            image_url = base_site + book.img['src'].replace('../', '')

            all_books.append({
                "category": category_name,
                "title": title,
                "price": price,
                "availability": availability,
                "rating": rating,
                "url": book_url,
                "image_url": image_url,
                "category": category_name,
            })

        # Next page if available
        next_btn = soup.select_one('li.next a')
        if next_btn:
            next_page = next_btn['href']
            url = "/".join(url.split("/")[:-1]) + "/" + next_page
        else:
            url = None

# Save to files
df = pd.DataFrame(all_books)
df.to_csv("data/products.csv", index=False)
df.to_json("data/products.json", indent=2)
print("Scraping completed. Saved to CSV and JSON.")
