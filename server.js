const express = require('express');
const https = require('https');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Función para hacer requests HTTPS
function httpsRequest(url, options, data) {
    return new Promise((resolve, reject) => {
        const req = https.request(url, options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    resolve({
                        status: res.statusCode,
                        data: JSON.parse(body)
                    });
                } catch (e) {
                    resolve({
                        status: res.statusCode,
                        data: body
                    });
                }
            });
        });
        req.on('error', reject);
        if (data) req.write(JSON.stringify(data));
        req.end();
    });
}

// Proxy para login
app.post('/api/session', async (req, res) => {
    try {
        const { apiUrl, email, password } = req.body;
        
        const options = {
            hostname: apiUrl,
            path: '/api/session',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        const result = await httpsRequest(`https://${apiUrl}/api/session`, options, {
            email,
            password
        });
        
        res.status(result.status).json(result.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Proxy para dispositivos
app.get('/api/devices', async (req, res) => {
    try {
        const { apiUrl, token } = req.query;
        
        const options = {
            hostname: apiUrl,
            path: '/api/devices',
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        
        const result = await httpsRequest(`https://${apiUrl}/api/devices`, options);
        
        res.status(result.status).json(result.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Proxy para posiciones
app.get('/api/positions', async (req, res) => {
    try {
        const { apiUrl, token } = req.query;
        
        const options = {
            hostname: apiUrl,
            path: '/api/positions',
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        
        const result = await httpsRequest(`https://${apiUrl}/api/positions`, options);
        
        res.status(result.status).json(result.data);
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
