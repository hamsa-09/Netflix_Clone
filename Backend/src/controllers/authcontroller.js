import User from '../models/User.js';
import {generateToken} from '../utils/generateToken.js';

// Register User
export const registerUser = async (req, res,next) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400);
            throw new Error('User already exists');
        }
        const user = await User.create({ name, email, password });
        const payload={
            id:user._id,
            name:user.name,
            email:user.email
        }
        generateToken(res, payload);
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
        });
    } catch (err) {
        next(err);
    }
};

// Login User
export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            res.status(401);
            throw new Error("Invalid email or password");
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            res.status(401);
            throw new Error("Invalid email or password");
        }

        const payload = {
            id: user._id,
            name: user.name,
            email: user.email
        };

        generateToken(res, payload);

        res.json({
            name: user.name,
            email: user.email,
            message:"User Logined successfully"
        });
    } catch (err) {
        next(err);
    }
};


// logout
export const logoutUser=(req,res,next)=>{
    try{
        res.cookie("jwt","",{
            httpOnly:true,
            expires:new Date(0),
        })
        return res.status(200).json({ message: "Logged out successfully" });
    }
    catch(err){
        next(err);
    }
}
