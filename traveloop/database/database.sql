CREATE DATABASE IF NOT EXISTS traveloop
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE traveloop;

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS trip_shares;
DROP TABLE IF EXISTS trip_notes;
DROP TABLE IF EXISTS packing_items;
DROP TABLE IF EXISTS expenses;
DROP TABLE IF EXISTS invoice_items;
DROP TABLE IF EXISTS trip_activities;
DROP TABLE IF EXISTS trip_stops;
DROP TABLE IF EXISTS trips;
DROP TABLE IF EXISTS activity_categories;
DROP TABLE IF EXISTS cities;
DROP TABLE IF EXISTS users;

SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE users (
    id CHAR(36) NOT NULL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(30) NULL,
    city VARCHAR(100) NULL,
    country VARCHAR(100) NULL,
    avatar_url VARCHAR(500) NULL,
    bio TEXT NULL,
    preferred_language VARCHAR(10) DEFAULT 'en',
    currency CHAR(3) DEFAULT 'USD',
    is_email_verified BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL,
    UNIQUE KEY uq_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE cities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    country VARCHAR(100) NOT NULL,
    country_code CHAR(2) NULL,
    latitude DECIMAL(10,8) NULL,
    longitude DECIMAL(11,8) NULL,
    cost_index DECIMAL(5,2) DEFAULT 1.00,
    popularity_score INT DEFAULT 0,
    image_url VARCHAR(500) NULL,
    description TEXT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_cities_name_country (name, country)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE activity_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    icon VARCHAR(100) NULL,
    color CHAR(7) DEFAULT '#3B82F6',
    UNIQUE KEY uq_activity_categories_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE trips (
    id CHAR(36) NOT NULL PRIMARY KEY,
    user_id CHAR(36) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    cover_image_url VARCHAR(500) NULL,
    status ENUM('draft', 'planned', 'ongoing', 'completed', 'cancelled') DEFAULT 'draft',
    total_budget DECIMAL(12,2) DEFAULT 0.00,
    tax_amount DECIMAL(12,2) DEFAULT 0.00,
    discount_amount DECIMAL(12,2) DEFAULT 0.00,
    grand_total DECIMAL(12,2) GENERATED ALWAYS AS (total_budget + tax_amount - discount_amount) STORED,
    currency CHAR(3) DEFAULT 'USD',
    payment_status ENUM('unpaid', 'paid', 'partial') DEFAULT 'unpaid',
    paid_at DATETIME NULL,
    is_public BOOLEAN DEFAULT FALSE,
    public_slug VARCHAR(100) NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL,
    UNIQUE KEY uq_trips_public_slug (public_slug),
    KEY idx_trips_user (user_id),
    KEY idx_trips_public (is_public, public_slug),
    CONSTRAINT fk_trips_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE trip_stops (
    id CHAR(36) NOT NULL PRIMARY KEY,
    trip_id CHAR(36) NOT NULL,
    city_id INT NULL,
    city_name VARCHAR(150) NOT NULL,
    arrival_date DATE NOT NULL,
    departure_date DATE NOT NULL,
    stop_order INT NOT NULL,
    accommodation_name VARCHAR(255) NULL,
    accommodation_cost DECIMAL(10,2) DEFAULT 0.00,
    notes TEXT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uq_trip_stops_order (trip_id, stop_order),
    KEY idx_trip_stops_trip (trip_id),
    KEY idx_trip_stops_city (city_id),
    CONSTRAINT fk_trip_stops_trip FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE,
    CONSTRAINT fk_trip_stops_city FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE trip_activities (
    id CHAR(36) NOT NULL PRIMARY KEY,
    trip_stop_id CHAR(36) NOT NULL,
    category_id INT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT NULL,
    actual_cost DECIMAL(10,2) DEFAULT 0.00,
    scheduled_date DATE NULL,
    start_time TIME NULL,
    duration_minutes INT NULL,
    status ENUM('planned','booked','completed') DEFAULT 'planned',
    tags JSON NULL,
    image_url VARCHAR(500) NULL,
    notes TEXT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    KEY idx_trip_activities_stop (trip_stop_id),
    KEY idx_trip_activities_category (category_id),
    CONSTRAINT fk_trip_activities_stop FOREIGN KEY (trip_stop_id) REFERENCES trip_stops(id) ON DELETE CASCADE,
    CONSTRAINT fk_trip_activities_category FOREIGN KEY (category_id) REFERENCES activity_categories(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE invoice_items (
    id CHAR(36) NOT NULL PRIMARY KEY,
    trip_id CHAR(36) NOT NULL,
    item_type ENUM('hotel', 'flight', 'activity', 'transport', 'meal', 'other') NOT NULL,
    description VARCHAR(255) NOT NULL,
    quantity INT DEFAULT 1,
    unit_cost DECIMAL(10,2) NOT NULL,
    amount DECIMAL(12,2) GENERATED ALWAYS AS (quantity * unit_cost) STORED,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    KEY idx_invoice_items_trip (trip_id),
    CONSTRAINT fk_invoice_items_trip FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE expenses (
    id CHAR(36) NOT NULL PRIMARY KEY,
    trip_id CHAR(36) NOT NULL,
    invoice_item_id CHAR(36) NULL,
    trip_activity_id CHAR(36) NULL,
    category ENUM('accommodation','transport','food','activity','visa','shopping','misc') NOT NULL,
    description VARCHAR(255) NULL,
    amount DECIMAL(10,2) NOT NULL,
    expense_date DATE NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    KEY idx_expenses_trip (trip_id),
    KEY idx_expenses_invoice_item (invoice_item_id),
    KEY idx_expenses_trip_activity (trip_activity_id),
    CONSTRAINT fk_expenses_trip FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE,
    CONSTRAINT fk_expenses_invoice_item FOREIGN KEY (invoice_item_id) REFERENCES invoice_items(id) ON DELETE SET NULL,
    CONSTRAINT fk_expenses_trip_activity FOREIGN KEY (trip_activity_id) REFERENCES trip_activities(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE packing_items (
    id CHAR(36) NOT NULL PRIMARY KEY,
    trip_id CHAR(36) NOT NULL,
    item_name VARCHAR(255) NOT NULL,
    category ENUM('clothing','documents','electronics','toiletries','misc') DEFAULT 'misc',
    is_packed BOOLEAN DEFAULT FALSE,
    quantity INT DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    KEY idx_packing_items_trip (trip_id),
    CONSTRAINT fk_packing_items_trip FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE trip_notes (
    id CHAR(36) NOT NULL PRIMARY KEY,
    trip_id CHAR(36) NOT NULL,
    trip_stop_id CHAR(36) NULL,
    title VARCHAR(200) NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    KEY idx_trip_notes_trip (trip_id),
    KEY idx_trip_notes_stop (trip_stop_id),
    CONSTRAINT fk_trip_notes_trip FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE,
    CONSTRAINT fk_trip_notes_stop FOREIGN KEY (trip_stop_id) REFERENCES trip_stops(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE trip_shares (
    id CHAR(36) NOT NULL PRIMARY KEY,
    trip_id CHAR(36) NOT NULL,
    share_type ENUM('public','private_link') DEFAULT 'public',
    public_slug VARCHAR(100) NULL,
    expires_at DATETIME NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_trip_shares_public_slug (public_slug),
    KEY idx_trip_shares_trip (trip_id),
    CONSTRAINT fk_trip_shares_trip FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DELIMITER $$

CREATE TRIGGER before_insert_users
BEFORE INSERT ON users
FOR EACH ROW
BEGIN
    IF NEW.id IS NULL OR NEW.id = '' THEN
        SET NEW.id = UUID();
    END IF;
END$$

CREATE TRIGGER before_insert_trips
BEFORE INSERT ON trips
FOR EACH ROW
BEGIN
    IF NEW.id IS NULL OR NEW.id = '' THEN
        SET NEW.id = UUID();
    END IF;
END$$

CREATE TRIGGER before_insert_trip_stops
BEFORE INSERT ON trip_stops
FOR EACH ROW
BEGIN
    IF NEW.id IS NULL OR NEW.id = '' THEN
        SET NEW.id = UUID();
    END IF;
END$$

CREATE TRIGGER before_insert_trip_activities
BEFORE INSERT ON trip_activities
FOR EACH ROW
BEGIN
    IF NEW.id IS NULL OR NEW.id = '' THEN
        SET NEW.id = UUID();
    END IF;
END$$

CREATE TRIGGER before_insert_invoice_items
BEFORE INSERT ON invoice_items
FOR EACH ROW
BEGIN
    IF NEW.id IS NULL OR NEW.id = '' THEN
        SET NEW.id = UUID();
    END IF;
END$$

CREATE TRIGGER before_insert_expenses
BEFORE INSERT ON expenses
FOR EACH ROW
BEGIN
    IF NEW.id IS NULL OR NEW.id = '' THEN
        SET NEW.id = UUID();
    END IF;
END$$

CREATE TRIGGER before_insert_packing_items
BEFORE INSERT ON packing_items
FOR EACH ROW
BEGIN
    IF NEW.id IS NULL OR NEW.id = '' THEN
        SET NEW.id = UUID();
    END IF;
END$$

CREATE TRIGGER before_insert_trip_notes
BEFORE INSERT ON trip_notes
FOR EACH ROW
BEGIN
    IF NEW.id IS NULL OR NEW.id = '' THEN
        SET NEW.id = UUID();
    END IF;
END$$

CREATE TRIGGER before_insert_trip_shares
BEFORE INSERT ON trip_shares
FOR EACH ROW
BEGIN
    IF NEW.id IS NULL OR NEW.id = '' THEN
        SET NEW.id = UUID();
    END IF;
END$$

DELIMITER ;