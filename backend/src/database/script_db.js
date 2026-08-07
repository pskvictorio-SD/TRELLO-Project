export const script_db = `
    CREATE DATABASE IF NOT EXISTS tu_equipo;
    USE tu_equipo;

    -- =========================
    -- USERS
    -- =========================
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) NOT NULL,
        email VARCHAR(150) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        avatar VARCHAR(255),
        is_active BOOLEAN DEFAULT TRUE,
        role ENUM('admin', 'user') DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL
    );

    -- =========================
    -- WORKSPACE
    -- =========================
    CREATE TABLE IF NOT EXISTS workspaces (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        created_by INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (created_by) REFERENCES users(id)
    );

    -- =========================
    -- BOARDS
    -- =========================
    CREATE TABLE IF NOT EXISTS boards (
        id INT AUTO_INCREMENT PRIMARY KEY,
        workspace_id INT NOT NULL,
        title VARCHAR(100) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE
    );

    -- =========================
    -- BOARD INVITATIONS (N:N)
    -- =========================
    CREATE TABLE IF NOT EXISTS board_invitations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        board_id INT NOT NULL,
        sender_id INT NOT NULL,
        receiver_id INT NOT NULL,
        status ENUM('pending','accepted','rejected') DEFAULT 'pending',
        role ENUM('admin', 'member', 'viewer') DEFAULT 'viewer',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (board_id) REFERENCES boards(id) ON DELETE CASCADE,
        FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE
    );

    -- =========================
    -- BOARD MEMBERS (N:N)
    -- =========================
    CREATE TABLE IF NOT EXISTS board_members (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        board_id INT NOT NULL,
        role ENUM('admin', 'member', 'viewer') DEFAULT 'member',
        joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (user_id, board_id),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (board_id) REFERENCES boards(id) ON DELETE CASCADE
    );

    -- =========================
    -- LISTS (COLUMNS)
    -- =========================
    CREATE TABLE IF NOT EXISTS lists (
        id INT AUTO_INCREMENT PRIMARY KEY,
        board_id INT NOT NULL,
        name VARCHAR(100) NOT NULL,
        position INT NOT NULL,
        FOREIGN KEY (board_id) REFERENCES boards(id) ON DELETE CASCADE
    );

    -- =========================
    -- TASKS
    -- =========================
    CREATE TABLE IF NOT EXISTS tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        list_id INT NOT NULL,
        title VARCHAR(150) NOT NULL,
        description TEXT,
        assigned_to INT DEFAULT NULL,
        priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
        due_date DATE,
        position INT NOT NULL,
        created_by INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (list_id) REFERENCES lists(id) ON DELETE CASCADE,
        FOREIGN KEY (created_by) REFERENCES users(id),
        FOREIGN KEY (assigned_to) REFERENCES users(id)
    );

    -- =========================
    -- MIGRACIÓN: Agregar columna assigned_to si no existe
    -- =========================
    DROP PROCEDURE IF EXISTS add_assigned_to_if_not_exists;
    CREATE PROCEDURE add_assigned_to_if_not_exists()
    BEGIN
        IF NOT EXISTS (
            SELECT 1 FROM information_schema.COLUMNS
            WHERE TABLE_SCHEMA = 'tu_equipo'
              AND TABLE_NAME = 'tasks'
              AND COLUMN_NAME = 'assigned_to'
        ) THEN
            ALTER TABLE tasks ADD COLUMN assigned_to INT DEFAULT NULL, ADD FOREIGN KEY (assigned_to) REFERENCES users(id);
        END IF;
    END;
    CALL add_assigned_to_if_not_exists();
    DROP PROCEDURE add_assigned_to_if_not_exists;
`;
