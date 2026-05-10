CREATE DATABASE IF NOT EXISTS traveloop
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE traveloop;

-- =============================================
-- 1. USERS
-- =============================================
CREATE TABLE users (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    full_name VARCHAR(200),
    phone_number VARCHAR(20),
    avatar_url VARCHAR(500),
    bio TEXT,
    home_city VARCHAR(150),
    country VARCHAR(100),
    passport_nationality VARCHAR(100),
    preferred_language VARCHAR(10) DEFAULT 'en',
    currency CHAR(3) DEFAULT 'USD',
    is_email_verified BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL,
    UNIQUE KEY uq_users_email (email)
);

CREATE INDEX idx_users_phone ON users(phone_number);
CREATE INDEX idx_users_home_city ON users(home_city);
CREATE INDEX idx_users_country ON users(country);

CREATE TABLE auth_accounts (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id CHAR(36) NOT NULL,
    provider VARCHAR(50) NOT NULL,
    provider_account_id VARCHAR(255) NOT NULL,
    access_token VARCHAR(1000),
    refresh_token VARCHAR(1000),
    expires_at DATETIME NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY uq_provider_account (provider, provider_account_id)
);

CREATE TABLE email_verification_tokens (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id CHAR(36) NOT NULL,
    token VARCHAR(255) NOT NULL,
    expires_at DATETIME NOT NULL,
    used_at DATETIME NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY uq_email_verification_token (token)
);

CREATE TABLE password_reset_tokens (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id CHAR(36) NOT NULL,
    token VARCHAR(255) NOT NULL,
    expires_at DATETIME NOT NULL,
    used_at DATETIME NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY uq_password_reset_token (token)
);

-- =============================================
-- 2. CITIES
-- =============================================
CREATE TABLE cities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    country VARCHAR(100) NOT NULL,
    country_code CHAR(2),
    region VARCHAR(100),
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    cost_index DECIMAL(5,2) DEFAULT 1.00,
    popularity_score INT DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0.00,
    trips_count INT DEFAULT 0,
    image_url VARCHAR(500),
    description TEXT,
    tags JSON,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_cities_name ON cities(name);
CREATE INDEX idx_cities_country ON cities(country);
CREATE INDEX idx_cities_region ON cities(region);
CREATE INDEX idx_cities_popularity ON cities(popularity_score);
CREATE INDEX idx_cities_rating ON cities(rating);

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
-- 4. ACTIVITIES / PLACES CATALOG
-- =============================================
CREATE TABLE catalog_items (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    city_id INT NULL,
    category_id INT NULL,
    item_type ENUM('activity', 'place') NOT NULL DEFAULT 'activity',
    name VARCHAR(255) NOT NULL,
    description TEXT,
    duration_minutes INT,
    price DECIMAL(10,2) DEFAULT 0.00,
    rating DECIMAL(3,2) DEFAULT 0.00,
    review_count INT DEFAULT 0,
    image_url VARCHAR(500),
    emoji VARCHAR(10),
    is_trending BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    tags JSON,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE SET NULL,
    FOREIGN KEY (category_id) REFERENCES activity_categories(id) ON DELETE SET NULL
);

CREATE INDEX idx_catalog_city ON catalog_items(city_id);
CREATE INDEX idx_catalog_category ON catalog_items(category_id);
CREATE INDEX idx_catalog_rating ON catalog_items(rating);
CREATE INDEX idx_catalog_trending ON catalog_items(is_trending);

