import express from 'express';
import searchController from '../controllers/searchController.js';

const searchRoutes = express.Router();

searchRoutes.get('/', searchController);

export default searchRoutes;