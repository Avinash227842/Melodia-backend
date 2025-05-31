//here we are importing cloudinary it is a library that allows us to upload files to cloudinary 
import { v2 as cloudinary } from "cloudinary";

//here we are importing dotenv it is a library that allows us to use environment variables
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export default cloudinary