-- =============================================
-- 5. TRIPS
-- =============================================
CREATE TABLE trips (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id CHAR(36) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    traveler_count INT NOT NULL DEFAULT 1,
    cover_image_url VARCHAR(500),
    status ENUM('draft', 'planned', 'ongoing', 'completed', 'cancelled') DEFAULT 'draft',
    total_budget DECIMAL(12,2) DEFAULT 0.00,
    tax_amount DECIMAL(12,2) DEFAULT 0.00,
    discount_amount DECIMAL(12,2) DEFAULT 0.00,
    grand_total DECIMAL(12,2) GENERATED ALWAYS AS (total_budget + tax_amount - discount_amount) STORED,
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

CREATE INDEX idx_trips_user ON trips(user_id);
CREATE INDEX idx_trips_status ON trips(status);
CREATE INDEX idx_trips_public ON trips(is_public, public_slug);

CREATE TABLE trip_collaborators (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    trip_id CHAR(36) NOT NULL,
    user_id CHAR(36) NULL,
    invited_email VARCHAR(255) NULL,
    role ENUM('owner', 'editor', 'viewer') DEFAULT 'viewer',
    status ENUM('invited', 'accepted', 'declined') DEFAULT 'invited',
    invited_by CHAR(36) NULL,
    joined_at DATETIME NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (invited_by) REFERENCES users(id) ON DELETE SET NULL,
    UNIQUE KEY uq_trip_member (trip_id, user_id),
    UNIQUE KEY uq_trip_invite (trip_id, invited_email)
);

-- =============================================
-- 6. TRIP STOPS
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
CREATE INDEX idx_trip_stops_trip ON trip_stops(trip_id);

-- =============================================
-- 7. TRIP ACTIVITIES
-- =============================================
CREATE TABLE trip_activities (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    trip_stop_id CHAR(36) NOT NULL,
    catalog_item_id CHAR(36) NULL,
    category_id INT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    actual_cost DECIMAL(10,2) DEFAULT 0.00,
    scheduled_date DATE,
    start_time TIME,
    duration_minutes INT,
    status ENUM('planned', 'booked', 'completed') DEFAULT 'planned',
    tags JSON,
    image_url VARCHAR(500),
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (trip_stop_id) REFERENCES trip_stops(id) ON DELETE CASCADE,
    FOREIGN KEY (catalog_item_id) REFERENCES catalog_items(id) ON DELETE SET NULL,
    FOREIGN KEY (category_id) REFERENCES activity_categories(id) ON DELETE SET NULL
);

CREATE INDEX idx_trip_activities_stop ON trip_activities(trip_stop_id);
CREATE INDEX idx_trip_activities_category ON trip_activities(category_id);

-- =============================================
-- 8. INVOICE ITEMS
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

CREATE INDEX idx_invoice_items_trip ON invoice_items(trip_id);

CREATE TABLE trip_budget_categories (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    trip_id CHAR(36) NOT NULL,
    category ENUM('accommodation', 'transport', 'food', 'activity', 'visa', 'shopping', 'misc') NOT NULL,
    budgeted_amount DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    spent_amount DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE,
    UNIQUE KEY uq_trip_budget_category (trip_id, category)
);

-- =============================================
-- 9. EXPENSES
-- =============================================
CREATE TABLE expenses (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    trip_id CHAR(36) NOT NULL,
    invoice_item_id CHAR(36) NULL,
    trip_activity_id CHAR(36) NULL,
    category ENUM('accommodation', 'transport', 'food', 'activity', 'visa', 'shopping', 'misc') NOT NULL,
    description VARCHAR(255),
    amount DECIMAL(10,2) NOT NULL,
    expense_date DATE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE,
    FOREIGN KEY (invoice_item_id) REFERENCES invoice_items(id) ON DELETE SET NULL,
    FOREIGN KEY (trip_activity_id) REFERENCES trip_activities(id) ON DELETE SET NULL
);

CREATE INDEX idx_expenses_trip ON expenses(trip_id);

-- =============================================
-- 10. PACKING ITEMS
-- =============================================
CREATE TABLE packing_items (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    trip_id CHAR(36) NOT NULL,
    item_name VARCHAR(255) NOT NULL,
    category ENUM('clothing', 'documents', 'electronics', 'toiletries', 'misc') DEFAULT 'misc',
    is_packed BOOLEAN DEFAULT FALSE,
    quantity INT DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE
);

CREATE INDEX idx_packing_trip ON packing_items(trip_id);

-- =============================================
-- 11. TRIP NOTES
-- =============================================
CREATE TABLE trip_notes (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    trip_id CHAR(36) NOT NULL,
    trip_stop_id CHAR(36) NULL,
    title VARCHAR(200),
    content TEXT NOT NULL,
    category VARCHAR(100),
    is_pinned BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE,
    FOREIGN KEY (trip_stop_id) REFERENCES trip_stops(id) ON DELETE SET NULL
);

CREATE INDEX idx_trip_notes_trip ON trip_notes(trip_id);
CREATE INDEX idx_trip_notes_category ON trip_notes(category);

-- =============================================
-- 12. TRIP SHARES
-- =============================================
CREATE TABLE trip_shares (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    trip_id CHAR(36) NOT NULL,
    share_type ENUM('public', 'private_link') DEFAULT 'public',
    expires_at DATETIME NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE
);

CREATE INDEX idx_trip_shares_trip ON trip_shares(trip_id);

-- =============================================
-- 13. OPTIONAL SOCIAL / REVIEWS SUPPORT
-- =============================================
CREATE TABLE place_reviews (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    catalog_item_id CHAR(36) NOT NULL,
    user_id CHAR(36) NULL,
    rating DECIMAL(3,2) NOT NULL,
    review_text TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (catalog_item_id) REFERENCES catalog_items(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE INDEX idx_place_reviews_catalog ON place_reviews(catalog_item_id);
