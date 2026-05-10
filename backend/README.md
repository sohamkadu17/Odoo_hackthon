# Traveloop Backend API

Personalized travel planning platform backend built with Node.js, Express, and MySQL.

## Features

- **User Authentication**: Secure signup/login with JWT tokens
- **Trip Management**: Create, edit, and organize multi-city trips
- **Itinerary Planning**: Add stops, activities, and manage daily schedules
- **Cost Tracking**: Budget management and expense breakdown
- **Search**: City and activity discovery
- **Packing Checklist**: Trip preparation tracking
- **Trip Notes**: Documentation and reminders
- **Public Sharing**: Share itineraries with others

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MySQL
- **ORM**: Sequelize
- **Authentication**: JWT
- **Password Hashing**: bcryptjs

## Installation

### Prerequisites

- Node.js (v16+)
- MySQL (v8+)
- npm or yarn

### Setup Steps

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```

4. **Configure database in `.env`**
   ```
   DB_HOST=localhost
  DB_PORT=3306
   DB_NAME=traveloop_db
  DB_USER=root
   DB_PASSWORD=your_password
   ```

5. **Run database migrations/seed**
   ```bash
   npm run seed
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

Server will run on `http://localhost:5000`

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update profile (protected)
- `DELETE /api/auth/account` - Delete account (protected)

### Trips

- `POST /api/trips` - Create trip (protected)
- `GET /api/trips` - Get all user trips (protected)
- `GET /api/trips/:tripId` - Get trip details (protected)
- `PUT /api/trips/:tripId` - Update trip (protected)
- `DELETE /api/trips/:tripId` - Delete trip (protected)

### Trip Stops

- `POST /api/trips/:tripId/stops` - Add city stop (protected)
- `DELETE /api/trips/:tripId/stops/:stopId` - Remove stop (protected)
- `POST /api/trips/:tripId/stops/reorder` - Reorder stops (protected)

### Activities

- `POST /api/trips/:tripId/stops/:stopId/activities` - Add activity (protected)
- `DELETE /api/trips/:tripId/activities/:activityId` - Remove activity (protected)

### Budget

- `GET /api/trips/:tripId/budget` - Get trip budget (protected)

### Trip Utilities

- `POST /api/trip/:tripId/packing` - Add packing item (protected)
- `GET /api/trip/:tripId/packing` - Get packing checklist (protected)
- `PUT /api/trip/:tripId/packing/:itemId` - Update item (protected)
- `DELETE /api/trip/:tripId/packing/:itemId` - Delete item (protected)
- `POST /api/trip/:tripId/notes` - Add trip note (protected)
- `GET /api/trip/:tripId/notes` - Get trip notes (protected)
- `PUT /api/trip/:tripId/notes/:noteId` - Update note (protected)
- `DELETE /api/trip/:tripId/notes/:noteId` - Delete note (protected)

### Search & Discovery

- `GET /api/cities?q=query` - Search cities
- `GET /api/cities/popular` - Get popular cities
- `GET /api/cities/:cityId` - Get city details with activities
- `GET /api/activities?cityId=id` - Search activities in city

### Public Routes

- `GET /api/trips/public/:tripId` - View public trip

## Request Examples

### Signup
```json
POST /api/auth/signup
{
  "email": "user@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe"
}
```

### Login
```json
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

### Create Trip
```json
POST /api/trips
Authorization: Bearer <token>
{
  "name": "European Adventure",
  "description": "Two weeks exploring Europe",
  "startDate": "2024-06-01",
  "endDate": "2024-06-15"
}
```

### Add Trip Stop
```json
POST /api/trips/:tripId/stops
Authorization: Bearer <token>
{
  "cityId": "city-uuid",
  "order": 1,
  "startDate": "2024-06-01",
  "endDate": "2024-06-05"
}
```

## Error Handling

All API responses follow a consistent format:

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": { ... }
}
```

## Development

### Scripts

- `npm run dev` - Start dev server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run production build
- `npm run seed` - Seed database with sample data
- `npm run lint` - Run ESLint

## Database Schema

### Users
- id (UUID, PK)
- email (unique)
- password (hashed)
- firstName, lastName
- profilePhoto (optional)
- language
- createdAt, updatedAt

### Trips
- id (UUID, PK)
- userId (FK)
- name, description
- startDate, endDate
- coverPhoto (optional)
- isPublic
- createdAt, updatedAt

### Trip Stops
- id (UUID, PK)
- tripId (FK)
- cityId (FK)
- order, startDate, endDate
- createdAt, updatedAt

### Cities
- id (UUID, PK)
- name, country, region
- costIndex, popularity
- latitude, longitude
- description, imageUrl

### Activities
- id (UUID, PK)
- cityId (FK)
- name, type, cost, duration
- rating, imageUrl
- createdAt, updatedAt

### Stop Activities
- id (UUID, PK)
- tripStopId (FK)
- activityId (FK)
- day, notes
- createdAt, updatedAt

### Packing Items
- id (UUID, PK)
- tripId (FK)
- name, category
- isPacked

### Trip Notes
- id (UUID, PK)
- tripId (FK)
- tripStopId (FK, optional)
- title, content
- createdAt, updatedAt

## Environment Variables

```
DB_HOST=localhost
DB_PORT=3306
DB_NAME=traveloop_db
DB_USER=root
DB_PASSWORD=password
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

## Deployment

1. Build the project: `npm run build`
2. Set production environment variables
3. Run migrations: `npm run seed`
4. Start server: `npm start`

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

MIT
