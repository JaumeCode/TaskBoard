# 🗂️ TaskBoard – Vue 3 + Firebase

Aplicación web tipo tablón de tareas donde los usuarios pueden registrarse, verificar su correo y acceder a una zona privada para ver tareas y asignarse algunas a su área de trabajo.

El proyecto está desarrollado con Vue 3 (Composition API), Firebase para la autenticación y base de datos, y desplegado en Vercel.

Enlace a la aplicación:
https://task-board-ruddy-sigma.vercel.app/
---

## 🚀 Funcionalidades principales

- Registro de usuarios con email y contraseña
- Verificación de correo obligatoria
- Login con control de usuarios no verificados
- Rutas protegidas con Vue Router
- Listado de tareas desde una API externa
- Filtros de tareas (todas, completadas, pendientes, asignadas)
- Asignación de tareas a usuarios
- Área de trabajo personal
- Guardado de tareas en Firestore
- Cierre de sesión

---

## 🧑‍💻 Tecnologías usadas

- Vue 3 (API)
- Vue Router
- Firebase Authentication
- Firebase Firestore
- Axios
- Vercel
- GitHub

---

## 🌐 API de tareas

Las tareas se obtienen desde la API pública:

https://dummyjson.com/todos

Cada tarea muestra:
- Texto de la tarea
- Estado (completada o pendiente)

Se gestiona también un estado de carga y mensajes de error si la petición falla.

---

## 🔐 Autenticación y acceso

- El usuario debe pasar por /login o /register
- Al registrarse se envía un correo de verificación
- Sin correo verificado no se puede acceder a las rutas privadas
- Solo los usuarios verificados pueden acceder al tablón y al workspace

---


## 🧭 Rutas de la aplicación

- /login → Inicio de sesión
- /register → Registro
- / → Tablón de tareas (privada)
- /workspace → Área de trabajo (privada)

---

## ☁️ Despliegue

- Proyecto subido a GitHub
- Desplegado en Vercel


---
