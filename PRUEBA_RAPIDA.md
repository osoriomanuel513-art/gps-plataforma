# Prueba Rápida - GPS Tracker

Guía para probar tu plataforma localmente antes de desplegar.

## Paso 1: Verificar Archivos

Asegúrate de tener estos archivos en la misma carpeta:
- ✅ `index.html`
- ✅ `styles.css`
- ✅ `app.js`
- ✅ `config.js`

## Paso 2: Abrir en Navegador

### Opción A: Doble clic
1. Haz doble clic en `index.html`
2. Se abrirá en tu navegador predeterminado

### Opción B: Arrastrar y soltar
1. Abre tu navegador
2. Arrastra `index.html` a la ventana del navegador

### Opción C: Desde terminal
```bash
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

## Paso 3: Probar Login

1. Abre la página en tu navegador
2. Deberías ver la pantalla de login
3. Ingresa:
   - **URL de API:** `traccar-production-5353.up.railway.app`
   - **Usuario:** Tu usuario de Traccar
   - **Contraseña:** Tu contraseña de Traccar
4. Haz clic en "Iniciar Sesión"

## Paso 4: Verificar Funcionalidades

### ✅ Mapa
- [ ] El mapa carga correctamente
- [ ] Puedes hacer zoom (rueda del ratón)
- [ ] Puedes arrastrar el mapa

### ✅ Dispositivos
- [ ] Aparece la lista de dispositivos
- [ ] Se muestra el estado (en línea/fuera de línea)
- [ ] Los marcadores aparecen en el mapa

### ✅ Panel de Detalles
- [ ] Haz clic en un dispositivo
- [ ] Se abre el panel con detalles
- [ ] Muestra latitud, longitud, velocidad, etc.

### ✅ Actualización en Tiempo Real
- [ ] Espera 10 segundos
- [ ] Los datos se actualizan automáticamente
- [ ] Los marcadores se mueven en el mapa

### ✅ Logout
- [ ] Haz clic en "Cerrar Sesión"
- [ ] Vuelve a la pantalla de login

## Paso 5: Abrir Consola de Desarrollador

Para ver si hay errores:

### Chrome/Edge
1. Presiona `F12` o `Ctrl+Shift+I`
2. Ve a la pestaña "Console"
3. Busca mensajes de error (en rojo)

### Firefox
1. Presiona `F12` o `Ctrl+Shift+I`
2. Ve a la pestaña "Console"
3. Busca mensajes de error

### Safari
1. Presiona `Cmd+Option+I`
2. Ve a la pestaña "Console"
3. Busca mensajes de error

## Errores Comunes y Soluciones

### Error: "Credenciales inválidas"
**Causa:** Usuario o contraseña incorrectos
**Solución:** Verifica tus credenciales de Traccar

### Error: "Error de conexión"
**Causa:** URL de API incorrecta o Traccar offline
**Solución:** 
- Verifica la URL: `traccar-production-5353.up.railway.app`
- Comprueba que Traccar esté en línea
- Verifica tu conexión a Internet

### Error: "CORS error"
**Causa:** Problema de seguridad del navegador
**Solución:** Esto es normal en desarrollo, no afecta en producción

### El mapa no carga
**Causa:** Problema con OpenStreetMap
**Solución:** 
- Recarga la página
- Verifica tu conexión a Internet
- Intenta en otro navegador

### Los dispositivos no aparecen
**Causa:** No hay dispositivos en Traccar o sin permisos
**Solución:**
- Verifica que tengas dispositivos en Traccar
- Comprueba que tengas permisos para verlos

## Prueba de Rendimiento

### Velocidad de Carga
1. Abre la consola (F12)
2. Ve a "Network"
3. Recarga la página
4. Verifica que los archivos carguen rápido

### Uso de Memoria
1. Abre la consola (F12)
2. Ve a "Performance"
3. Haz clic en "Record"
4. Interactúa con la app
5. Haz clic en "Stop"
6. Revisa el uso de memoria

## Prueba en Diferentes Navegadores

Prueba en:
- ✅ Chrome
- ✅ Firefox
- ✅ Safari
- ✅ Edge

## Prueba en Móvil

### Desde tu computadora
1. Abre la consola (F12)
2. Haz clic en el icono de dispositivo móvil
3. Selecciona un dispositivo (iPhone, Android, etc.)
4. Prueba la interfaz

### Desde tu teléfono
1. En tu computadora, abre la terminal
2. Ejecuta: `python -m http.server 8000`
3. En tu teléfono, ve a: `http://[tu-ip]:8000`
4. Prueba la interfaz

## Checklist de Prueba

- [ ] Login funciona
- [ ] Mapa carga
- [ ] Dispositivos aparecen
- [ ] Panel de detalles funciona
- [ ] Actualización en tiempo real funciona
- [ ] Logout funciona
- [ ] No hay errores en consola
- [ ] Funciona en móvil
- [ ] Funciona en diferentes navegadores

## Próximos Pasos

Si todo funciona:
1. Personaliza los colores en `config.js`
2. Cambia el logo y nombre
3. Sigue la guía de DESPLIEGUE.md
4. Sube a tu hosting

Si hay problemas:
1. Revisa la consola del navegador
2. Verifica la conexión a Traccar
3. Comprueba los datos de login
4. Intenta en otro navegador

## Soporte

Si necesitas ayuda:
1. Revisa README.md
2. Revisa PERSONALIZACION.md
3. Revisa DESPLIEGUE.md
4. Revisa AVANZADO.md

¡Listo para desplegar!
