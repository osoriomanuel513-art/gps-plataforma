# Guía Avanzada - GPS Tracker

Características y configuraciones avanzadas para usuarios con experiencia.

## 1. Agregar Historial de Ubicaciones

Modifica `app.js` para guardar historial:

```javascript
// En la sección de GLOBAL STATE, agrega:
let state = {
    // ... estado existente ...
    locationHistory: {}  // Nuevo
};

// En la función loadPositions, agrega:
positions.forEach(pos => {
    state.positions[pos.deviceId] = pos;
    
    // Guardar en historial
    if (!state.locationHistory[pos.deviceId]) {
        state.locationHistory[pos.deviceId] = [];
    }
    state.locationHistory[pos.deviceId].push({
        lat: pos.latitude,
        lng: pos.longitude,
        time: pos.deviceTime,
        speed: pos.speed
    });
});
```

## 2. Dibujar Ruta en el Mapa

Agrega esta función a `app.js`:

```javascript
function drawRoute(deviceId) {
    const history = state.locationHistory[deviceId];
    if (!history || history.length < 2) return;
    
    const coordinates = history.map(h => [h.lat, h.lng]);
    
    const polyline = L.polyline(coordinates, {
        color: '#2563eb',
        weight: 3,
        opacity: 0.7,
        dashArray: '5, 5'
    }).addTo(state.map);
    
    state.map.fitBounds(polyline.getBounds());
}
```

Llámalo cuando selecciones un dispositivo:
```javascript
function selectDevice(deviceId) {
    // ... código existente ...
    drawRoute(deviceId);
}
```

## 3. Exportar Datos a CSV

Agrega esta función a `app.js`:

```javascript
function exportToCSV() {
    let csv = 'Dispositivo,Latitud,Longitud,Velocidad,Hora\n';
    
    state.devices.forEach(device => {
        const pos = state.positions[device.id];
        if (pos) {
            csv += `${device.name},${pos.latitude},${pos.longitude},${pos.speed},${pos.deviceTime}\n`;
        }
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dispositivos.csv';
    a.click();
}
```

Agrega un botón en `index.html`:
```html
<button onclick="exportToCSV()" class="btn-export">Descargar CSV</button>
```

## 4. Notificaciones en Tiempo Real

Agrega esta función a `app.js`:

```javascript
function checkDeviceAlerts() {
    state.devices.forEach(device => {
        const pos = state.positions[device.id];
        if (!pos) return;
        
        // Alerta si velocidad es muy alta
        if (pos.speed > 120) {
            showNotification(`⚠️ ${device.name} excede velocidad límite: ${pos.speed} km/h`);
        }
        
        // Alerta si está offline
        if (!isDeviceOnline(pos)) {
            showNotification(`🔴 ${device.name} está fuera de línea`);
        }
    });
}

function showNotification(message) {
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('GPS Tracker', { body: message });
    }
}

// Solicitar permiso al iniciar
if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
}
```

## 5. Geofencing (Zonas de Alerta)

Agrega esta función a `app.js`:

```javascript
const GEOFENCES = [
    { name: 'Oficina', lat: 40.7128, lng: -74.0060, radius: 500 },
    { name: 'Almacén', lat: 40.7580, lng: -73.9855, radius: 300 }
];

function checkGeofences() {
    state.devices.forEach(device => {
        const pos = state.positions[device.id];
        if (!pos) return;
        
        GEOFENCES.forEach(fence => {
            const distance = calculateDistance(
                pos.latitude, pos.longitude,
                fence.lat, fence.lng
            );
            
            if (distance < fence.radius) {
                console.log(`${device.name} está en ${fence.name}`);
            }
        });
    });
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radio de la Tierra en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c * 1000; // Retorna en metros
}
```

## 6. Gráficos de Velocidad

Agrega en `index.html`:
```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```

Agrega esta función a `app.js`:

```javascript
function showSpeedChart(deviceId) {
    const history = state.locationHistory[deviceId];
    if (!history) return;
    
    const ctx = document.getElementById('speedChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: history.map(h => new Date(h.time).toLocaleTimeString()),
            datasets: [{
                label: 'Velocidad (km/h)',
                data: history.map(h => h.speed),
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}
```

## 7. Búsqueda de Dispositivos

Agrega en `index.html`:
```html
<input type="text" id="searchDevices" placeholder="Buscar dispositivo...">
```

Agrega esta función a `app.js`:

```javascript
document.getElementById('searchDevices').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const items = document.querySelectorAll('.device-item');
    
    items.forEach(item => {
        const name = item.querySelector('.device-name').textContent.toLowerCase();
        item.style.display = name.includes(query) ? 'block' : 'none';
    });
});
```

