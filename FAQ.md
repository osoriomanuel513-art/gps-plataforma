# Preguntas Frecuentes - GPS Tracker

## General

### ¿Qué es GPS Tracker?
Una plataforma web personalizada para rastrear dispositivos GPS en tiempo real, conectada a tu API de Traccar.

### ¿Necesito instalar algo?
No. Es HTML, CSS y JavaScript puro. Solo necesitas un navegador y un hosting.

### ¿Es gratis?
Sí, el código es tuyo. Solo pagas el hosting (muchos son gratis).

### ¿Puedo modificarlo?
Sí, es completamente personalizable. Puedes cambiar colores, textos, funcionalidades, etc.

### ¿Qué navegadores soporta?
Chrome, Firefox, Safari, Edge y cualquier navegador moderno.

---

## Instalación y Configuración

### ¿Cómo instalo?
1. Descarga los archivos
2. Abre `index.html` en tu navegador
3. Ingresa tus credenciales de Traccar

### ¿Dónde subo los archivos?
A cualquier hosting que soporte archivos estáticos (HTML, CSS, JS):
- Netlify (recomendado)
- Vercel
- GitHub Pages
- Tu propio servidor

Ver `DESPLIEGUE.md` para instrucciones detalladas.

### ¿Necesito una base de datos?
No. Todo se conecta a través de la API de Traccar.

### ¿Necesito un servidor backend?
No. Es una aplicación frontend pura.

---

## Traccar

### ¿Qué es Traccar?
Un servidor de rastreo GPS de código abierto. Puedes tener tu propia instancia o usar una en la nube.

### ¿Cómo obtengo mis credenciales de Traccar?
Contacta al administrador de tu instancia de Traccar o crea una cuenta en https://www.traccar.org/

### ¿Puedo usar cualquier instancia de Traccar?
Sí, cualquier versión reciente de Traccar que tenga API REST.

### ¿Qué endpoints de Traccar se usan?
- `POST /api/session` - Autenticación
- `GET /api/devices` - Obtener dispositivos
- `GET /api/positions` - Obtener posiciones

### ¿Necesito CORS habilitado en Traccar?
Idealmente sí, pero muchos hosting lo manejan automáticamente.

---

## Personalización

### ¿Cómo cambio los colores?
Edita `config.js` → sección `COLORS`

### ¿Cómo cambio el logo?
Edita `index.html` → busca `<div class="logo">`

### ¿Cómo cambio el nombre?
Edita `config.js` → `APP_NAME`

### ¿Puedo agregar mi logo como imagen?
Sí, reemplaza el emoji con una etiqueta `<img>`

### ¿Puedo cambiar la velocidad de actualización?
Sí, edita `config.js` → `UPDATE.positionUpdateInterval`

### ¿Puedo cambiar el proveedor de mapa?
Sí, edita `config.js` → `MAP.tileProvider`

---

## Funcionalidades

### ¿Cómo funciona el rastreo en tiempo real?
Se actualiza automáticamente cada 10 segundos (configurable).

### ¿Cómo sé si un dispositivo está en línea?
Si se actualizó en los últimos 5 minutos (configurable).

### ¿Puedo ver el historial de ubicaciones?
No por defecto, pero puedes agregarlo (ver `AVANZADO.md`).

### ¿Puedo dibujar rutas?
No por defecto, pero puedes agregarlo (ver `AVANZADO.md`).

### ¿Puedo exportar datos?
No por defecto, pero puedes agregarlo (ver `AVANZADO.md`).

### ¿Puedo agregar geofencing?
No por defecto, pero puedes agregarlo (ver `AVANZADO.md`).

### ¿Puedo agregar notificaciones?
No por defecto, pero puedes agregarlo (ver `AVANZADO.md`).

---

## Seguridad

### ¿Es seguro?
Sí, usa HTTPS en producción. Las credenciales se envían encriptadas.

### ¿Dónde se guardan las credenciales?
En memoria del navegador. No se guardan en localStorage por defecto.

### ¿Puedo guardar credenciales?
Sí, pero no es recomendado por seguridad. Ver `AVANZADO.md`.

### ¿Qué pasa si alguien accede a mi navegador?
Puede ver los datos que estés viendo. Por eso es importante usar HTTPS.

### ¿Necesito autenticación de dos factores?
Depende de tu instancia de Traccar.

---

## Despliegue

### ¿Cuál es el hosting más fácil?
Netlify. Solo arrastra la carpeta y listo.

