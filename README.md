# Sistema de Gestión Académica (SGA)

Proyecto desarrollado durante la materia Programación IV.

## Descripción

El Sistema de Gestión Académica (SGA) es una aplicación web que permitirá administrar alumnos, docentes, cursos y materias.

Durante el desarrollo del proyecto se incorporarán progresivamente nuevas tecnologías y funcionalidades.


## Objetivos

- Gestionar alumnos.
- Gestionar docentes.
- Gestionar cursos.
- Gestionar materias.
- Implementar autenticación de usuarios.
- Consumir una API REST.
- Persistir la información en MongoDB.


## Tecnologías

Actualmente:

- HTML5
- JavaScript
- CSS
- express
- Node.js
- MongoDB


Próximamente:
- React


## Estado del proyecto

- Versión: 
Clase 12 - Estructura actual
SGA/
frontend
 ├── index.html
 ├── alumnos.html
 ├── docentes.html
 │
 ├── css/
 │   └── estilos.css
 │
 └── js/
      ├── alumnos.js
      └── docentes.js
backend
 ├── config/
 |    └── database.js
 ├── controllers/
 |    └── alumnos.controller.js
 ├── data/
 |    └── alumnos.js
 ├── models/
 |    └── Alumno.js
 ├── routes/
      └── alumnos.routes.js

## Estado actual
- Página de inicio y navegación entre módulos
- Módulo alumnos docentes
- CRUD alumnos/docentes
- Validaciones de formularios
- Persistencia mediante localStorage
- Organización del código y refactorización
- Separación inicial entre Frontend y Backend
- Implementación de validaciones para los datos recibidos mediante req.body
- Uso de status 400 para datos inválidos
- status 404 para alumno no encontrado
- status 201 para registrar nuevo alumno
- Manejo básico de errores en la operaciones del CRUD.
- Instalación de mongoose
- Creación de la conexión con MongoDB en config/database.js
- Creación del Schema y modelo Alumno
- Reemplazo del array en memoria por una colección de MongoDB
- Modificación de GET /alumnos para consultar MongoDB mediante mongoose
- Prueba de la API con datos almacenados en MongoDB


## Almacenamiento

- localStorage
- JSON.stringify()
- JSON.parse()
- MongoDB

## Autor

Irina Agretti

Programación IV