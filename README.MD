# Class CheckIn

Class CheckIn es un sistema de gestión de asistencia académica desarrollado como parte de una evaluación de Examen Transversal en Duoc UC para la carrera de Ingeniería en Informática.

El proyecto está compuesto por dos aplicaciones móviles complementarias: una orientada a estudiantes y otra a profesores. Ambas trabajan en conjunto para representar un flujo de registro y gestión de asistencia mediante códigos QR, proporcionando funcionalidades específicas según el rol de cada usuario.

## Descripción del proyecto

El objetivo de Class CheckIn es facilitar el proceso de registro y seguimiento de asistencia en clases mediante una solución móvil que conecta a estudiantes y profesores.

Los estudiantes pueden consultar sus clases, generar códigos QR para registrar su asistencia y gestionar información relacionada con sus inasistencias y perfil.

Los profesores disponen de una aplicación independiente desde la cual pueden consultar sus clases, escanear los códigos QR generados por los estudiantes, revisar registros de asistencia y gestionar justificaciones.

El repositorio utiliza dos ramas principales para separar ambas aplicaciones:

- `Estudiantes`: aplicación destinada a los estudiantes.
- `Profesores`: aplicación destinada a los profesores.

## Aplicación de Estudiantes

La aplicación para estudiantes concentra las funcionalidades relacionadas con clases, asistencia y gestión personal.

### Funcionalidades principales

- Registro de usuarios.
- Inicio de sesión.
- Recuperación de acceso.
- Visualización de clases asignadas.
- Consulta de información relacionada con las clases.
- Generación de códigos QR para el registro de asistencia.
- Envío de justificaciones por inasistencia.
- Visualización y edición de información del perfil.

## Aplicación de Profesores

La aplicación para profesores está orientada a la gestión y validación de la asistencia de los estudiantes.

### Funcionalidades principales

- Registro de usuarios.
- Inicio de sesión.
- Recuperación de acceso.
- Visualización de clases asignadas.
- Consulta de información relacionada con las clases.
- Visualización de registros de asistencia.
- Escaneo de códigos QR generados por los estudiantes.
- Revisión de justificaciones de inasistencia.
- Visualización y edición de información del perfil.

## Flujo general de asistencia

El funcionamiento principal del sistema se basa en la interacción entre ambas aplicaciones:

1. El estudiante inicia sesión en su aplicación.
2. Consulta la clase correspondiente.
3. Genera un código QR asociado al registro de asistencia.
4. El profesor accede a la aplicación destinada a docentes.
5. El profesor escanea el código QR generado por el estudiante.
6. El sistema procesa el registro de asistencia.
7. El profesor puede consultar posteriormente los registros asociados a sus clases.

Esta separación permite que estudiantes y profesores cuenten con interfaces y funcionalidades adaptadas a sus respectivas necesidades, manteniendo un flujo de trabajo común.

## Tecnologías utilizadas

El proyecto fue desarrollado utilizando principalmente las siguientes tecnologías:

- TypeScript
- Angular 18
- Ionic 8
- Firebase
- AngularFire
- Capacitor 6
- HTML
- SCSS
- Android Studio

La aplicación para estudiantes utiliza además:

- Angular QR Code para la generación de códigos QR.

La aplicación para profesores utiliza además:

- ML Kit Barcode Scanning para la lectura de códigos QR.

Durante el desarrollo también se utilizó Render para alojar servicios de datos utilizados por las aplicaciones.

## Estructura del repositorio

El proyecto se encuentra dividido en dos ramas principales.

### Rama Estudiantes

Contiene la aplicación móvil destinada a los estudiantes.

Para acceder a ella:

`git checkout Estudiantes`

### Rama Profesores

Contiene la aplicación móvil destinada a los profesores.

Para acceder a ella:

`git checkout Profesores`

Esta separación permite mantener de forma independiente las interfaces, funcionalidades y dependencias específicas de cada tipo de usuario.

## Instalación

Clonar el repositorio:

`git clone https://github.com/VixoSix/class-checkin.git`

Ingresar al proyecto:

`cd class-checkin`

Seleccionar la aplicación que se desea ejecutar.

Para estudiantes:

`git checkout Estudiantes`

Para profesores:

`git checkout Profesores`

Instalar las dependencias:

`npm install`

Si Ionic CLI no se encuentra instalado:

`npm install -g @ionic/cli`

Ejecutar la aplicación en modo desarrollo:

`ionic serve`

## Ejecución en Android

Sincronizar el proyecto con Android:

`npx ionic cap sync android`

Abrir el proyecto nativo en Android Studio:

`npx ionic cap open android`

Desde Android Studio es posible ejecutar la aplicación utilizando un emulador o un dispositivo Android compatible.

## Contexto académico

Class CheckIn fue desarrollado como parte de una evaluación de Examen Transversal en Duoc UC para la carrera de Ingeniería en Informática.

El proyecto permitió aplicar conocimientos relacionados con:

- Desarrollo de aplicaciones móviles.
- Desarrollo con Angular e Ionic.
- Programación con TypeScript.
- Integración con Firebase.
- Autenticación y gestión de usuarios.
- Separación de funcionalidades según roles.
- Generación y lectura de códigos QR.
- Integración con funcionalidades nativas mediante Capacitor.
- Trabajo colaborativo mediante Git y GitHub.

## Autores

- [Hubert Huaman](https://github.com/Hubertjerson)
- [Vicente Riquelme](https://github.com/VixoSix)

## Institución

Duoc UC  
Ingeniería en Informática
