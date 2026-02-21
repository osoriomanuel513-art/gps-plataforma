// ===== CONFIGURACION =====
const TRACCAR_API = '/api';

// ===== GLOBAL STATE =====
let state = {
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
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    
    if (!username || !password) {
        showLoginError('Por favor completa todos los campos');
        return;
    }
    
    try {
        loginError.classList.remove('show');
        await login(username, password);
    } catch (error) {
        showLoginError(error.message);
    }
});

// ===== LOGIN FUNCTION =====
async function login(username, password) {
    try {
        const response = await fetch(`${TRACCAR_API}/session`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            credentials: 'include',
            body: `email=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
        });
        
        if (!response.ok) {
            throw new Error('Credenciales inválidas');
        }
        
        const data = await response.json();
        state.token = data.token || btoa(`${username}:${password}`);
        
        userInfo.textContent = `Usuario: ${data.name || username}`;
        
        loginScreen.style.display = 'none';
        dashboard.classList.remove('hidden');
        
        initMap();
        await loadDevices();
        startAutoUpdate();
        
    } catch (error) {
        throw new Error(`Error de conexión: ${error.message}`);
    }
}

// ===== LOGOUT =====
logoutBtn.addEventListener('click', logout);

function logout() {
    state.token = '';
    state.devices = [];
    state.positions = {};
    state.selectedDeviceId = null;
    
    if (state.updateInterval) clearInterval(state.updateInterval);
    if (state.map) { state.map.remove(); state.map = null; }
    state.markers = {};
    
    loginScreen.style.display = 'flex';
    dashboard.classList.add('hidden');
    loginForm.reset();
}

// ===== MAP =====
function initMap() {
    if (state.map) state.map.remove();
    
    state.map = L.map('map').setView([-12.046374, -77.042793], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(state.map);
}

// ===== LOAD DEVICES =====
async function loadDevices() {
    try {
        const response = await fetch(`${TRACCAR_API}/devices`, {
            credentials: 'include',
            headers: { 'Accept': 'application/json' }
        });
        
        if (!response.ok) throw new Error('Error al cargar dispositivos');
        
        state.devices = await response.json();
        deviceCount.textContent = state.devices.length;
        
        renderDevicesList();
        await loadPositions();
        
    } catch (error) {
        console.error('Error loading devices:', error);
    }
}

// ===== LOAD POSITIONS =====
async function loadPositions() {
    try {
        const response = await fetch(`${TRACCAR_API}/positions`, {
            credentials: 'include',
            headers: { 'Accept': 'application/json' }
        });
        
        if (!response.ok) throw new Error('Error al cargar posiciones');
        
        const positions = await response.json();
        positions.forEach(pos => { state.positions[pos.deviceId] = pos; });
        
        updateMapMarkers();
        renderDevicesList();
        
    } catch (error) {
        console.error('Error loading positions:', error);
    }
}

// ===== RENDER DEVICES =====
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
        deviceEl.addEventListener('click', (e) => selectDevice(device.id, e));
        devicesList.appendChild(deviceEl);
    });
}

// ===== MAP MARKERS =====
function updateMapMarkers() {
    state.devices.forEach(device => {
        const position = state.positions[device.id];
        if (!position || !position.latitude || !position.longitude) return;
        
        const isOnline = isDeviceOnline(position);
        const markerColor = isOnline ? '#10b981' : '#64748b';
        
        if (state.markers[device.id]) {
            state.markers[device.id].setLatLng([position.latitude, position.longitude]);
        } else {
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
function selectDevice(deviceId, e) {
    state.selectedDeviceId = deviceId;
    
    document.querySelectorAll('.device-item').forEach(el => el.classList.remove('active'));
    if (e) e.currentTarget.classList.add('active');
    
    const device = state.devices.find(d => d.id === deviceId);
    const position = state.positions[deviceId];
    
    if (device && position) {
        showDevicePanel(device, position);
        if (position.latitude && position.longitude) {
            state.map.setView([position.latitude, position.longitude], 15);
        }
    }
}

// ===== DEVICE PANEL =====
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

function closeDevicePanel() {
    devicePanel.classList.add('hidden');
    state.selectedDeviceId = null;
    document.querySelectorAll('.device-item').forEach(el => el.classList.remove('active'));
}

// ===== HELPERS =====
function isDeviceOnline(position) {
    if (!position.deviceTime) return false;
    const diffMinutes = (new Date() - new Date(position.deviceTime)) / (1000 * 60);
    return diffMinutes < 5;
}

function startAutoUpdate() {
    state.updateInterval = setInterval(loadPositions, 10000);
}

function showLoginError(message) {
    loginError.textContent = message;
    loginError.classList.add('show');
}