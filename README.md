# 🎓 EduGestion - Sistema Académico

Un sistema integral para la gestión de estudiantes, cursos y calificaciones. Diseñado con una arquitectura cliente-servidor clásica (Monolito Java EE) y una moderna interfaz de usuario en Vanilla JavaScript (SPA), ofreciendo una experiencia fluida, rápida y responsiva.

---

## 🚀 Características Principales

*   **Gestión Completa (CRUD):** Administración eficiente de Estudiantes, Cursos y Calificaciones.
*   **Roles y Permisos:** 
    *   **ADMIN:** Acceso total para crear, editar y eliminar registros.
    *   **LECTOR:** Acceso de solo lectura para visualizar información académica.
*   **Arquitectura SPA (Single Page Application):** Navegación sin recargas utilizando Vanilla JS y un enrutador personalizado basado en hashes.
*   **Interfaz de Usuario Premium:** Diseño moderno con Tailwind CSS, soporte para **Modo Claro / Modo Oscuro** y notificaciones Toast integradas.
*   **Servicios RESTful:** Backend construido puramente sobre la especificación JAX-RS (Java EE) comunicándose exclusivamente mediante formato JSON.

---

## 🛠️ Tecnologías Utilizadas

### Backend (API REST)
*   **Lenguaje:** Java 21 LTS
*   **Servidor de Aplicaciones:** Apache Tomcat 9
*   **Especificación REST:** JAX-RS (Jersey / RESTEasy)
*   **Base de Datos:** MySQL Server 8+
*   **Gestión de Dependencias y Build:** Maven / Eclipse WTP

### Frontend (Cliente Web SPA)
*   **Lenguaje:** HTML5, CSS3, JavaScript (ES6+)
*   **Estilos:** Tailwind CSS (vía CDN)
*   **Iconos:** Lucide Icons
*   **Estado y Rutas:** Sistema reactivo propio (Vanilla JS) sin frameworks pesados.

---

## 📸 Capturas de Pantalla
<img width="1919" height="920" alt="image" src="https://github.com/user-attachments/assets/b1ab2549-c2c7-448e-aaf2-85de918daf11" />
<img width="1919" height="916" alt="image" src="https://github.com/user-attachments/assets/5f358e27-0f14-4a72-8ecf-7f0ba93cb52f" />
<img width="1919" height="938" alt="image" src="https://github.com/user-attachments/assets/0abcc107-17ea-4251-a584-6586e312d7a6" />
<img width="1919" height="942" alt="image" src="https://github.com/user-attachments/assets/4065544c-d6ab-443f-aeba-0adac4375a64" />


---

## ⚙️ Instalación y Despliegue

### Prerrequisitos
*   Java JDK 21 o superior
*   Apache Tomcat 9.x
*   MySQL Server
*   Eclipse IDE for Enterprise Java Web Developers (recomendado)
*   Visual Studio Code (con extensión "Live Server" para el frontend)

### 1. Configuración de la Base de Datos
Ejecuta el script SQL incluido para crear la base de datos y las tablas necesarias:
```sql
CREATE DATABASE gestion_estudiantes;
USE gestion_estudiantes;
-- Ejecutar el contenido del archivo gestion_estudiantes.sql
```

### 2. Despliegue del Backend
1.  Abre Eclipse IDE y configura un servidor **Tomcat 9**.
2.  Importa el proyecto ubicado en la carpeta `/backend` como un proyecto "Existing Maven Project".
3.  Asegúrate de que las credenciales de la base de datos (usuario y contraseña) coincidan en tu clase de conexión `ConectarBD.java`.
4.  Haz clic derecho sobre el proyecto -> **Run As** -> **Run on Server**.
5.  El servidor debe exponer la API en: `http://127.0.0.1:8080/gestion-estudiantes/api/`

### 3. Ejecución del Frontend
1.  Abre Visual Studio Code y carga la carpeta `/frontend`.
2.  Abre el archivo `index.html`.
3.  Inicia la extensión **Live Server** (clic derecho -> *Open with Live Server*).
4.  La aplicación se abrirá en tu navegador (usualmente en `http://127.0.0.1:5500/index.html`).

---

## 👥 Credenciales de Prueba

*   **Administrador:** 
    *   Usuario: `edson`
    *   Contraseña: `admin123`
*   **Lector:**
    *   Usuario: `invitado`
    *   Contraseña: `123`
