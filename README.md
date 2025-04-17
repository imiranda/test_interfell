# 💼 ePayco Wallet – Prueba Full Stack

Este proyecto corresponde a la prueba técnica para el cargo de **Desarrollador Full Stack** y consiste en simular una billetera digital con funcionalidades completas, usando una arquitectura de microservicios desplegada con Docker.

---

## 🧱 Arquitectura General

- **/epayco-wallet/**
- **├── backend/** → Servicio con acceso directo a MongoDB 
- **├── bff/** → Interfaz puente entre frontend y backend (maneja JWT) 
- **└── frontend/** → Interfaz de usuario en React

Todos los servicios corren en contenedores independientes con Docker Compose.

---

## 📦 Tecnologías utilizadas

- **Backend**: Node.js, Express, MongoDB (Mongoose), Nodemailer, JWT
- **BFF**: Node.js, Express, Axios, JWT
- **Frontend**: React (Vite), Tailwind CSS, React Hook Form, Yup, Axios

---

## 🚀 Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/imiranda/test_interfell.git
cd test_interfell
```

### 2. Configurar variables de entorno

```bash
cp backend/.env.dev backend/.env
cp bff/.env.dev bff/.env
```

### 3. Verifica el contenido de los .env

🟦 backend/.env
⚠️ IMPORTANTE: Este archivo requiere configuración de correo real o simulada.

```bash
EMAIL_USER=tuemail@gmail.com
EMAIL_PASS=tuclavecorreo
```

### 4. Ejecutar todo con Docker en la raiz del proyecto

```bash
docker-compose up --build
```

Esto lanzará:

- MongoDB en el puerto 27017
- Backend en http://localhost:3001
- BFF en http://localhost:3002
- Frontend en http://localhost:5173

### 5. Flujo funcional

- Registro de cliente (/register)
- Inicio de sesión (/login) y obtención del token JWT (con los mismos datos del /register)
- Recarga de saldo (/deposit)
- Generar compra (/purchase) → (protegida) envía código por correo
- Confirmar compra (/confirm) → (protegida) usa sessionId y token
- Consultar saldo (/balance) → (protegida)

Todas las operaciones protegidas requieren JWT.

### 5. Json Import para trabajar con POSTMAN

🟦 importa el archivo **test_postman_collection.json** que esta en la raiz del proyecto en Postman para poder hacer las pruebas necesarias (el token generado se guarda auntomaticamente en variable de coleccion, no es necesario copiar y pegar)