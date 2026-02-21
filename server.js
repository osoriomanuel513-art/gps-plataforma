const express = require('express');
const cors = require('cors');
const path = require('path');
const net = require('net');

const app = express();
const PORT = process.env.PORT || 3000;
const SINOTRACK_PORT = 8040;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Base de datos en memoria (sin sqlite3)
const db = {
    users: [
        { id: 1, email: 'Angelaltamirano991@gmail.com', password: 'Angelaltamirano991@', name: 'Angel Altamirano' }
    ],
    devices: [
        { id: 1, userId: 1, name: 'joy', uniqueId: '9176282743' }
    ],
    positions: []
};

// Login
app.post('/api/session', (req, res) => {
    const { email, password } = req.body;
    const user = db.users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    
    res.json({
        token: 'token_' + user.id,
        name: user.name,
        id: user.id
    });
});

// Obtener dispositivos
app.get('/api/devices', (req, res) => {
    res.json(db.devices);
});

// Obtener posiciones
app.get('/api/positions', (req, res) => {
    const positions = db.positions.slice(-100).reverse();
    res.json(positions);
});

// Guardar posición
app.post('/api/positions', (req, res) => {
    const { deviceId, latitude, longitude, speed } = req.body;
    
    if (!deviceId || latitude === undefined || longitude === undefined) {
        return res.status(400).json({ error: 'Faltan parámetros' });
    }
    
    const position = {
        id: db.positions.length + 1,
        deviceId,
        latitude,
        longitude,
        speed: speed || 0,
        timestamp: new Date().toISOString()
    };
    
    db.positions.push(position);
    res.json({ success: true, id: position.id });
});

// Crear dispositivo
app.post('/api/devices', (req, res) => {
    const { name, uniqueId } = req.body;
    
    if (!name || !uniqueId) {
        return res.status(400).json({ error: 'Faltan parámetros' });
    }
    
    const device = {
        id: db.devices.length + 1,
        userId: 1,
        name,
        uniqueId
    };
    
    db.devices.push(device);
    res.json(device);
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

// Servidor Sinotrack en puerto 8040
const sinotrackServer = net.createServer((socket) => {
    console.log('Cliente Sinotrack conectado');
    
    socket.on('data', (data) => {
        try {
            const message = data.toString().trim();
            console.log('Datos Sinotrack recibidos:', message);
            
            // Parsear formato Sinotrack: $GPRMC,lat,lng,speed,etc
            if (message.includes('$GPRMC') || message.includes('GPRMC')) {
                const parts = message.split(',');
                if (parts.length >= 5) {
                    const latitude = parseFloat(parts[2]);
                    const longitude = parseFloat(parts[3]);
                    const speed = parseFloat(parts[4]) || 0;
                    const deviceId = 1;
                    
                    if (!isNaN(latitude) && !isNaN(longitude)) {
                        const position = {
                            id: db.positions.length + 1,
                            deviceId,
                            latitude,
                            longitude,
                            speed,
                            timestamp: new Date().toISOString()
                        };
                        
                        db.positions.push(position);
                        console.log('Posición guardada:', latitude, longitude);
                        socket.write('OK\n');
                    }
                }
            }
        } catch (error) {
            console.error('Error procesando datos Sinotrack:', error);
        }
    });
    
    socket.on('end', () => {
        console.log('Cliente Sinotrack desconectado');
    });
    
    socket.on('error', (error) => {
        console.error('Error en socket Sinotrack:', error);
    });
});

sinotrackServer.listen(SINOTRACK_PORT, () => {
    console.log(`Servidor Sinotrack escuchando en puerto ${SINOTRACK_PORT}`);
});
