CREATE DATABASE IF NOT EXISTS gestion_estudiantes;
USE gestion_estudiantes;

-- TABLA DE USUARIOS PARA LOGIN Y ROLES (RBAC)
CREATE TABLE IF NOT EXISTS usuarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'LECTOR'
);

-- Insertamos usuarios por defecto para pruebas
INSERT IGNORE INTO usuarios (username, password, role) VALUES ('Fernando', 'admin123', 'ADMIN');
INSERT IGNORE INTO usuarios (username, password, role) VALUES ('invitado', '123456', 'LECTOR');

CREATE TABLE IF NOT EXISTS estudiantes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(50) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS cursos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    codigo VARCHAR(50) NOT NULL UNIQUE,
    descripcion VARCHAR(255),
    creditos INT NOT NULL
);

CREATE TABLE IF NOT EXISTS notas (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    estudiante_id BIGINT NOT NULL,
    curso_id BIGINT NOT NULL,
    nota_practica DECIMAL(4,2),
    nota_parcial DECIMAL(4,2),
    nota_final DECIMAL(4,2),
    promedio DECIMAL(4,2),
    FOREIGN KEY (estudiante_id) REFERENCES estudiantes(id) ON DELETE CASCADE,
    FOREIGN KEY (curso_id) REFERENCES cursos(id) ON DELETE CASCADE,
    CONSTRAINT uk_nota_alumno_curso UNIQUE (estudiante_id, curso_id)
);
