import express from 'express';
import { toggleFavorite, getFavorites } from '../controllers/favoritesController.js';

const router = express.Router();

router.post('/toggle', toggleFavorite);
router.get('/', getFavorites);

export default router; 