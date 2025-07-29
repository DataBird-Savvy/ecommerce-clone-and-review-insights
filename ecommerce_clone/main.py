from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import json
import os
import sys
from logger import logging
from exception import EComException

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Use your actual frontend origin if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)




@app.get("/products")
def get_products(skip: int = 0, limit: int = 6):
    try:
        file_path = os.path.join("data", "products.json")

        if not os.path.exists(file_path):
            raise EComException("File not found: " + file_path, sys)

        with open(file_path, "r", encoding="utf-8") as f:
            raw_data = json.load(f)

        products = []
        for i in range(len(raw_data["title"])):
            product = {
                "title": raw_data["title"][str(i)],
                "price": raw_data["price"][str(i)],
                "availability": raw_data["availability"][str(i)],
                "rating": raw_data["rating"][str(i)],
                "url": raw_data["url"][str(i)],
                "image_url": raw_data["image_url"][str(i)],
            }
            products.append(product)

        # Log full product count
        logging.info(f"Total products found: {len(products)}")

        # Log the items being returned (safe slice)
        logging.info(f"Returning products[{skip}:{skip + limit}]: {products[skip:skip + limit]}")

        return {
            "total": len(products),
            "items": products[skip: skip + limit]
        }

    except Exception as e:
        logging.error(str(EComException(e, sys)))
        raise EComException(e, sys)
static_path = os.path.join(os.path.dirname(__file__), "static")
app.mount("/", StaticFiles(directory=static_path, html=True), name="static")