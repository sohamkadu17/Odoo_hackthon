import express, { Router, Response } from 'express';
import { searchService } from '../services/searchService.js';
import { tripService } from '../services/tripService.js';

const router = Router();

// City Search
router.get('/cities', async (req, res: Response) => {
  try {
    const { q, country, region } = req.query;

    if (!q) {
      res.status(400).json({ message: 'Search query is required' });
      return;
    }

    const cities = await searchService.searchCities(q as string, {
      country: country as string,
      region: region as string,
    });

    res.status(200).json({
      success: true,
      data: cities,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to search cities',
    });
  }
});

// Popular Cities
router.get('/cities/popular', async (req, res: Response) => {
  try {
    const cities = await searchService.getPopularCities();

    res.status(200).json({
      success: true,
      data: cities,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch popular cities',
    });
  }
});

// City Details
router.get('/cities/:cityId', async (req, res: Response) => {
  try {
    const city = await searchService.getCityDetails(req.params.cityId);

    if (!city) {
      res.status(404).json({ message: 'City not found' });
      return;
    }

    res.status(200).json({
      success: true,
      data: city,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch city details',
    });
  }
});

// Activity Search
router.get('/activities', async (req, res: Response) => {
  try {
    const { cityId, type, maxCost, minRating } = req.query;

    if (!cityId) {
      res.status(400).json({ message: 'City ID is required' });
      return;
    }

    const activities = await searchService.searchActivities(cityId as string, {
      type: type as string,
      maxCost: maxCost ? Number(maxCost) : undefined,
      minRating: minRating ? Number(minRating) : undefined,
    });

    res.status(200).json({
      success: true,
      data: activities,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to search activities',
    });
  }
});

// Public Trip View
router.get('/trips/public/:tripId', async (req, res: Response) => {
  try {
    const trip = await tripService.getPublicTrip(req.params.tripId);

    if (!trip) {
      res.status(404).json({ message: 'Trip not found or not public' });
      return;
    }

    res.status(200).json({
      success: true,
      data: trip,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch trip',
    });
  }
});

export default router;
