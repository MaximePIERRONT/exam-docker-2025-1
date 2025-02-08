const express = require('express');
const { createClient } = require('redis');
const app = express();
app.use(express.json());

// ATTENTION container-b correspond au nom du container REDIS
const client = createClient({
    url: 'redis://container-b:6380'
});

client.connect().catch(console.error);

app.get('/stock/:itemId', async (req, res) => {
    const stock = await client.get(req.params.itemId);
    res.json({ stock, env: process.env.NODE_ENV });
});

app.post('/stock/:itemId/:quantity', async (req, res) => {
    await client.set(req.params.itemId, req.params.quantity);
    res.json({ status: "updated", env: process.env.NODE_ENV });
});

app.listen(5555, () => console.log('Server running'));