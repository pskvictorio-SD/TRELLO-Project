# TRELLO-Project

Aplicación web tipo **Trello** para la gestión de tareas en equipos de trabajo. Permite a los usuarios crear **workspaces** (espacios de trabajo), **boards** (tableros), **listas** y **tareas**, manteniendo la organización y claridad mediante un sistema de **invitaciones**, **roles** y **colaboración en equipo**.

## ✨ Características

- 🔐 **Autenticación JWT**: Registro e inicio de sesión seguro con contraseñas encriptadas (bcrypt).
- 🗂️ **Workspaces**: Espacios de trabajo para organizar proyectos.
- 📋 **Boards**: Tableros dentro de cada workspace.
- 📌 **Listas y Tareas**: Organización de tareas con posiciones reordenables.
- 🖱️ **Drag & Drop**: Arrastra y suelta tareas entre listas (dnd-kit).
- 👥 **Invitaciones**: Sistema de invitaciones a boards con estados (pendiente/aceptada/rechazada).
- 🛡️ **Roles y permisos**: Roles de administrador, miembro y visor en boards.
- 🔔 **Notificaciones**: Gestión de invitaciones y notificaciones en tiempo real.
- 🎨 **UI moderna**: Tailwind CSS 4, animaciones con Motion e iconos de React Icons.

## 🏗️ Arquitectura

Monorepo con dos aplicaciones independientes:

```
TRELLO-Project/
├── backend/    → API REST (Node.js + Express + MySQL)
└── frontend/   → SPA (React 19 + Vite + Tailwind CSS)
```

## 🛠️ Stack Tecnológico

### Backend
| Tecnología | Uso |
|------------|-----|
| Node.js | Entorno de ejecución |
| Express 5 | Framework web |
| MySQL (mysql2) | Base de datos relacional |
| JWT (jsonwebtoken) | Autenticación |
| bcryptjs | Encriptación de contraseñas |
| CORS | Control de acceso entre orígenes |
| dotenv | Variables de entorno |
| Nodemon | Recarga automática en desarrollo |

### Frontend
| Tecnología | Uso |
|------------|-----|
| React 19 | Librería UI |
| Vite 7 | Bundler y dev server |
| Tailwind CSS 4 | Estilos |
| React Router 7 | Navegación |
| Axios | Cliente HTTP |
| @dnd-kit | Drag & Drop |
| Motion | Animaciones |
| React Icons | Iconos |

## 📁 Estructura del Proyecto

### Backend (`backend/`)

```
backend/
├── app.js                     # Configuración de Express, CORS y rutas
├── .env                       # Variables de entorno
└── src/
    ├── controllers/           # Lógica de negocio por entidad
    │   ├── auth.controller.js
    │   ├── user.controller.js
    │   ├── workspace.controller.js
    │   ├── board.controller.js
    │   ├── boardInvitations.controller.js
    │   ├── boardMembers.controller.js
    │   ├── list.controller.js
    │   └── task.controller.js
    ├── database/
    │   ├── db.js              # Conexión a MySQL
    │   └── script_db.js       # Script de creación de tablas
    ├── middleware/            # Autenticación, roles y validaciones
    │   ├── auth.middleware.js
    │   ├── userInBoard.js
    │   ├── userInWorkspace.js
    │   ├── userRoleInBoard.js
    │   ├── validateListExistsAndBelongsToBoard.js
    │   └── validateTaskIsInList.js
    ├── routes/                # Definición de endpoints
    │   ├── auth.route.js
    │   ├── user.routes.js
    │   ├── workspace.route.js
    │   ├── board.route.js
    │   ├── boardInvitations.route.js
    │   ├── boardMembers.route.js
    │   ├── list.route.js
    │   └── task.route.js
    └── utils/
        └── jwt.js             # Utilidades JWT
```

### Frontend (`frontend/`)

```
frontend/
├── index.html
├── vite.config.js
├── eslint.config.js
└── src/
    ├── main.jsx               # Punto de entrada
    ├── App.jsx                # Configuración de rutas
    ├── contexts/
    │   └── dataContext.jsx    # Estado global central
    ├── pages/
    │   ├── Login.jsx
    │   ├── Register.jsx
    │   ├── Workspace.jsx
    │   ├── Board.jsx
    │   └── Home.jsx
    ├── layouts/
    │   ├── AppLayout.jsx      # Layout autenticado
    │   └── AuthLayout.jsx     # Layout de autenticación
    ├── components/
    │   ├── board/
    │   ├── layouts/
    │   ├── modals/
    │   ├── task/
    │   ├── ui/
    │   └── Notifications.jsx
    ├── hooks/                 # Hooks personalizados
    │   ├── useWorkspace.js
    │   ├── useBoards.js
    │   ├── useLists.js
    │   ├── useTasks.js
    │   ├── useDragAndDrop.js
    │   ├── useFetch.js
    │   ├── useForm.js
    │   ├── useModal.js
    │   ├── useNotifications.js
    │   ├── useInvitation.js
    │   └── useMembers.js
    ├── services/              # Capa de API (Axios)
    │   ├── auth.service.js
    │   ├── workspace.service.js
    │   ├── board.service.js
    │   ├── list.service.js
    │   ├── task.service.js
    │   ├── invitation.service.js
    │   └── member.service.js
    ├── utils/
    │   ├── protectedRoutes.jsx
    │   ├── ModalRenderer.jsx
    │   ├── handleDragEnd.js
    │   └── useReorder.js
    └── styles/
        └── global.css
```

