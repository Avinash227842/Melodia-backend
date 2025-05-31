import mongoose from "mongoose";

// Define the user schema it means how the data will look like
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    imageUrl:{
        type: String,
        required: true
    },
    // clerkId is the id of the user in clerk(authentication service)
    clerkId:{
        type: String,
        required: true,
        unique: true
    },
}, {timestamps: true})
//timestamps: true will automatically add createdAt and updatedAt fields to the model

// Export the user model
export const User = mongoose.model("User", userSchema);
