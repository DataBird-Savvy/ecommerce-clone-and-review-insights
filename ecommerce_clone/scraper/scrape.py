# scrape.py
import requests
from bs4 import BeautifulSoup
import pandas as pd

base_url = "https://books.toscrape.com/catalogue/page-{}.html"
all_books = []

for page in range(1, 4):  # scrape first 3 pages
    url = base_url.format(page)
    res = requests.get(url)
    soup = BeautifulSoup(res.text, 'html.parser')

    books = soup.select(".product_pod")
    for book in books:
        title = book.h3.a['title']
        price = book.select_one('.price_color').text
        availability = book.select_one('.availability').text.strip()
        rating = book.p['class'][1]
        book_url = "https://books.toscrape.com/catalogue/" + book.h3.a['href']
        image_url = "https://books.toscrape.com/" + book.img['src'].replace('../', '')
        
        all_books.append({
            "title": title,
            "price": price,
            "availability": availability,
            "rating": rating,
            "url": book_url,
            "image_url": image_url
        })

df = pd.DataFrame(all_books)
df.to_csv("ecommerce_clone/data/products.csv", index=False)
df.to_json("ecommerce_clone/data/products.json", indent=2)
print("Scraping completed. Saved to CSV and JSON.")
