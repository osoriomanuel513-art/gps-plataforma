# Ejemplos de Configuración - GPS Tracker

Ejemplos listos para copiar y pegar en `config.js`.

## 1. Configuración Profesional (Azul)

```javascript
const CONFIG = {
    APP_NAME: 'Fleet Management',
    APP_LOGO: '🚗',
    APP_DESCRIPTION: 'Real-time Fleet Tracking',
    
    COLORS: {
        primary: '#1e40af',
        primaryDark: '#1e3a8a',
        secondary: '#0891b2',
        danger: '#dc2626',
        warning: '#ea580c',
        background: '#f0f9ff',
        cardBg: '#ffffff',
        textPrimary: '#0c2340',
        textSecondary: '#475569',
        border: '#bfdbfe'
    },
    
    TEXTS: {
        loginTitle: 'Fleet Management System',
        loginButton: 'Sign In',
        logoutButton: 'Sign Out',
        devicesTitle: 'Vehicles',
        online: 'Active',
        offline: 'Inactive'
    }
};
```

## 2. Configuración Moderna (Púrpura)

```javascript
const CONFIG = {
    APP_NAME: 'TrackHub',
    APP_LOGO: '📍',
    APP_DESCRIPTION: 'Seguimiento Inteligente',
    
    COLORS: {
        primary: '#7c3aed',
        primaryDark: '#6d28d9',
        secondary: '#ec4899',
        danger: '#f43f5e',
        warning: '#f59e0b',
        background: '#faf5ff',
        cardBg: '#ffffff',
        textPrimary: '#4c1d95',
        textSecondary: '#6b7280',
        border: '#e9d5ff'
    },
    
    TEXTS: {
        loginTitle: 'TrackHub - Seguimiento Inteligente',
        loginButton: 'Acceder',
        devicesTitle: 'Mis Dispositivos',
        online: 'Activo',
        offline: 'Inactivo'
    }
};
```

## 3. Configuración Verde (Ecológica)

```javascript
const CONFIG = {
    APP_NAME: 'EcoTrack',
    APP_LOGO: '🌱',
    APP_DESCRIPTION: 'Rastreo Sostenible',
    
    COLORS: {
        primary: '#059669',
        primaryDark: '#047857',
        secondary: '#10b981',
        danger: '#ef4444',
        warning: '#f59e0b',
        background: '#f0fdf4',
        cardBg: '#ffffff',
        textPrimary: '#065f46',
        textSecondary: '#4b5563',
        border: '#bbf7d0'
    },
    
    TEXTS: {
        loginTitle: 'EcoTrack - Rastreo Sostenible',
        loginButton: 'Iniciar',
        devicesTitle: 'Vehículos',
        online: 'En ruta',
        offline: 'Estacionado'
    }
};
```

## 4. Configuración Roja (Urgencia)

```javascript
const CONFIG = {
    APP_NAME: 'Emergency Response',
    APP_LOGO: '🚨',
    APP_DESCRIPTION: 'Sistema de Respuesta',
    
    COLORS: {
        primary: '#dc2626',
        primaryDark: '#b91c1c',
        secondary: '#f97316',
        danger: '#7f1d1d',
        warning: '#ea580c',
        background: '#fef2f2',
        cardBg: '#ffffff',
        textPrimary: '#7f1d1d',
        textSecondary: '#5a5a5a',
        border: '#fecaca'
    },
    
    TEXTS: {
        loginTitle: 'Sistema de Respuesta de Emergencia',
        loginButton: 'Acceder Ahora',
        devicesTitle: 'Unidades',
        online: 'Disponible',
        offline: 'No disponible'
    }
};
```

## 5. Configuración Oscura (Dark Mode)

```javascript
const CONFIG = {
    APP_NAME: 'GPS Tracker Pro',
    APP_LOGO: '📍',
    APP_DESCRIPTION: 'Rastreo Profesional',
    
    COLORS: {
        primary: '#3b82f6',
        primaryDark: '#1e40af',
        secondary: '#10b981',
        danger: '#ef4444',
        warning: '#f59e0b',
        background: '#0f172a',
        cardBg: '#1e293b',
        textPrimary: '#f1f5f9',
        textSecondary: '#cbd5e1',
        border: '#334155'
    },
    
    TEXTS: {
        loginTitle: 'GPS Tracker Pro',
        loginButton: 'Iniciar Sesión',
        devicesTitle: 'Dispositivos',
        online: 'En línea',
        offline: 'Fuera de línea'
    }
};
```

## 6. Configuración Minimalista

```javascript
const CONFIG = {
    APP_NAME: 'Track',
    APP_LOGO: '→',
    APP_DESCRIPTION: 'Simple & Fast',
    
    COLORS: {
        primary: '#000000',
        primaryDark: '#1a1a1a',
        secondary: '#666666',
        danger: '#ff0000',
        warning: '#ffaa00',
        background: '#ffffff',
        cardBg: '#f5f5f5',
        textPrimary: '#000000',
        textSecondary: '#666666',
        border: '#e0e0e0'
    },
    
    TEXTS: {
        loginTitle: 'Track',
        loginButton: 'Go',
        devicesTitle: 'Devices',
        online: 'On',
        offline: 'Off'
    }
};
```

## 7. Configuración Corporativa (Empresa)