## 🗄️ Modelo de Datos

| Tabla | Descripción | Campos principales |
|-------|-------------|-------------------|
| `users` | Usuarios de la plataforma | id, username, email, password, avatar, role |
| `workspaces` | Espacios de trabajo | id, name, created_by (FK users) |
| `boards` | Tableros | id, workspace_id (FK), title, description |
| `board_invitations` | Invitaciones a boards | board_id, sender_id, receiver_id, status, role |
| `board_members` | Miembros de boards | board_id, user_id, role |
| `lists` | Listas de tareas | id, board_id, title, position |
| `tasks` | Tareas | id, list_id, title, description, position, due_date |

## 🔌 Endpoints de la API

| Módulo | Ruta base | Funcionalidad |
|--------|-----------|---------------|
| Auth | `/api/auth` | Registro y login |
| Users | `/api/users` | Perfil de usuario |
| Workspaces | `/api/workspaces` | CRUD de workspaces |
| Boards | `/api/workspaces` | CRUD de boards dentro de workspaces |
| Invitaciones | `/api/` | Enviar/aceptar/rechazar invitaciones |
| Miembros | `/api/` | Gestión de miembros de boards |
| Listas | `/api/` | CRUD de listas |
| Tareas | `/api/` | CRUD de tareas |

## 🚀 Instalación y Configuración

### Requisitos previos
- Node.js (v18 o superior)
- MySQL (v8 o superior)

### 1. Clonar el repositorio

```bash
git clone https://github.com/pskvictorio-SD/TRELLO-Project.git
cd TRELLO-Project
```

### 2. Configurar el backend

```bash
cd backend
npm install
```

Crear el archivo `.env` en `backend/` con las siguientes variables:

```env
PORT=3000
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=trello_app
JWT_SECRET=tu_secreto_jwt
```

> **Nota**: La base de datos y las tablas se crean automáticamente al iniciar el servidor mediante `script_db.js`.

### 3. Configurar el frontend

```bash
cd frontend
npm install
```

Crear el archivo `.env` en `frontend/` con la siguiente variable:

```env
VITE_API_URL=http://localhost:3000/api
```

### 4. Ejecutar en desarrollo

**Backend** (en `backend/`):
```bash
npm run dev
```

**Frontend** (en `frontend/`):
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173` y la API en `http://localhost:3000`.

## 📜 Scripts Disponibles

### Backend
| Comando | Descripción |
|---------|-------------|
| `npm start` | Inicia el servidor en producción |
| `npm run dev` | Inicia el servidor con nodemon (recarga automática) |

### Frontend
| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo de Vite |
| `npm run build` | Compila la aplicación para producción |
| `npm run preview` | Previsualiza la compilación de producción |
| `npm run lint` | Ejecuta ESLint |

## 🧭 Flujo de Uso

1. **Registro/Login**: Crea una cuenta o inicia sesión.
2. **Crear Workspace**: Crea un espacio de trabajo para tu proyecto.
3. **Crear Boards**: Dentro del workspace, crea tableros para organizar el trabajo.
4. **Crear Listas**: Añade listas (ej. "Por hacer", "En progreso", "Hecho").
5. **Crear Tareas**: Añade tareas a las listas y muévelas con drag & drop.
6. **Invitar Miembros**: Invita a otros usuarios al board y asigna roles.
7. **Colaborar**: Los miembros aceptan invitaciones y trabajan en conjunto.

## 🔒 Seguridad

- Contraseñas encriptadas con **bcryptjs**.
- Autenticación mediante **JWT**.
- Middlewares de validación de **pertenencia** a boards y workspaces.
- Middlewares de **roles** para control de permisos.
- Validación de relaciones entre entidades (listas pertenecientes a boards, tareas en listas).

## 🌐 Despliegue

El proyecto está preparado para desplegarse en:
- **Frontend**: Vercel (referencia en la configuración CORS del backend).
- **Backend**: Servidor Node.js con MySQL (Railway, Render, etc.).

## 📄 Licencia

Proyecto personal de desarrollo. Sin licencia específica.