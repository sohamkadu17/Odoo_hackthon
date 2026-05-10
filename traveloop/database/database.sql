CREATE DATABASE IF NOT EXISTS traveloop 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE traveloop;

-- =============================================
-- 1. USERS
-- =============================================
CREATE TABLE users (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    avatar_url VARCHAR(500),
    bio TEXT,
    preferred_language VARCHAR(10) DEFAULT 'en',
    currency CHAR(3) DEFAULT 'USD',
    is_email_verified BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL
);

-- =============================================
-- 2. CITIES
-- =============================================
CREATE TABLE cities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    country VARCHAR(100) NOT NULL,
    country_code CHAR(2),
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    cost_index DECIMAL(5,2) DEFAULT 1.00,
    popularity_score INT DEFAULT 0,
    image_url VARCHAR(500),
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 3. ACTIVITY CATEGORIES
-- =============================================
CREATE TABLE activity_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    icon VARCHAR(100),
    color CHAR(7) DEFAULT '#3B82F6'
);

-- =============================================
-- 4. TRIPS
-- =============================================
CREATE TABLE trips (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id CHAR(36) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    cover_image_url VARCHAR(500),
    status ENUM('draft', 'planned', 'ongoing', 'completed', 'cancelled') DEFAULT 'draft',
    
    total_budget DECIMAL(12,2) DEFAULT 0.00,
    tax_amount DECIMAL(12,2) DEFAULT 0.00,
    discount_amount DECIMAL(12,2) DEFAULT 0.00,
    grand_total DECIMAL(12,2) GENERATED ALWAYS AS 
        (total_budget + tax_amount - discount_amount) STORED,
    
    currency CHAR(3) DEFAULT 'USD',
    payment_status ENUM('unpaid', 'paid', 'partial') DEFAULT 'unpaid',
    paid_at DATETIME NULL,
    is_public BOOLEAN DEFAULT FALSE,
    public_slug VARCHAR(100) UNIQUE NULL,
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =============================================
-- 5. TRIP STOPS
-- =============================================
CREATE TABLE trip_stops (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    trip_id CHAR(36) NOT NULL,
    city_id INT NULL,
    city_name VARCHAR(150) NOT NULL,
    arrival_date DATE NOT NULL,
    departure_date DATE NOT NULL,
    `order` INT NOT NULL,
    accommodation_name VARCHAR(255),
    accommodation_cost DECIMAL(10,2) DEFAULT 0.00,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE,
    FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE SET NULL
);

CREATE UNIQUE INDEX idx_stop_order ON trip_stops(trip_id, `order`);

-- =============================================
-- 6. TRIP ACTIVITIES (Merged)
-- =============================================
CREATE TABLE trip_activities (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    trip_stop_id CHAR(36) NOT NULL,
    category_id INT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    actual_cost DECIMAL(10,2) DEFAULT 0.00,
    scheduled_date DATE,
    start_time TIME,
    duration_minutes INT,
    status ENUM('planned','booked','completed') DEFAULT 'planned',
    tags JSON,
    image_url VARCHAR(500),
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (trip_stop_id) REFERENCES trip_stops(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES activity_categories(id) ON DELETE SET NULL
);

-- =============================================
-- 7. INVOICE ITEMS (Matches SVG)
-- =============================================
CREATE TABLE invoice_items (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    trip_id CHAR(36) NOT NULL,
    item_type ENUM('hotel', 'flight', 'activity', 'transport', 'meal', 'other') NOT NULL,
    description VARCHAR(255) NOT NULL,
    quantity INT DEFAULT 1,
    unit_cost DECIMAL(10,2) NOT NULL,
    amount DECIMAL(12,2) GENERATED ALWAYS AS (quantity * unit_cost) STORED,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE
);

-- =============================================
-- 8. EXPENSES
-- =============================================
CREATE TABLE expenses (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    trip_id CHAR(36) NOT NULL,
    invoice_item_id CHAR(36) NULL,
    trip_activity_id CHAR(36) NULL,
    category ENUM('accommodation','transport','food','activity','visa','shopping','misc') NOT NULL,
    description VARCHAR(255),
    amount DECIMAL(10,2) NOT NULL,
    expense_date DATE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE,
    FOREIGN KEY (invoice_item_id) REFERENCES invoice_items(id) ON DELETE SET NULL,
    FOREIGN KEY (trip_activity_id) REFERENCES trip_activities(id) ON DELETE SET NULL
);

-- =============================================
-- 9. PACKING ITEMS
-- =============================================
CREATE TABLE packing_items (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    trip_id CHAR(36) NOT NULL,
    item_name VARCHAR(255) NOT NULL,
    category ENUM('clothing','documents','electronics','toiletries','misc') DEFAULT 'misc',
    is_packed BOOLEAN DEFAULT FALSE,
    quantity INT DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE
);

-- =============================================
-- 10. TRIP NOTES
-- =============================================
CREATE TABLE trip_notes (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    trip_id CHAR(36) NOT NULL,
    trip_stop_id CHAR(36) NULL,
    title VARCHAR(200),
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE,
    FOREIGN KEY (trip_stop_id) REFERENCES trip_stops(id) ON DELETE SET NULL
);

-- =============================================
-- 11. TRIP SHARES
-- =============================================
CREATE TABLE trip_shares (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    trip_id CHAR(36) NOT NULL,
    share_type ENUM('public','private_link') DEFAULT 'public',
    public_slug VARCHAR(100) UNIQUE NULL,
    expires_at DATETIME NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE
);

-- =============================================
-- INDEXES
-- =============================================
CREATE INDEX idx_trips_user ON trips(user_id);
CREATE INDEX idx_trips_public ON trips(is_public, public_slug);
CREATE INDEX idx_trip_stops_trip ON trip_stops(trip_id);
CREATE INDEX idx_trip_activities_stop ON trip_activities(trip_stop_id);
CREATE INDEX idx_invoice_items_trip ON invoice_items(trip_id);
CREATE INDEX idx_expenses_trip ON expenses(trip_id);