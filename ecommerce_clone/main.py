from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import json
import os
import sys
from logger import logging
from exception import EComException

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/products")
def get_products(skip: int = 0, limit: int = 50, category: str = None):
    try:
        file_path = os.path.join("data", "products.json")

        if not os.path.exists(file_path):
            raise EComException("File not found: " + file_path, sys)

        with open(file_path, "r", encoding="utf-8") as f:
            raw_data = json.load(f)

        products = []
        categories_list = []

        for i in range(len(raw_data["title"])):
            cat = raw_data.get("category", {}).get(str(i), "Unknown")

            if cat not in categories_list:
                categories_list.append(cat)  # Maintain original order

            if category and cat != category:
                continue

            product = {
                "title": raw_data["title"][str(i)],
                "price": raw_data["price"][str(i)],
                "availability": raw_data["availability"][str(i)],
                "rating": raw_data["rating"][str(i)],
                "url": raw_data["url"][str(i)],
                "image_url": raw_data["image_url"][str(i)],
                "category": cat,
            }
            products.append(product)

        # Only sort products by title
        sorted_products = sorted(products, key=lambda x: x["title"].lower())

        return {
            "total": len(sorted_products),
            "items": sorted_products[skip: skip + limit],
            "categories": categories_list  # Not sorted
        }

    except Exception as e:
        logging.error(str(EComException(e, sys)))
        raise EComException(e, sys)


# Serve frontend files
static_path = os.path.join(os.path.dirname(__file__), "static")
app.mount("/", StaticFiles(directory=static_path, html=True), name="static")
