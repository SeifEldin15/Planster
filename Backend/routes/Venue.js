import express from 'express';
import { 
    getAllVenues, 
    getVenueById, 
    createVenue, 
    updateVenue, 
    deleteVenue,
    getTopRatedVenues
} from '../controllers/venueController.js';

const router = express.Router();

router.get('/top-rated', getTopRatedVenues);
router.get('/', getAllVenues);
router.get('/:id', getVenueById);
router.post('/', createVenue);
router.put('/:id', updateVenue);
router.delete('/:id', deleteVenue);

export default router;