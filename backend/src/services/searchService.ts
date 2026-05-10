import { City, Activity } from '../models/index.js';
import { Op } from 'sequelize';

export const searchService = {
  async searchCities(query: string, filters?: { country?: string; region?: string }) {
    const where: any = {
      [Op.or]: [
        { name: { [Op.iLike]: `%${query}%` } },
        { country: { [Op.iLike]: `%${query}%` } },
      ],
    };

    if (filters?.country) {
      where.country = { [Op.iLike]: `%${filters.country}%` };
    }

    if (filters?.region) {
      where.region = { [Op.iLike]: `%${filters.region}%` };
    }

    return City.findAll({
      where,
      limit: 50,
      order: [['popularity', 'DESC']],
    });
  },

  async getCityDetails(cityId: string) {
    return City.findByPk(cityId, {
      include: [
        {
          model: Activity,
          attributes: ['id', 'name', 'type', 'cost', 'rating', 'imageUrl'],
        },
      ],
    });
  },

  async searchActivities(
    cityId: string,
    filters?: {
      type?: string;
      maxCost?: number;
      minRating?: number;
    }
  ) {
    const where: any = { cityId };

    if (filters?.type) {
      where.type = filters.type;
    }

    if (filters?.maxCost) {
      where.cost = { [Op.lte]: filters.maxCost };
    }

    if (filters?.minRating) {
      where.rating = { [Op.gte]: filters.minRating };
    }

    return Activity.findAll({
      where,
      order: [['rating', 'DESC']],
    });
  },

  async getPopularCities() {
    return City.findAll({
      limit: 10,
      order: [['popularity', 'DESC']],
    });
  },
};
