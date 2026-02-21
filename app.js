// ===== GLOBAL STATE =====
let state = {
    apiUrl: '',
    token: '',
    devices: [],
    positions: {},
    map: null,
    markers: {},
    selectedDeviceId: null,
    updateInterval: null
};

// ===== DOM ELEMENTS =====
const loginScreen = document.getElementById('loginScreen');
const dashboard = document.getElementById('dashboard');
const loginForm = document.getElementById('loginForm');
const apiUrlInput = document.getElementById('apiUrl');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginError = document.getElementById('loginError');
const logoutBtn = document.getElementById('logoutBtn');
const userInfo = document.getElementById('userInfo');
const devicesList = document.getElementById('devicesList');
const deviceCount = document.getElementById('deviceCount');
const devicePanel = document.getElementById('devicePanel');

// ===== LOGIN HANDLER =====
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const apiUrl = apiUrlInput.value.trim();
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    
    if (!apiUrl || !username || !password) {
        showLoginError('Por favor completa todos los campos');
        return;
    }
    
    try {
        loginError.classList.remove('show');
        await login(apiUrl, username, password);
    } catch (error) {
        showLoginError(error.message);
    }
});

// ===== LOGIN FUNCTION =====
async function login(apiUrl, username, password) {
    // Ensure URL has protocol
    if (apiUrl.startsWith('http')) {
        apiUrl = apiUrl.replace('https://', '').replace('http://', '');
    }
    
    try {
        // Usar servicio CORS público
        const corsUrl = 'https://cors-anywhere.herokuapp.com/';
        const traccarUrl = `https://${apiUrl}/api/session`;
        
        const response = await fetch(corsUrl + traccarUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Origin': window.location.origin
            },
            body: JSON.stringify({
                email: username,
                password: password
            })
        });
        
        if (!response.ok) {
            throw new Error('Credenciales inválidas');
        }
        
        const data = await response.json();
        
        if (!data.token) {
            throw new Error('No se recibió token de autenticación');
        }
        
        state.apiUrl = apiUrl;
        state.token = data.token;
        
        userInfo.textContent = `Usuario: ${data.name || username}`;
        
        // Show dashboard
        loginScreen.style.display = 'none';
        dashboard.classList.remove('hidden');
        
        // Initialize map
        initMap();
        
        // Load devices
        await loadDevices();
        
        // Start auto-update
        startAutoUpdate();
        
    } catch (error) {
        throw new Error(`Error de conexión: ${error.message}`);
    }
}

// ===== LOGOUT FUNCTION =====
logoutBtn.addEventListener('click', () => {
    logout();
});

function logout() {
    // Clear state
    state.token = '';
    state.devices = [];
    state.positions = {};
    state.selectedDeviceId = null;
    
    // Stop auto-update
    if (state.updateInterval) {
        clearInterval(state.updateInterval);
    }
    
    // Destroy map
    if (state.map) {
        state.map.remove();
        state.map = null;
    }
    
    // Clear markers
    state.markers = {};
    
    // Show login screen
    loginScreen.style.display = 'flex';
    dashboard.classList.add('hidden');
    
    // Clear inputs
    loginForm.reset();
}

// ===== MAP INITIALIZATION =====
function initMap() {
    if (state.map) {
        state.map.remove();
    }
    
    const mapContainer = document.getElementById('map');
    state.map = L.map(mapContainer).setView([20, 0], 2);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(state.map);
}

