from fastapi import FastAPI
import redis
import os

app = FastAPI()
app_env = os.getenv('APP_ENV', 'development')
# ATTENTION : 'conteneur-b' correspond au NAME du conteneur REDIS !!!!!!!!!!
r = redis.Redis(host='conteneur-b', port=6380)

@app.get("/stock/{item_id}")
def get_stock(item_id: str):
    return {"stock": r.get(item_id), "env": app_env}

@app.post("/stock/{item_id}/{quantity}")
def update_stock(item_id: str, quantity: int):
    r.set(item_id, quantity)
    return {"status": "updated", "env": app_env}