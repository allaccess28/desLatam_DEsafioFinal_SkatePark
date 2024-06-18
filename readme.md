# Desafio Final Skate Park

Creacion de un CRUD con login, hasheo de passwords, validaciones, etc.

## Proyecto Creado 

### @allaccess28 https://github.com/allaccess28

## Descripción del proyecto

El proyecto consta de un CRUD directo a una base de datos local mostrando ingresos y cambios en los estados de los participantes por medio de perfiles de bajo nivel y perfiles de administracion

## Capturas de Pantalla del Proyecto

Incluir capturas de pantalla o imágenes que muestren el proyecto en funcionamiento.

![Home](/public/img/1.png)
Vista inicio de la aplicación.

![Login](/public/img/2.png)
Vista Login

![Register](/public/img/3.png)
Vista Registro

![Update](/public/img/4.png)
Vista Update

![Admin](/public/img/5.png)
Vista Admin
## Prerrequisitos o Dependencias

Para Ejecutar este proyecto se requiere:

- VsCode
- Javascript
- NodeJS
- PostgreSQL, dbeaver, PGAdmin
- Otros...

## Instalación del Proyecto

Como configurar el entorno de desarrollo e instalar todas las dependencias.

Crear una Base de Datos con las Sentencias SQL de la carpeta `sql`

Instalar las Dependencias de Node

Crear un `.env` con las credenciales de la base de datos. Para Referencia ver el archivo `.envMockup`

Si Posee NodeJS previo a la version 21 Instalar e implementar `dotenv`

## Instrucciones para Ejecutar el Proyecto

Instrucciones para ejecutar el proyecto una vez instalado.

```bash
#npm run dev
```


## Credenciales de Acceso
Cada usuario al registrarse puede entrar con su email y password (min 6 caracteres) a las opciones simples de su perfil.

### Es importante tener una imagen pequeña para su perfil.

### Para Usuario Tipo Administrador
Para el Administrador  debe ingresar con un email y password (min 6 caracteres) previamente registrado en el archivo`.env` bajo las variables de entorno:

- GOD_EMAIL
- GOD_PASSWORD

Estas Variables se discriminaran automaticamente en el login dandole acceso al entorno de admin donde puede aprobar los perfiles de los participantes.

