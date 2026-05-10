import sequelize from '../config/database.js';
import { User, City, Activity } from '../models/index.js';
import { ActivityType } from '../models/Activity.js';

const seedDatabase = async () => {
  try {
    // Sync database
    await sequelize.sync({ force: true });
    console.log('Database synchronized');

    // Seed Cities
    const cities = await City.bulkCreate([
      {
        name: 'Paris',
        country: 'France',
        region: 'Île-de-France',
        costIndex: 1.2,
        popularity: 100,
        description: 'The City of Light - known for its art, fashion, and culture',
        latitude: 48.8566,
        longitude: 2.3522,
      },
      {
        name: 'Barcelona',
        country: 'Spain',
        region: 'Catalonia',
        costIndex: 0.9,
        popularity: 95,
        description: 'Vibrant Mediterranean city known for Gaudí architecture',
        latitude: 41.3851,
        longitude: 2.1734,
      },
      {
        name: 'Tokyo',
        country: 'Japan',
        region: 'Kanto',
        costIndex: 1.3,
        popularity: 90,
        description: 'Bustling metropolis blending tradition and modernity',
        latitude: 35.6762,
        longitude: 139.6503,
      },
      {
        name: 'New York',
        country: 'USA',
        region: 'New York',
        costIndex: 1.5,
        popularity: 98,
        description: 'The city that never sleeps - iconic landmarks and culture',
        latitude: 40.7128,
        longitude: -74.006,
      },
      {
        name: 'Dubai',
        country: 'UAE',
        region: 'Dubai',
        costIndex: 1.1,
        popularity: 85,
        description: 'Luxury desert destination with modern architecture',
        latitude: 25.2048,
        longitude: 55.2708,
      },
      {
        name: 'Bangkok',
        country: 'Thailand',
        region: 'Bangkok',
        costIndex: 0.5,
        popularity: 80,
        description: 'Exotic Southeast Asian city with temples and street food',
        latitude: 13.7563,
        longitude: 100.5018,
      },
    ]);

    console.log('Cities seeded successfully');

    // Seed Activities for each city
    const activities = await Activity.bulkCreate([
      // Paris Activities
      {
        cityId: cities[0].id,
        name: 'Eiffel Tower Visit',
        description: 'Iconic iron monument with panoramic views',
        type: ActivityType.SIGHTSEEING,
        cost: 50,
        duration: 3,
        rating: 4.9,
      },
      {
        cityId: cities[0].id,
        name: 'Louvre Museum',
        description: 'World\'s largest art museum',
        type: ActivityType.CULTURE,
        cost: 25,
        duration: 4,
        rating: 4.8,
      },
      {
        cityId: cities[0].id,
        name: 'Seine River Cruise',
        description: 'Romantic river cruise through Paris',
        type: ActivityType.SIGHTSEEING,
        cost: 20,
        duration: 2,
        rating: 4.7,
      },

      // Barcelona Activities
      {
        cityId: cities[1].id,
        name: 'Sagrada Familia',
        description: 'Gaudí\'s masterpiece basilica',
        type: ActivityType.CULTURE,
        cost: 30,
        duration: 2.5,
        rating: 4.9,
      },
      {
        cityId: cities[1].id,
        name: 'Park Güell',
        description: 'Colorful terraced park with city views',
        type: ActivityType.SIGHTSEEING,
        cost: 20,
        duration: 2,
        rating: 4.8,
      },
      {
        cityId: cities[1].id,
        name: 'Gothic Quarter Walk',
        description: 'Medieval architecture and historic streets',
        type: ActivityType.SIGHTSEEING,
        cost: 0,
        duration: 2,
        rating: 4.6,
      },

      // Tokyo Activities
      {
        cityId: cities[2].id,
        name: 'Senso-ji Temple',
        description: 'Ancient Buddhist temple in Asakusa',
        type: ActivityType.CULTURE,
        cost: 5,
        duration: 1.5,
        rating: 4.7,
      },
      {
        cityId: cities[2].id,
        name: 'Shibuya Crossing',
        description: 'World\'s busiest pedestrian crossing',
        type: ActivityType.SIGHTSEEING,
        cost: 0,
        duration: 1,
        rating: 4.6,
      },
      {
        cityId: cities[2].id,
        name: 'Sumo Wrestling Show',
        description: 'Traditional Japanese sumo wrestling match',
        type: ActivityType.CULTURE,
        cost: 80,
        duration: 3,
        rating: 4.8,
      },

      // New York Activities
      {
        cityId: cities[3].id,
        name: 'Statue of Liberty',
        description: 'Iconic American monument with ferry trip',
        type: ActivityType.SIGHTSEEING,
        cost: 30,
        duration: 3,
        rating: 4.7,
      },
      {
        cityId: cities[3].id,
        name: 'Broadway Show',
        description: 'World-class theatrical performance',
        type: ActivityType.CULTURE,
        cost: 150,
        duration: 3,
        rating: 4.9,
      },
      {
        cityId: cities[3].id,
        name: 'Central Park Picnic',
        description: 'Relaxation in the heart of Manhattan',
        type: ActivityType.SIGHTSEEING,
        cost: 0,
        duration: 2,
        rating: 4.6,
      },

      // Dubai Activities
      {
        cityId: cities[4].id,
        name: 'Burj Khalifa',
        description: 'World\'s tallest building with observation deck',
        type: ActivityType.SIGHTSEEING,
        cost: 100,
        duration: 2,
        rating: 4.8,
      },
      {
        cityId: cities[4].id,
        name: 'Desert Safari',
        description: 'Dune bashing and sunset experience',
        type: ActivityType.ADVENTURE,
        cost: 60,
        duration: 4,
        rating: 4.7,
      },
      {
        cityId: cities[4].id,
        name: 'Shopping at Dubai Mall',
        description: 'Luxury shopping experience',
        type: ActivityType.SHOPPING,
        cost: 50,
        duration: 3,
        rating: 4.5,
      },

      // Bangkok Activities
      {
        cityId: cities[5].id,
        name: 'Wat Pho Temple',
        description: 'Temple of the Reclining Buddha',
        type: ActivityType.CULTURE,
        cost: 3,
        duration: 1.5,
        rating: 4.8,
      },
      {
        cityId: cities[5].id,
        name: 'Floating Markets',
        description: 'Traditional boat markets',
        type: ActivityType.SIGHTSEEING,
        cost: 15,
        duration: 2,
        rating: 4.6,
      },
      {
        cityId: cities[5].id,
        name: 'Thai Cooking Class',
        description: 'Learn authentic Thai cuisine',
        type: ActivityType.FOOD,
        cost: 40,
        duration: 3,
        rating: 4.9,
      },
    ]);

    console.log('Activities seeded successfully');

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
