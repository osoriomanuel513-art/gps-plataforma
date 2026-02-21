const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname)));

// Proxy para login
app.post('/api/proxy/session', async (req, res) => {
    try {
        const { apiUrl, email, password } = req.body;
        const response = await fetch(`https://${apiUrl}/api/session`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Proxy para dispositivos
app.get('/api/proxy/devices', async (req, res) => {
    try {
        const { apiUrl, token } = req.query;
        const response = await fetch(`https://${apiUrl}/api/devices`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Proxy para posiciones
app.get('/api/proxy/positions', async (req, res) => {
    try {
        const { apiUrl, token } = req.query;
        const response = await fetch(`https://${apiUrl}/api/positions`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Servir index.html para todas las rutas
app.get('*', (req, res) => {
    const indexPath = path.join(__dirname, 'index.html');
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.status(404).send('index.html not found');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
