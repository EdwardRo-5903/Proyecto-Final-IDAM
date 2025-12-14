# TaskMaster - Gestor de Tareas Móvil

Aplicación moderna de gestión de tareas con autenticación, búsqueda, filtrado y edición completa de tareas. Construida con **Ionic + React** y **Vite** para máxima velocidad.

---

## 🎯 Características Principales

### ✅ Autenticación
- **Login y Registro** de usuarios en la pantalla inicial
- Contraseñas **encriptadas con SHA-256**
- Almacenamiento seguro en localStorage
- Acceso restringido a todas las pantallas sin login

### 📋 Gestión de Tareas
- **Crear tareas** con título, descripción, categoría, etiquetas y fecha de vencimiento
- **Editar tareas** existentes
- **Eliminar tareas**
- **Marcar como completadas** o desmarcar
- **12 categorías disponibles**: Trabajo, Casa, Negocios, Personal, Estudios, Salud, Finanzas, Compras, Viajes, Deportes, Entretenimiento, Proyectos

### 🏷️ Etiquetas Personalizables
- 40+ etiquetas predefinidas
- **Crear etiquetas personalizadas** sobre la marcha
- Búsqueda de etiquetas en tiempo real
- Múltiples etiquetas por tarea

### 📅 Funcionalidades Avanzadas
- **Selector de fecha** para vencimiento de tareas
- **Búsqueda por título/descripción**
- **Filtros por categoría**
- **Filtros por estado** (Pendientes/Completadas)
- **Vista de inicio** con tareas agrupadas por categoría
- **Vista de lista** con resumen de pendientes/completadas

### 🎨 Diseño
- Interfaz moderna con **Fredoka font** (Comic Sans inspirado)
- **Inputs redondeados** con fondo blanco
- Bordes circulares suaves sin artefactos
- Completamente **responsivo** para móvil, tablet y escritorio
- Navegación intuitiva entre pantallas

---

## 📱 Pantallas

| Pantalla | Descripción |
|----------|-------------|
| **Login** | Autenticación con usuario/contraseña. Opción de registrarse |
| **Inicio** | Título "Mis Tareas" + tareas agrupadas por categoría + botones de resumen/agregar |
| **Lista (Resumen)** | Búsqueda, filtros por estado y categoría, listado de tareas |
| **Agregar/Editar** | Formulario completo para crear o modificar tareas |
| **Detalle** | Vista de tarea con opciones: Editar, Completar, Eliminar |

---

## 🚀 Instalación y Ejecución

### Requisitos Previos
- **Node.js 18** o superior  
  [Descargar Node.js](https://nodejs.org/)
- **Windows, Mac o Linux**

### Pasos para Ejecutar

#### 1️⃣ Abre PowerShell o CMD
En Windows, presiona `Win + R`, escribe `powershell` y presiona Enter.

#### 2️⃣ Ve a la carpeta del proyecto
```powershell
cd "c:\Users\EdwardDev\Desktop\Proyecto Final IDAM\taskmaster-ionic"
```

#### 3️⃣ Instala las dependencias
```powershell
npm install
```
Esto descargará todas las librerías necesarias.

#### 4️⃣ Inicia el servidor de desarrollo
```powershell
npm run dev
```

#### 5️⃣ Abre en el navegador
Busca la URL que aparece en la terminal (generalmente **http://localhost:5173**)  
Cópiala y pégala en tu navegador favorito.

#### 6️⃣ ¡Comienza a usar!
- Crea una cuenta en "Registrarse"
- Agrega tus primeras tareas
- Organiza por categorías
- ¡Disfruta tu gestor de tareas!

---

## 🛠️ Comandos Disponibles

```powershell
# Ejecutar en modo desarrollo
npm run dev

# Compilar para producción
npm run build

# Ver la compilación en navegador
npm run preview
```

---

## 💾 Almacenamiento de Datos

Todos los datos se guardan en **localStorage** del navegador:
- **Usuarios**: `taskmaster.users` (contraseñas encriptadas)
- **Tareas**: `taskmaster.tasks` (con todas las propiedades)
- **Sesión**: `taskmaster.auth` (usuario actual)

Los datos **persisten** incluso si cierras el navegador.

---

## 📁 Estructura del Proyecto

```
taskmaster-ionic/
├── src/
│   ├── pages/
│   │   ├── Login.tsx        # Autenticación
│   │   ├── Home.tsx         # Inicio con resumen
│   │   ├── List.tsx         # Listado con filtros
│   │   ├── Add.tsx          # Crear/Editar tareas
│   │   └── Detail.tsx       # Vista de detalle
│   ├── auth.ts              # Sistema de autenticación
│   ├── services.ts          # Lógica de tareas
│   ├── theme.css            # Estilos globales
│   └── main.tsx             # Punto de entrada
├── package.json             # Dependencias
├── vite.config.ts           # Configuración Vite
└── README.md                # Este archivo
```

---

## 🔐 Seguridad

- ✅ **SHA-256**: Las contraseñas se encriptan antes de guardar
- ✅ **localStorage seguro**: No se exponen datos sensibles en la URL
- ✅ **Rutas protegidas**: Acceso solo con sesión activa
- ✅ **Logout**: Limpia la sesión completamente

---

## ⚙️ Tecnologías Usadas

| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| React | 18.2.0 | Framework UI |
| Ionic | 8.2.6 | Componentes móviles |
| Vite | 5.1.0 | Build tool ultra-rápido |
| React Router | 6.21.1 | Navegación entre páginas |
| TypeScript | 5.6.3 | Tipado de código |
| ionicons | 7.2.2 | Iconos profesionales |

---

## 📝 Licencia

Creado por **EdwardDv** - 2025