// ===== LOAD DEVICES =====
async function loadDevices() {
    try {
        const corsUrl = 'https://cors-anywhere.herokuapp.com/';
        const traccarUrl = `https://${state.apiUrl}/api/devices`;
        
        const response = await fetch(corsUrl + traccarUrl, {
            headers: {
                'Authorization': `Bearer ${state.token}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Error al cargar dispositivos');
        }
        
        state.devices = await response.json();
        deviceCount.textContent = state.devices.length;
        
        renderDevicesList();
        await loadPositions();
        
    } catch (error) {
        console.error('Error loading devices:', error);
        showLoginError('Error al cargar dispositivos');
    }
}

// ===== LOAD POSITIONS =====
async function loadPositions() {
    try {
        const corsUrl = 'https://cors-anywhere.herokuapp.com/';
        const traccarUrl = `https://${state.apiUrl}/api/positions`;
        
        const response = await fetch(corsUrl + traccarUrl, {
            headers: {
                'Authorization': `Bearer ${state.token}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Error al cargar posiciones');
        }
        
        const positions = await response.json();
        
        // Group positions by device
        positions.forEach(pos => {
            state.positions[pos.deviceId] = pos;
        });
        
        updateMapMarkers();
        renderDevicesList();
        
    } catch (error) {
        console.error('Error loading positions:', error);
    }
}

// ===== RENDER DEVICES LIST =====
function renderDevicesList() {
    devicesList.innerHTML = '';
    
    if (state.devices.length === 0) {
        devicesList.innerHTML = '<div class="loading">No hay dispositivos</div>';
        return;
    }
    
    state.devices.forEach(device => {
        const position = state.positions[device.id];
        const isOnline = position && isDeviceOnline(position);
        
        const deviceEl = document.createElement('div');
        deviceEl.className = `device-item ${state.selectedDeviceId === device.id ? 'active' : ''}`;
        deviceEl.innerHTML = `
            <div class="device-name">${device.name}</div>
            <div class="device-status">
                <span class="status-indicator ${isOnline ? 'online' : 'offline'}"></span>
                <span>${isOnline ? 'En línea' : 'Fuera de línea'}</span>
            </div>
        `;
        
        deviceEl.addEventListener('click', () => selectDevice(device.id));
        devicesList.appendChild(deviceEl);
    });
}

// ===== UPDATE MAP MARKERS =====
function updateMapMarkers() {
    state.devices.forEach(device => {
        const position = state.positions[device.id];
        
        if (!position || !position.latitude || !position.longitude) {
            return;
        }
        
        const isOnline = isDeviceOnline(position);
        const markerColor = isOnline ? '#10b981' : '#64748b';
        
        if (state.markers[device.id]) {
            // Update existing marker
            state.markers[device.id].setLatLng([position.latitude, position.longitude]);
        } else {
            // Create new marker
            const marker = L.circleMarker([position.latitude, position.longitude], {
                radius: 8,
                fillColor: markerColor,
                color: '#fff',
                weight: 2,
                opacity: 1,
                fillOpacity: 0.8
            }).addTo(state.map);
            
            marker.bindPopup(`
                <strong>${device.name}</strong><br>
                Velocidad: ${position.speed || 0} km/h<br>
                ${new Date(position.deviceTime).toLocaleString()}
            `);
            
            marker.on('click', () => selectDevice(device.id));
            
            state.markers[device.id] = marker;
        }
    });
}

// ===== SELECT DEVICE =====
function selectDevice(deviceId) {
    state.selectedDeviceId = deviceId;
    
    // Update active state in list
    document.querySelectorAll('.device-item').forEach(el => {
        el.classList.remove('active');
    });
    event.currentTarget?.classList.add('active');
    
    // Show device panel
    const device = state.devices.find(d => d.id === deviceId);
    const position = state.positions[deviceId];
    
    if (device && position) {
        showDevicePanel(device, position);
        
        // Center map on device
        if (position.latitude && position.longitude) {
            state.map.setView([position.latitude, position.longitude], 15);
        }
    }
}

// ===== SHOW DEVICE PANEL =====
function showDevicePanel(device, position) {
    const isOnline = isDeviceOnline(position);
    
    document.getElementById('panelTitle').textContent = device.name;
    document.getElementById('detailName').textContent = device.name;
    document.getElementById('detailStatus').textContent = isOnline ? 'En línea' : 'Fuera de línea';
    document.getElementById('detailStatus').className = `value status ${isOnline ? 'online' : 'offline'}`;
    document.getElementById('detailLat').textContent = position.latitude?.toFixed(6) || '-';
    document.getElementById('detailLng').textContent = position.longitude?.toFixed(6) || '-';
    document.getElementById('detailSpeed').textContent = `${position.speed || 0} km/h`;
    document.getElementById('detailTime').textContent = new Date(position.deviceTime).toLocaleString();
    
    devicePanel.classList.remove('hidden');
}

// ===== CLOSE DEVICE PANEL =====
function closeDevicePanel() {
    devicePanel.classList.add('hidden');
    state.selectedDeviceId = null;
    document.querySelectorAll('.device-item').forEach(el => {
        el.classList.remove('active');
    });
}

// ===== CHECK IF DEVICE IS ONLINE =====
function isDeviceOnline(position) {
    if (!position.deviceTime) return false;
    
    const lastUpdate = new Date(position.deviceTime).getTime();
    const now = new Date().getTime();
    const diffMinutes = (now - lastUpdate) / (1000 * 60);
    
    // Consider online if updated in last 5 minutes
    return diffMinutes < 5;
}

// ===== AUTO UPDATE =====
function startAutoUpdate() {
    // Update every 10 seconds
    state.updateInterval = setInterval(async () => {
        await loadPositions();
    }, 10000);
}

// ===== SHOW LOGIN ERROR =====
function showLoginError(message) {
    loginError.textContent = message;
    loginError.classList.add('show');
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    // Set default API URL
    if (apiUrlInput) apiUrlInput.value = 'traccar-production-5353.up.railway.app';
    if (usernameInput) usernameInput.value = 'Angelaltamirano991@gmail.com';
    if (passwordInput) passwordInput.value = 'Angelaltamirano991@';
});
