# 🧠 Shopify Review Insights & E-Commerce Clone (AI-Powered)

This project was completed as part of a technical assignment for a **Remote AI ChatGPT Expert** role. It combines web scraping, frontend replication, and customer review analysis using AI tools such as **PandasAI**, **LangChain**, and **ChatGPT**.

---

## ✅ Assignment Overview

### Part 1: E-Commerce Site Cloning  
- Scraped data from a sample Shopify store.
- Recreated a static frontend layout using AI-assisted tools.
- Included screenshots of the cloned UI.
- **Output**: Structured product dataset + HTML replica.

### Part 2: Review Data Analysis  
- Cleaned and standardized a messy Shopify reviews dataset.
- Applied LLMs to answer business questions directly from the data.
- Used `PandasAI` integrated with `LangChain` to extract:
  - ✅ Top 5 compliments and complaints  
  - ✅ Category-wise rating trends  
  - ✅ Fulfillment and shipping insights  
  - ✅ Order value distribution patterns

---

## 🤖 Tech Stack

- **Python**, **Pandas**, **NumPy**
- **PandasAI**, **LangChain**, **OpenAI/Groq**
- **Jupyter Notebook** for EDA
- **Tabulate**, **Textwrap** for pretty output
- **VSCode**, `.env` for API key management

---

## 📝 Key Insights Delivered

- **Top 5 customer complaints and compliments:**

  ![Top feedback](image-4.png)

- **Average ratings per product category:**

  ![Category ratings](image.png)

- **Correlation between shipping country and low ratings:**

  ![Shipping vs ratings](image-1.png)

- **Do higher order values correlate with lower ratings?**

  ![Order value vs ratings](image-2.png)

- **Which fulfillment statuses are most associated with negative feedback?**

  ![Fulfillment status](image-3.png)

---

## 🖼 HTML Clone (Frontend)

- 🎥 [Loom Video Walkthrough](https://www.loom.com/share/3b36982bbb38442192fb1a59bc9e96e2?sid=76d88748-bb43-40ea-acf1-fa3f7ea35a33)

---

## 📁 Deliverables

- ✅ Cleaned Review CSV: `cleaned.csv`
- ✅ AI-Powered Insights Notebook: `dataprocessing.ipynb`
- ✅ Main Code File: `main.py` (SmartDataframe & LangChain)
- ✅ Static HTML Clone (Screenshots + Assets)
- ✅ This README.md Documentation

---

## ▶️ How to Run

```bash
# Install dependencies
pip install -r requirements.txt

# Run the main script
uvicorn main:app --reload
