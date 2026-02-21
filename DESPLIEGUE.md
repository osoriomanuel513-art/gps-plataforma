# Guía de Despliegue - GPS Tracker

Instrucciones paso a paso para subir tu plataforma a diferentes hosting.

## Opción 1: Netlify (Recomendado - Gratis)

### Paso 1: Preparar archivos
1. Crea una carpeta con todos tus archivos:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `config.js`

### Paso 2: Crear cuenta en Netlify
1. Ve a https://www.netlify.com
2. Haz clic en "Sign up"
3. Crea una cuenta (puedes usar GitHub, Google, etc.)

### Paso 3: Desplegar
1. Arrastra la carpeta con tus archivos a Netlify
2. ¡Listo! Tu sitio estará en línea en segundos

### Paso 4: Dominio personalizado (opcional)
1. En Netlify, ve a "Domain settings"
2. Agrega tu dominio personalizado
3. Sigue las instrucciones para configurar DNS

---

## Opción 2: Vercel (Gratis)

### Paso 1: Crear cuenta
1. Ve a https://vercel.com
2. Haz clic en "Sign Up"
3. Crea una cuenta

### Paso 2: Desplegar
1. Haz clic en "New Project"
2. Selecciona "Import Git Repository" o "Continue with GitHub"
3. Sube tus archivos
4. Haz clic en "Deploy"

---

## Opción 3: GitHub Pages (Gratis)

### Paso 1: Crear repositorio
1. Ve a https://github.com/new
2. Crea un repositorio llamado `gps-tracker`
3. Haz clic en "Create repository"

### Paso 2: Subir archivos
```bash
# Clona el repositorio
git clone https://github.com/tu-usuario/gps-tracker.git
cd gps-tracker

# Copia tus archivos aquí
# index.html, styles.css, app.js, config.js

# Sube los cambios
git add .
git commit -m "Initial commit"
git push origin main
```

### Paso 3: Habilitar GitHub Pages
1. Ve a tu repositorio en GitHub
2. Haz clic en "Settings"
3. Busca "Pages" en el menú izquierdo
4. En "Source", selecciona "main" branch
5. Haz clic en "Save"

Tu sitio estará en: `https://tu-usuario.github.io/gps-tracker`

---

## Opción 4: Tu Propio Servidor (cPanel/Hosting)

### Paso 1: Acceder a cPanel
1. Ve a `tu-dominio.com/cpanel`
2. Inicia sesión con tus credenciales

### Paso 2: Subir archivos
1. Abre "File Manager"
2. Navega a la carpeta `public_html`
3. Sube tus archivos:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `config.js`

### Paso 3: Acceder
Tu sitio estará en: `https://tu-dominio.com`

---

## Opción 5: AWS S3 + CloudFront

### Paso 1: Crear bucket S3
1. Ve a https://aws.amazon.com
2. Inicia sesión o crea una cuenta
3. Ve a S3
4. Haz clic en "Create bucket"
5. Nombre: `gps-tracker-tu-empresa`
6. Haz clic en "Create"

### Paso 2: Subir archivos
1. Abre tu bucket
2. Haz clic en "Upload"
3. Selecciona tus archivos
4. Haz clic en "Upload"

### Paso 3: Habilitar sitio web estático
1. Ve a "Properties"
2. Busca "Static website hosting"
3. Haz clic en "Edit"
4. Selecciona "Enable"
5. Index document: `index.html`
6. Haz clic en "Save"

### Paso 4: Configurar permisos
1. Ve a "Permissions"
2. Busca "Block public access"
3. Haz clic en "Edit"
4. Desactiva todas las opciones
5. Haz clic en "Save"

Tu sitio estará disponible en la URL que aparece en "Static website hosting"

---

## Opción 6: Docker (Para servidores avanzados)

### Paso 1: Crear Dockerfile
```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Paso 2: Crear imagen
```bash
docker build -t gps-tracker .
```

### Paso 3: Ejecutar contenedor
```bash
docker run -p 80:80 gps-tracker
```

Tu sitio estará en: `http://localhost`

---

## Checklist de Despliegue

Antes de desplegar, verifica:

- [ ] Todos los archivos están en la carpeta
- [ ] `index.html` está en la raíz
- [ ] `config.js` está personalizado con tu marca
- [ ] La URL de API de Traccar es correcta
- [ ] Probaste localmente en tu navegador
- [ ] Los colores y logo están personalizados
- [ ] No hay errores en la consola del navegador

---

## Solución de Problemas

### "404 Not Found"
- Asegúrate de que `index.html` está en la raíz
- Verifica que todos los archivos se subieron correctamente

### "CORS Error"
- Esto es normal si tu API de Traccar no tiene CORS habilitado
- Solución: Usa un proxy CORS o configura CORS en Traccar

### "Mapa no carga"
- Verifica tu conexión a Internet
- Comprueba que OpenStreetMap esté accesible

### "No puedo conectar a Traccar"
- Verifica la URL de la API
- Asegúrate de que Traccar esté en línea
- Comprueba usuario y contraseña

---

## Dominio Personalizado

### Con Netlify
1. Ve a "Domain settings"
2. Haz clic en "Add domain"
3. Ingresa tu dominio
4. Sigue las instrucciones de DNS

### Con tu hosting
1. Ve a tu panel de control
2. Busca "Domains" o "DNS"
3. Apunta tu dominio al servidor
4. Espera 24-48 horas para que se propague

---

## HTTPS (SSL)

### Netlify
- Automático, incluido gratis

### Vercel
- Automático, incluido gratis

### GitHub Pages
- Automático, incluido gratis

### Tu hosting
- Generalmente incluido o disponible por un costo
- Busca "Free SSL" o "Let's Encrypt"

---

## Monitoreo

Después de desplegar:

1. Prueba el login con tus credenciales de Traccar
2. Verifica que los dispositivos aparezcan
3. Comprueba que el mapa carga correctamente
4. Prueba en diferentes navegadores
5. Prueba en móvil

---

## Soporte

Si tienes problemas:
1. Revisa la consola del navegador (F12)
2. Verifica los logs de tu hosting
3. Comprueba la conexión a Traccar
4. Revisa el archivo README.md

¡Listo! Tu plataforma GPS está en línea.