## 8. Modo Oscuro

Agrega en `styles.css`:

```css
body.dark-mode {
    --bg-color: #1e293b;
    --card-bg: #0f172a;
    --text-primary: #f1f5f9;
    --text-secondary: #cbd5e1;
    --border-color: #334155;
}
```

Agrega en `app.js`:

```javascript
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Cargar preferencia guardada
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}
```

## 9. Almacenamiento Local (LocalStorage)

Guarda credenciales (con cuidado):

```javascript
// Guardar credenciales
function saveCredentials(apiUrl, username) {
    localStorage.setItem('apiUrl', apiUrl);
    localStorage.setItem('username', username);
}

// Cargar credenciales
function loadCredentials() {
    apiUrlInput.value = localStorage.getItem('apiUrl') || '';
    usernameInput.value = localStorage.getItem('username') || '';
}

// Llamar al cargar
document.addEventListener('DOMContentLoaded', loadCredentials);
```

## 10. Filtros Avanzados

Agrega en `index.html`:
```html
<div class="filters">
    <button onclick="filterOnline()">En línea</button>
    <button onclick="filterOffline()">Fuera de línea</button>
    <button onclick="filterAll()">Todos</button>
</div>
```

Agrega en `app.js`:

```javascript
let currentFilter = 'all';

function filterOnline() {
    currentFilter = 'online';
    renderDevicesList();
}

function filterOffline() {
    currentFilter = 'offline';
    renderDevicesList();
}

function filterAll() {
    currentFilter = 'all';
    renderDevicesList();
}

// Modifica renderDevicesList para aplicar filtro
function renderDevicesList() {
    devicesList.innerHTML = '';
    
    const filtered = state.devices.filter(device => {
        const pos = state.positions[device.id];
        const isOnline = pos && isDeviceOnline(pos);
        
        if (currentFilter === 'online') return isOnline;
        if (currentFilter === 'offline') return !isOnline;
        return true;
    });
    
    // ... resto del código ...
}
```

## 11. API Personalizada

Para conectar a tu propia API:

```javascript
async function customApiCall(endpoint, method = 'GET', data = null) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${state.token}`
        }
    };
    
    if (data) {
        options.body = JSON.stringify(data);
    }
    
    const response = await fetch(`${state.apiUrl}${endpoint}`, options);
    return response.json();
}

// Uso:
// const devices = await customApiCall('/api/devices');
```

## 12. Manejo de Errores Mejorado

```javascript
async function safeApiCall(fn, errorMessage) {
    try {
        return await fn();
    } catch (error) {
        console.error(errorMessage, error);
        showNotification(`❌ ${errorMessage}`);
        return null;
    }
}

// Uso:
// await safeApiCall(() => loadDevices(), 'Error al cargar dispositivos');
```

## 13. Caché de Datos

```javascript
const cache = {
    devices: null,
    positions: null,
    timestamp: 0
};

async function loadDevicesWithCache() {
    const now = Date.now();
    
    // Si el caché es menor a 5 minutos, usar caché
    if (cache.devices && (now - cache.timestamp) < 300000) {
        state.devices = cache.devices;
        return;
    }
    
    await loadDevices();
    cache.devices = state.devices;
    cache.timestamp = now;
}
```

## 14. Estadísticas

```javascript
function getStatistics() {
    const stats = {
        totalDevices: state.devices.length,
        onlineDevices: 0,
        offlineDevices: 0,
        averageSpeed: 0,
        maxSpeed: 0
    };
    
    let totalSpeed = 0;
    
    state.devices.forEach(device => {
        const pos = state.positions[device.id];
        if (!pos) return;
        
        if (isDeviceOnline(pos)) {
            stats.onlineDevices++;
        } else {
            stats.offlineDevices++;
        }
        
        totalSpeed += pos.speed || 0;
        stats.maxSpeed = Math.max(stats.maxSpeed, pos.speed || 0);
    });
    
    stats.averageSpeed = Math.round(totalSpeed / state.devices.length);
    
    return stats;
}
```

## 15. Integración con Webhooks

```javascript
async function sendWebhook(event, data) {
    const webhookUrl = 'https://tu-servidor.com/webhook';
    
    try {
        await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ event, data, timestamp: new Date() })
        });
    } catch (error) {
        console.error('Error enviando webhook:', error);
    }
}

// Uso:
// sendWebhook('device_offline', { deviceId: 123, deviceName: 'Vehículo 1' });
```

---

## Recursos Útiles

- [Leaflet Documentation](https://leafletjs.com/)
- [Traccar API](https://www.traccar.org/api/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Chart.js](https://www.chartjs.org/)

---

¡Explora estas características y personaliza tu plataforma según tus necesidades!
