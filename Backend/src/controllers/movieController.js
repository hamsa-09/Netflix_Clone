import axios from "axios"
import { env } from "../config/env.js"

// Base URL for TMDB
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
// get top movies
export const getTopMoviesOfTheWeek= async(req,res,next)=>{
    try{
        const { page = 1 } = req.query;
        const count=10;
        const paging=Math.ceil((page*count)/20);
        const response=await axios.get(
            `${TMDB_BASE_URL}/trending/movie/week`,
            {
                params:{api_key:env.TMDB_API_KEY,page:paging},
            }
        )
        const startIndex=((page-1)*count)%20;
        const slicedResult=response.data.results.slice(startIndex,startIndex+count);
     res.json({
      page,
      total_pages: Math.ceil(response.data.total_results/count),
      total_results: response.data.total_results,
      results: slicedResult,
    });
    }
    catch(err){
        next(err);
    }
}
// get recommended movies
export const getRecommendedMovies = async (req, res, next) => {
  try {
    const { page = 1 } = req.query;
    const { movieId } = req.params;
    const response = await axios.get(
      `${TMDB_BASE_URL}/movie/${movieId}/recommendations`,
      {
        params: { api_key: env.TMDB_API_KEY,page},
      }
    );
      res.json({
      page: response.data.page,
      total_pages: response.data.total_pages,
      total_results: response.data.total_results,
      results: response.data.results,
    });
  } catch (error) {
    next(error);
  }
};

// get top rated
export const getTopRatedMovies=async(req,res,next)=>{
    try{
        const { page = 1 } = req.query;

        const response=await axios.get(
            `${TMDB_BASE_URL}/movie/top_rated`,
            {params:{api_key:env.TMDB_AMPI_KEY,page}}
        )
     res.json({
      page: response.data.page,
      total_pages: response.data.total_pages,
      total_results: response.data.total_results,
      results: response.data.results,
    });
  } catch (error) {
    next(error);
  }
};
