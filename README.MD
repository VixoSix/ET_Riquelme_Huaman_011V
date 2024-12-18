#  CLASS CHECKIN

## Institución
Este proyecto fue desarrollado en colaboración con Duoc UC para la carrera de Ingeniería en Informática.

    Seccion: 014V.
    Profesora: Viviana Soledad Poblete Lopez.


## Autores
* [Hubert Huaman](https://github.com/Hubertjerson)
* [Vicente Riquelme](https://github.com/VixoSix)

---
# Introducción

**Class-Chekin** es un sistema compuesto por **dos aplicaciones móviles** diseñadas para facilitar la gestión de asistencia y la interacción entre estudiantes y profesores. Estas aplicaciones trabajan en conjunto, cada una ofreciendo funcionalidades específicas para sus usuarios.

---
## 📱 Aplicación para Estudiantes

### Funcionalidades Principales:
- **Inicio de sesión**: Accede a la aplicación con tus credenciales.
- **Registro**: Crea una cuenta como estudiante.
- **Recuperar contraseña**: Restaura tu acceso en caso de olvidarla.

### Funcionalidades Adicionales:
- **Clases**: Visualiza las clases asignadas en el sistema.
- **Generación de QR**: Crea un código QR único para registrar tu asistencia en clase.
- **Justificación de faltas**: Envía justificativos en caso de inasistencias.
- **Gestión de perfil**: Consulta y edita tu información personal.

---

## 📲 Aplicación para Profesores

La app para profesores está diseñada para gestionar clases y asistir en el proceso de validación de asistencia. Ofrece las siguientes funcionalidades:

### Funcionalidades Principales:
- **Inicio de sesión**: Accede a la aplicación con tus credenciales.
- **Registro**: Crea una cuenta como profesor.
- **Recuperar contraseña**: Restaura tu acceso en caso de olvidarla.

### Funcionalidades Adicionales:
- **Gestión de clases**: Consulta las clases asignadas y los detalles de cada una.
- **Listado de asistencia**: Visualiza los registros de asistencia de los estudiantes.
- **Escaneo de QR**: Escanea el código QR generado por los estudiantes para registrar su asistencia.
- **Justificaciones**: Accede a las justificaciones enviadas por los estudiantes.
- **Gestión de perfil**: Consulta y edita tu información personal.

---

## 🌟 Características Destacadas

1. **Integración QR**: Utilización de códigos QR para registrar asistencia de manera automatizada.
2. **Sincronización**: Las dos aplicaciones trabajan en conjunto, permitiendo un flujo de información entre estudiantes y profesores.
3. **Interfaz Intuitiva**: Diseñada para facilitar la navegación tanto a estudiantes como a profesores.
4. **Gestión de perfiles**: Los usuarios pueden mantener su información actualizada fácilmente.

---

## Herramientas Utilizadas
* **IONIC7**: Ionic es un conjunto de herramientas de interfaz de usuario de código abierto
* **SCSS**: Hojas de Estilo en Cascada
* **HTML**: El HTML5 es un estándar que sirve para definir la estructura, el diseño y el contenido de una página web
* **ANGULAR**: Lenguaje de Programación Principal
* **ANDROID STUDIO**: Android Studio es el entorno de desarrollo integrado oficial para la plataforma Android.
* **RENDER**: Render es una plataforma en la nube unificada que brinda servicios de alojamiento para varios proyectos. Es escalable, seguro, eficiente y fácil de usar, lo que permite a los equipos crear y lanzar sus sitios web o aplicaciones con facilidad.
* **ANGULAR**: Angular es un framework de código abierto para desarrollar aplicaciones web escalables.

---

## 🛠 Instalación

1. Clona este repositorio:
    ```bash
    git clone https://github.com/Hubertjerson/APPMobile.git
    ```
2. Instalar los dependencias
    ```bash
    npm install -g @ionic/cli@7
    npm install -g @angular/cli@16
    npm install firebase @angular/fire
    npm install swiper@latest
    npm install -g json-server
    Npm install @capacitor/toast
    npm install @capacitor-mlkit/barcode-scanning
    npm install @capacitor/camera
    npm install @capacitor/android
    npm install angularx-qrcode --save
    ```
3. Sincroniza las dependencias de Capacitor con tu plataforma nativa:

    ```bash
    npx ionic cap sync
    ```

4. Asegúrate de agregar las plataformas necesarias para probar la aplicación:

    - Para Android:

        ```bash
        npx ionic cap add android
        ```

5. Inicia un servidor local para el desarrollo (opcional, si usas `json-server` para simular una API REST):

    ```bash
    json-server db.json
    ```

6. Si usas el APP en Emulador este es el link del Deploy Data que se usa para manejar los datos y el Repositorio donde se encuentra:

    ```bash
    https://github.com/Hubertjerson/ApiTestData
    https://apitestdata-1gnv.onrender.com
    ```

7. Ejecuta la aplicación en el navegador para desarrollo:

    ```bash
    ionic serve
    ```

8. Compila y ejecuta la aplicación en un dispositivo o emulador:

    - Para Android:

        ```bash
        ionic capacitor sync android
        ionic capacitor copy android
        ionic capacitor open android
        ```


9. (Opcional) Configura permisos adicionales en el proyecto nativo:

    - **Android**: Edita `AndroidManifest.xml` para incluir permisos necesarios como acceso a la cámara.

---
## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Esto significa que puedes usar, copiar, modificar, fusionar, publicar, distribuir, sublicenciar y/o vender copias del software, siempre y cuando incluyas el aviso de derechos de autor y la licencia en cualquier copia o parte significativa del software.

Consulta el archivo [LICENSE](LICENSE) para más detalles.


