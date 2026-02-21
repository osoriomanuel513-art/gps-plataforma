// ===== CONFIGURACIÓN PERSONALIZABLE =====
// Edita este archivo para personalizar tu plataforma

const CONFIG = {
    // ===== BRANDING =====
    APP_NAME: 'GPS Tracker',
    APP_LOGO: '📍',
    APP_DESCRIPTION: 'Rastreo en Tiempo Real',
    
    // ===== COLORES (Personaliza aquí) =====
    COLORS: {
        primary: '#2563eb',           // Azul
        primaryDark: '#1e40af',       // Azul oscuro
        secondary: '#10b981',         // Verde
        danger: '#ef4444',            // Rojo
        warning: '#f59e0b',           // Naranja
        background: '#f8fafc',        // Gris claro
        cardBg: '#ffffff',            // Blanco
        textPrimary: '#1e293b',       // Gris oscuro
        textSecondary: '#64748b',     // Gris medio
        border: '#e2e8f0'             // Gris borde
    },
    
    // ===== CONFIGURACIÓN DE MAPA =====
    MAP: {
        defaultZoom: 2,
        defaultCenter: [20, 0],
        maxZoom: 19,
        tileProvider: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: '© OpenStreetMap contributors'
    },
    
    // ===== CONFIGURACIÓN DE ACTUALIZACIÓN =====
    UPDATE: {
        positionUpdateInterval: 10000,  // Milisegundos (10 segundos)
        onlineThresholdMinutes: 5       // Minutos sin actualización para considerar offline
    },
    
    // ===== CONFIGURACIÓN DE TRACCAR =====
    TRACCAR: {
        defaultApiUrl: 'traccar-production-5353.up.railway.app',
        apiTimeout: 10000               // Milisegundos
    },
    
    // ===== TEXTOS PERSONALIZABLES =====
    TEXTS: {
        loginTitle: 'Rastreo en Tiempo Real',
        loginButton: 'Iniciar Sesión',
        logoutButton: 'Cerrar Sesión',
        devicesTitle: 'Dispositivos',
        noDevices: 'No hay dispositivos',
        loading: 'Cargando...',
        online: 'En línea',
        offline: 'Fuera de línea',
        errorInvalidCredentials: 'Credenciales inválidas',
        errorConnection: 'Error de conexión',
        errorLoadingDevices: 'Error al cargar dispositivos',
        errorLoadingPositions: 'Error al cargar posiciones'
    }
};

// ===== APLICAR COLORES PERSONALIZADOS =====
function applyCustomColors() {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', CONFIG.COLORS.primary);
    root.style.setProperty('--primary-dark', CONFIG.COLORS.primaryDark);
    root.style.setProperty('--secondary-color', CONFIG.COLORS.secondary);
    root.style.setProperty('--danger-color', CONFIG.COLORS.danger);
    root.style.setProperty('--warning-color', CONFIG.COLORS.warning);
    root.style.setProperty('--bg-color', CONFIG.COLORS.background);
    root.style.setProperty('--card-bg', CONFIG.COLORS.cardBg);
    root.style.setProperty('--text-primary', CONFIG.COLORS.textPrimary);
    root.style.setProperty('--text-secondary', CONFIG.COLORS.textSecondary);
    root.style.setProperty('--border-color', CONFIG.COLORS.border);
}

// Aplicar colores cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', applyCustomColors);
