const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Proxy para login
app.post('/api/proxy/session', async (req, res) => {
    try {
        const { apiUrl, email, password } = req.body;
        
        const response = await fetch(`https://${apiUrl}/api/session`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
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
            headers: {
                'Authorization': `Bearer ${token}`
            }
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
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Servir index.html para rutas no encontradas
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
