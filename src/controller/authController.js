import {User} from "../models/userModel.js";
export const authCallback = async (req, res, next) => {
    try {
        const {id, firstName, lastName, imageUrl} = req.body;

        //check if user already exists in our database
        const user = await User.findOne({clerkId: id});

        if(!user){
            //if user does not exist, create a new user meaning sign up
            await User.create({
                clerkId: id,
                fullName: `${firstName || ""} ${lastName || ""}`.trim(),
                imageUrl,
            })
        }

        res.status(200).json({success: true})
    } catch (error) {
        console.log("Error in callback route:", error);
        next(error);
    }
}