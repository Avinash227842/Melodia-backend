import { clerkClient } from "@clerk/express";

//protectRoute is a middleware that checks if the user is logged in . it takes in 3 parameters req, res and next if the user is not logged in it will return a 401 status code else it will call the next middleware
export const protectRoute = async (req, res, next) => {
    if(!req.auth.userId) {
        return res.status(401).json({message: "Unauthorized - You must be logged in"});
    }

    next();
}


//requireAdmin is a middleware that checks if the user is an admin . it takes in 3 parameters req, res and next if the user is not an admin it will return a 401 status code else it will call the next middleware
export const requireAdmin = async (req, res, next) => {
    try {
        //get the current user from clerk using the req.auth.userId
        const currentUser = await clerkClient.users.getUser(req.auth.userId);
        
        //check if the current user is an admin
        const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress

        if(!isAdmin) {
            return res.status(401).json({message: "Unauthorized - You must be an admin"});
        }

        next();
    } catch (error) {
        next(error);
    }
}