```javascript
const CONFIG = {
    APP_NAME: 'LogisticaPlus',
    APP_LOGO: '📦',
    APP_DESCRIPTION: 'Sistema de Logística',
    
    COLORS: {
        primary: '#003366',
        primaryDark: '#001a33',
        secondary: '#0066cc',
        danger: '#cc0000',
        warning: '#ff9900',
        background: '#f2f2f2',
        cardBg: '#ffffff',
        textPrimary: '#003366',
        textSecondary: '#666666',
        border: '#cccccc'
    },
    
    TEXTS: {
        loginTitle: 'LogisticaPlus - Sistema de Logística',
        loginButton: 'Ingresar',
        devicesTitle: 'Flota de Vehículos',
        online: 'En Servicio',
        offline: 'Fuera de Servicio'
    },
    
    UPDATE: {
        positionUpdateInterval: 5000,  // Más rápido
        onlineThresholdMinutes: 3
    }
};
```

## 8. Configuración Taxi/Uber

```javascript
const CONFIG = {
    APP_NAME: 'TaxiTrack',
    APP_LOGO: '🚕',
    APP_DESCRIPTION: 'Gestión de Taxis',
    
    COLORS: {
        primary: '#fbbf24',
        primaryDark: '#f59e0b',
        secondary: '#1f2937',
        danger: '#ef4444',
        warning: '#f97316',
        background: '#fffbeb',
        cardBg: '#ffffff',
        textPrimary: '#1f2937',
        textSecondary: '#6b7280',
        border: '#fde68a'
    },
    
    TEXTS: {
        loginTitle: 'TaxiTrack - Gestión de Taxis',
        loginButton: 'Conectar',
        devicesTitle: 'Mis Taxis',
        online: 'Disponible',
        offline: 'Ocupado'
    }
};
```

## 9. Configuración Delivery

```javascript
const CONFIG = {
    APP_NAME: 'DeliveryMap',
    APP_LOGO: '🚚',
    APP_DESCRIPTION: 'Rastreo de Entregas',
    
    COLORS: {
        primary: '#ea580c',
        primaryDark: '#c2410c',
        secondary: '#16a34a',
        danger: '#dc2626',
        warning: '#f59e0b',
        background: '#fff7ed',
        cardBg: '#ffffff',
        textPrimary: '#7c2d12',
        textSecondary: '#5a5a5a',
        border: '#fed7aa'
    },
    
    TEXTS: {
        loginTitle: 'DeliveryMap - Rastreo de Entregas',
        loginButton: 'Iniciar',
        devicesTitle: 'Repartidores',
        online: 'En ruta',
        offline: 'Disponible'
    }
};
```

## 10. Configuración Construcción

```javascript
const CONFIG = {
    APP_NAME: 'BuildTrack',
    APP_LOGO: '🏗️',
    APP_DESCRIPTION: 'Rastreo de Equipos',
    
    COLORS: {
        primary: '#92400e',
        primaryDark: '#78350f',
        secondary: '#ea580c',
        danger: '#dc2626',
        warning: '#f59e0b',
        background: '#fef3c7',
        cardBg: '#ffffff',
        textPrimary: '#78350f',
        textSecondary: '#5a5a5a',
        border: '#fcd34d'
    },
    
    TEXTS: {
        loginTitle: 'BuildTrack - Rastreo de Equipos',
        loginButton: 'Acceder',
        devicesTitle: 'Equipos',
        online: 'Activo',
        offline: 'Inactivo'
    }
};
```

## 11. Configuración Seguridad

```javascript
const CONFIG = {
    APP_NAME: 'SecureTrack',
    APP_LOGO: '🔒',
    APP_DESCRIPTION: 'Sistema de Seguridad',
    
    COLORS: {
        primary: '#1e3a8a',
        primaryDark: '#1e40af',
        secondary: '#dc2626',
        danger: '#7f1d1d',
        warning: '#ea580c',
        background: '#f0f9ff',
        cardBg: '#ffffff',
        textPrimary: '#0c2340',
        textSecondary: '#475569',
        border: '#bfdbfe'
    },
    
    TEXTS: {
        loginTitle: 'SecureTrack - Sistema de Seguridad',
        loginButton: 'Autenticar',
        devicesTitle: 'Unidades de Seguridad',
        online: 'Patrullando',
        offline: 'Fuera de Servicio'
    }
};
```

## 12. Configuración Personalizada (Tu Empresa)

```javascript
const CONFIG = {
    APP_NAME: 'TU_NOMBRE_AQUI',
    APP_LOGO: 'TU_EMOJI_O_LOGO',
    APP_DESCRIPTION: 'TU_DESCRIPCION',
    
    COLORS: {
        primary: '#TU_COLOR_PRINCIPAL',
        primaryDark: '#TU_COLOR_OSCURO',
        secondary: '#TU_COLOR_SECUNDARIO',
        danger: '#dc2626',
        warning: '#f59e0b',
        background: '#f8fafc',
        cardBg: '#ffffff',
        textPrimary: '#1e293b',
        textSecondary: '#64748b',
        border: '#e2e8f0'
    },
    
    TEXTS: {
        loginTitle: 'TU_TITULO',
        loginButton: 'TU_BOTON',
        devicesTitle: 'TUS_DISPOSITIVOS',
        online: 'TU_ESTADO_ONLINE',
        offline: 'TU_ESTADO_OFFLINE'
    }
};
```

## Cómo Usar

1. Elige una configuración que te guste
2. Copia todo el código
3. Abre `config.js`
4. Reemplaza la sección `const CONFIG = { ... }` con el código copiado
5. Guarda el archivo
6. Recarga tu navegador

## Generador de Colores

Para encontrar colores que combinen:
- https://coolors.co
- https://color.adobe.com
- https://www.colorhexa.com

## Emojis Populares

- 📍 Ubicación
- 🚗 Vehículos
- 🚕 Taxis
- 🚚 Delivery
- 📦 Paquetes
- 🏗️ Construcción
- 🔒 Seguridad
- 🌱 Ecología
- 🚨 Emergencia
- 🚁 Drones
- ⚡ Energía
- 🌍 Global

¡Elige la que mejor se adapte a tu marca!
