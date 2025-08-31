import express from 'express';
import { getTopMoviesOfTheWeek, getRecommendedMovies, getTopRatedMovies,} from '../controllers/movieController.js';
import { getFavourites,addFavourite,removeFavourite } from '../controllers/favListController.js';
import authMiddleware from '../middleware/authmiddleware.js';
const router = express.Router();

router.get('/top-week', getTopMoviesOfTheWeek);
router.get('/recommended/:movieId', authMiddleware, getRecommendedMovies);
router.get('/top-rated', authMiddleware, getTopRatedMovies);

// ------------------------------------------
// favRoutes
router.post("/favmovie",authMiddleware,addFavourite);
router.get("/favmovie",authMiddleware,getFavourites);
router.delete("/favmovie/:movieId",authMiddleware,removeFavourite);
export default router;
