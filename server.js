const express = require('express');
const cors = require('cors');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Base de datos
const db = new sqlite3.Database(':memory:');

// Crear tablas
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            email TEXT UNIQUE,
            password TEXT,
            name TEXT
        )
    `);
    
    db.run(`
        CREATE TABLE IF NOT EXISTS devices (
            id INTEGER PRIMARY KEY,
            userId INTEGER,
            name TEXT,
            uniqueId TEXT UNIQUE,
            FOREIGN KEY(userId) REFERENCES users(id)
        )
    `);
    
    db.run(`
        CREATE TABLE IF NOT EXISTS positions (
            id INTEGER PRIMARY KEY,
            deviceId INTEGER,
            latitude REAL,
            longitude REAL,
            speed REAL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(deviceId) REFERENCES devices(id)
        )
    `);
    
    // Insertar usuario de prueba
    db.run(`
        INSERT OR IGNORE INTO users (email, password, name) 
        VALUES (?, ?, ?)
    `, ['Angelaltamirano991@gmail.com', 'Angelaltamirano991@', 'Angel Altamirano']);
    
    // Insertar dispositivo de prueba
    db.run(`
        INSERT OR IGNORE INTO devices (userId, name, uniqueId) 
        VALUES (?, ?, ?)
    `, [1, 'joy', '9176282743']);
});

// Login
app.post('/api/session', (req, res) => {
    const { email, password } = req.body;
    
    db.get(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        [email, password],
        (err, user) => {
            if (err || !user) {
                return res.status(401).json({ error: 'Credenciales inválidas' });
            }
            res.json({
                token: 'token_' + user.id,
                name: user.name,
                id: user.id
            });
        }
    );
});

// Obtener dispositivos
app.get('/api/devices', (req, res) => {
    db.all('SELECT * FROM devices', (err, devices) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(devices || []);
    });
});

// Obtener posiciones
app.get('/api/positions', (req, res) => {
    db.all(`
        SELECT p.*, d.name as deviceName 
        FROM positions p 
        JOIN devices d ON p.deviceId = d.id 
        ORDER BY p.timestamp DESC 
        LIMIT 100
    `, (err, positions) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(positions || []);
    });
});

// Guardar posición (para GPS)
app.post('/api/positions', (req, res) => {
    const { deviceId, latitude, longitude, speed } = req.body;
    
    if (!deviceId || latitude === undefined || longitude === undefined) {
        return res.status(400).json({ error: 'Faltan parámetros' });
    }
    
    db.run(
        'INSERT INTO positions (deviceId, latitude, longitude, speed) VALUES (?, ?, ?, ?)',
        [deviceId, latitude, longitude, speed || 0],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID, success: true });
        }
    );
});

// Crear dispositivo
app.post('/api/devices', (req, res) => {
    const { name, uniqueId } = req.body;
    
    if (!name || !uniqueId) {
        return res.status(400).json({ error: 'Faltan parámetros' });
    }
    
    db.run(
        'INSERT INTO devices (userId, name, uniqueId) VALUES (?, ?, ?)',
        [1, name, uniqueId],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID, name, uniqueId });
        }
    );
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Servir index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
