# GPS Tracker - Plataforma de Rastreo en Tiempo Real

Una plataforma web personalizada para rastreo GPS que se conecta a tu API de Traccar. Construida con HTML, CSS y JavaScript puro.

## Características

✅ **Página de Login Personalizada** - Interfaz moderna con colores personalizables
✅ **Mapa en Tiempo Real** - Integración con Leaflet y OpenStreetMap
✅ **Lista de Dispositivos** - Estado en línea/fuera de línea
✅ **Rastreo en Tiempo Real** - Actualización automática cada 10 segundos
✅ **Panel de Detalles** - Información completa de cada dispositivo
✅ **Diseño Responsivo** - Funciona en desktop y móvil

## Instalación

1. **Descarga los archivos:**
   - `index.html`
   - `styles.css`
   - `app.js`

2. **Sube a tu hosting:**
   - Puedes usar cualquier hosting que soporte archivos estáticos (HTML, CSS, JS)
   - Ejemplos: Netlify, Vercel, GitHub Pages, tu propio servidor web

3. **No requiere instalación de dependencias** - Todo funciona en el navegador

## Uso

1. Abre `index.html` en tu navegador
2. Ingresa los datos de tu API Traccar:
   - **URL de API:** `traccar-production-5353.up.railway.app`
   - **Usuario:** Tu usuario de Traccar
   - **Contraseña:** Tu contraseña de Traccar
3. Haz clic en "Iniciar Sesión"
4. Verás el mapa con tus dispositivos GPS

## Personalización

### Cambiar Colores

Edita las variables CSS en `styles.css`:

```css
:root {
    --primary-color: #2563eb;        /* Color principal (azul) */
    --primary-dark: #1e40af;         /* Color principal oscuro */
    --secondary-color: #10b981;      /* Color secundario (verde) */
    --danger-color: #ef4444;         /* Color de peligro (rojo) */
    --warning-color: #f59e0b;        /* Color de advertencia (naranja) */
}
```

### Cambiar Logo

En `index.html`, busca:
```html
<div class="logo">📍 GPS Tracker</div>
```

Reemplaza el emoji o el texto con tu logo personalizado.

### Cambiar Nombre de la Aplicación

Busca todas las instancias de "GPS Tracker" y reemplázalas con tu nombre de marca.

## Estructura de Archivos

```
.
├── index.html      # Estructura HTML
├── styles.css      # Estilos CSS
├── app.js          # Lógica JavaScript
└── README.md       # Este archivo
```

## Cómo Funciona

### Flujo de Autenticación

1. El usuario ingresa credenciales en el login
2. Se envía una solicitud POST a `/api/session` de Traccar
3. Se recibe un token de autenticación
4. El token se usa para todas las solicitudes posteriores

### Actualización de Datos

- **Dispositivos:** Se cargan una sola vez al iniciar sesión
- **Posiciones:** Se actualizan automáticamente cada 10 segundos
- **Mapa:** Se actualiza con las nuevas posiciones

### Indicador de Estado

- **En línea:** Dispositivo actualizado en los últimos 5 minutos
- **Fuera de línea:** Dispositivo sin actualización en más de 5 minutos

## Endpoints de Traccar Utilizados

- `POST /api/session` - Autenticación
- `GET /api/devices` - Obtener lista de dispositivos
- `GET /api/positions` - Obtener posiciones actuales

## Requisitos

- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Conexión a Internet
- Acceso a la API de Traccar

## Notas de Seguridad

⚠️ **Importante:** 
- Las credenciales se envían a través de HTTPS (asegúrate de usar HTTPS en producción)
- El token se almacena en memoria del navegador
- No se guardan credenciales en localStorage

## Solución de Problemas

### "Error de conexión"
- Verifica que la URL de la API sea correcta
- Asegúrate de tener conexión a Internet
- Comprueba que Traccar esté en línea

### "Credenciales inválidas"
- Verifica usuario y contraseña
- Asegúrate de usar el email correcto (algunos sistemas de Traccar usan email)

### El mapa no carga
- Verifica tu conexión a Internet
- Comprueba que OpenStreetMap esté accesible

### Los dispositivos no aparecen
- Asegúrate de tener dispositivos configurados en Traccar
- Verifica que tengas permisos para verlos

## Soporte

Para más información sobre Traccar, visita: https://www.traccar.org/

## Licencia

Libre para usar y modificar según tus necesidades.