### ¿Cuál es el hosting más barato?
GitHub Pages es gratis. Netlify y Vercel también.

### ¿Puedo usar mi propio dominio?
Sí, todos los hosting lo permiten.

### ¿Necesito SSL/HTTPS?
Sí, es importante para seguridad. Todos los hosting modernos lo incluyen.

### ¿Cuánto espacio necesito?
Muy poco, menos de 1MB.

### ¿Cuánto ancho de banda necesito?
Depende de cuántos usuarios. Para uso personal, muy poco.

---

## Problemas Comunes

### "Credenciales inválidas"
Verifica usuario y contraseña de Traccar.

### "Error de conexión"
Verifica la URL de la API y tu conexión a Internet.

### "El mapa no carga"
Recarga la página, verifica conexión a Internet.

### "Los dispositivos no aparecen"
Verifica que tengas dispositivos en Traccar y permisos.

### "CORS error"
Normal en desarrollo. En producción, configura CORS en Traccar.

### "La página es lenta"
Reduce la frecuencia de actualización en `config.js`.

### "El logout no funciona"
Recarga la página manualmente.

---

## Características Avanzadas

### ¿Puedo agregar más funcionalidades?
Sí, ver `AVANZADO.md` para ejemplos.

### ¿Puedo conectar a otra API?
Sí, modifica `app.js` para conectar a tu API.

### ¿Puedo agregar una base de datos?
Sí, necesitarías un backend (Node.js, Python, etc.).

### ¿Puedo hacer una aplicación móvil?
Sí, puedes usar React Native o Flutter.

### ¿Puedo agregar análisis?
Sí, puedes integrar Google Analytics o similar.

---

## Soporte y Ayuda

### ¿Dónde encuentro documentación?
En los archivos `.md`:
- `README.md` - Documentación completa
- `INICIO_RAPIDO.md` - Cómo empezar
- `PRUEBA_RAPIDA.md` - Cómo probar
- `PERSONALIZACION.md` - Cómo personalizar
- `DESPLIEGUE.md` - Cómo desplegar
- `AVANZADO.md` - Características avanzadas
- `EJEMPLOS_CONFIG.md` - Ejemplos de configuración

### ¿Dónde encuentro ayuda?
1. Revisa la documentación
2. Verifica la consola del navegador (F12)
3. Comprueba la conexión a Traccar
4. Intenta en otro navegador

### ¿Puedo reportar un bug?
Sí, revisa el código y reporta en GitHub si lo tienes.

### ¿Puedo sugerir una característica?
Sí, ver `AVANZADO.md` para ejemplos de cómo agregarla.

---

## Rendimiento

### ¿Qué tan rápido es?
Muy rápido. Carga en menos de 1 segundo.

### ¿Cuántos dispositivos puede manejar?
Depende de tu navegador, pero generalmente 100+.

### ¿Qué tan rápido se actualiza?
Cada 10 segundos por defecto (configurable).

### ¿Consume mucho ancho de banda?
No, muy poco. Aproximadamente 1KB por actualización.

### ¿Consume mucha batería en móvil?
Depende de la frecuencia de actualización. Reduce si es necesario.

---

## Compatibilidad

### ¿Funciona en Internet Explorer?
No, es un navegador muy antiguo.

### ¿Funciona en navegadores antiguos?
No, necesita un navegador moderno (2020+).

### ¿Funciona en tablets?
Sí, tiene diseño responsivo.

### ¿Funciona en smartwatches?
No, la pantalla es muy pequeña.

### ¿Funciona sin conexión a Internet?
No, necesita conexión para conectar a Traccar.

---

## Licencia y Uso

### ¿Puedo usar esto comercialmente?
Sí, es tuyo.

### ¿Puedo venderlo?
Sí, es tuyo.

### ¿Puedo modificarlo?
Sí, es completamente personalizable.

### ¿Necesito dar crédito?
No es obligatorio, pero es apreciado.

### ¿Puedo compartir el código?
Sí, es libre.

---

## Contacto y Comunidad

### ¿Hay una comunidad?
Sí, la comunidad de Traccar: https://www.traccar.org/

### ¿Hay un foro?
Sí, en el sitio de Traccar.

### ¿Hay un Discord?
Sí, busca "Traccar Discord".

---

## Más Preguntas

Si tienes más preguntas:
1. Revisa la documentación
2. Busca en Google
3. Pregunta en la comunidad de Traccar
4. Revisa el código fuente

¡Espero que disfrutes tu plataforma GPS!
