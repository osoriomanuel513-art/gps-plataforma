# Guía de Personalización - GPS Tracker

Esta guía te ayudará a personalizar la plataforma con tu marca y colores.

## 1. Cambiar Colores Principales

Abre `config.js` y modifica la sección `COLORS`:

```javascript
COLORS: {
    primary: '#2563eb',           // Color principal (botones, encabezados)
    primaryDark: '#1e40af',       // Color principal oscuro (hover)
    secondary: '#10b981',         // Color secundario (dispositivos en línea)
    danger: '#ef4444',            // Color de error (dispositivos offline)
    warning: '#f59e0b',           // Color de advertencia
    background: '#f8fafc',        // Fondo general
    cardBg: '#ffffff',            // Fondo de tarjetas
    textPrimary: '#1e293b',       // Texto principal
    textSecondary: '#64748b',     // Texto secundario
    border: '#e2e8f0'             // Bordes
}
```

### Ejemplos de Paletas de Colores

**Paleta Profesional (Azul y Gris):**
```javascript
primary: '#1e3a8a',
primaryDark: '#1e40af',
secondary: '#0891b2',
danger: '#dc2626',
warning: '#ea580c'
```

**Paleta Moderna (Púrpura y Rosa):**
```javascript
primary: '#7c3aed',
primaryDark: '#6d28d9',
secondary: '#ec4899',
danger: '#f43f5e',
warning: '#f59e0b'
```

**Paleta Verde (Ecológica):**
```javascript
primary: '#059669',
primaryDark: '#047857',
secondary: '#10b981',
danger: '#ef4444',
warning: '#f59e0b'
```

## 2. Cambiar Logo y Nombre

En `index.html`, busca y reemplaza:

```html
<!-- Cambiar logo en login -->
<div class="logo">📍 GPS Tracker</div>

<!-- Cambiar nombre en header -->
<div class="logo-small">📍 GPS Tracker</div>
```

### Opciones de Logo

**Usar emoji:**
```html
<div class="logo">🚗 Mi Empresa</div>
```

**Usar imagen:**
```html
<div class="logo">
    <img src="logo.png" alt="Logo" style="height: 40px;">
</div>
```

**Usar solo texto:**
```html
<div class="logo">Mi Empresa GPS</div>
```

## 3. Cambiar Textos

En `config.js`, modifica la sección `TEXTS`:

```javascript
TEXTS: {
    loginTitle: 'Mi Sistema de Rastreo',
    loginButton: 'Acceder',
    logoutButton: 'Salir',
    devicesTitle: 'Mis Vehículos',
    noDevices: 'Sin vehículos disponibles',
    online: 'Activo',
    offline: 'Inactivo',
    // ... más textos
}
```

## 4. Cambiar Configuración del Mapa

En `config.js`, modifica la sección `MAP`:

```javascript
MAP: {
    defaultZoom: 2,                    // Zoom inicial (1-19)
    defaultCenter: [20, 0],            // Centro inicial [latitud, longitud]
    maxZoom: 19,
    tileProvider: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '© OpenStreetMap contributors'
}
```

### Cambiar Proveedor de Mapa

**OpenStreetMap (por defecto):**
```javascript
tileProvider: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
```

**Stamen Terrain:**
```javascript
tileProvider: 'https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png'
```

**CartoDB Positron:**
```javascript
tileProvider: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
```

## 5. Cambiar Velocidad de Actualización

En `config.js`, modifica:

```javascript
UPDATE: {
    positionUpdateInterval: 10000,  // Cambiar a 5000 para 5 segundos
    onlineThresholdMinutes: 5       // Cambiar a 10 para 10 minutos
}
```

## 6. Cambiar URL de API por Defecto

En `config.js`:

```javascript
TRACCAR: {
    defaultApiUrl: 'tu-api.com',  // Cambiar aquí
    apiTimeout: 10000
}
```

También en `app.js`, busca:
```javascript
apiUrlInput.value = 'traccar-production-5353.up.railway.app';
```

Y reemplaza con tu URL.

## 7. Personalización Avanzada

### Cambiar Estilos CSS

Abre `styles.css` y modifica las clases que necesites. Ejemplos:

**Cambiar tamaño de fuente:**
```css
.login-header h1 {
    font-size: 28px;  /* Cambiar de 24px */
}
```

**Cambiar radio de bordes:**
```css
.login-box {
    border-radius: 20px;  /* Cambiar de 12px */
}
```

**Cambiar sombras:**
```css
--shadow-lg: 0 20px 40px rgba(0, 0, 0, 0.15);  /* Más pronunciada */
```

### Agregar Favicon

En `index.html`, dentro de `<head>`:
```html
<link rel="icon" type="image/png" href="favicon.png">
```

### Cambiar Fuente

En `styles.css`, modifica:
```css
body {
    font-family: 'Tu Fuente', sans-serif;
}
```

Ejemplo con Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
```

```css
body {
    font-family: 'Poppins', sans-serif;
}
```

## 8. Ejemplo Completo de Personalización

Aquí está un ejemplo de cómo personalizar todo para una empresa llamada "FleetTrack":

**config.js:**
```javascript
const CONFIG = {
    APP_NAME: 'FleetTrack',
    APP_LOGO: '🚗',
    APP_DESCRIPTION: 'Gestión de Flota en Tiempo Real',
    
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
        loginTitle: 'FleetTrack - Gestión de Flota',
        loginButton: 'Acceder al Sistema',
        devicesTitle: 'Mis Vehículos',
        online: 'En Ruta',
        offline: 'Estacionado'
    }
};
```

**index.html (cambios):**
```html
<div class="logo">🚗 FleetTrack</div>
<h1>Gestión de Flota en Tiempo Real</h1>
```

## 9. Checklist de Personalización

- [ ] Cambiar colores en `config.js`
- [ ] Cambiar logo y nombre en `index.html`
- [ ] Cambiar textos en `config.js`
- [ ] Cambiar URL de API en `config.js` y `app.js`
- [ ] Agregar favicon
- [ ] Cambiar fuente (opcional)
- [ ] Probar en navegador
- [ ] Subir a hosting

## 10. Soporte

Si necesitas ayuda con la personalización, revisa:
- `README.md` - Documentación general
- `styles.css` - Estilos CSS
- `config.js` - Configuración
- `app.js` - Lógica JavaScript
