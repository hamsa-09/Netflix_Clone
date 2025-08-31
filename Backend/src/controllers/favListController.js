import User from "../models/User.js";

export const getFavourites=async(req,res,next)=>{
    try{
        const user=await User.findById(req.user.id);
        if(!user){
            res.status(404);
            return next(new Error("User Not Found"));
        }
        return res.json(user.favMovies);
    }
    catch(err){
        next(err);
    }
}
//  add favorites
export const addFavourite=async(req,res,next)=>{
    try{
        const {movieId}=req.body;
        if(!movieId){
             res.status(400);
            return next(new Error("Movie Id is required"));
        }
        const user =await User.findById(req.user.id);
        if(!user){
            res.status(404);
         return next(new Error("User not found"));
        }
        // Ensure movieId in string
        const movieIdStr=String(movieId);
        // check already movie is in favourites array
             if(user.favMovies.map(String).includes(movieIdStr)){
                return next(new Error("Movie already in favorites"))
             }
        user.favMovies.push(movieId);
        await user.save();
         res.status(201).json(user.favMovies);
    }
    catch(err){
         next(err);
    }
}
// remove movie from favourites
export const removeFavourite = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(404);
      return next(new Error("User not found"));
    }

    user.favMovies = user.favMovies.filter((id) => id !== movieId);
    await user.save();

    res.json(user.favMovies);
  } catch (err) {
    next(err);
  }
};
