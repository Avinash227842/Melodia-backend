import { Song } from "../models/songModel.js";
import { Album } from "../models/albumModel.js";
import cloudinary from "../lib/cloudinary.js";

//function to upload files to cloudinary
const uploadToCloudinary = async (file) => {
    try {
        //cloudinary.uploader.upload is a function that uploads a file to cloudinary it takes the path of the file as an argument and returns the url of the uploaded file
        const result = await cloudinary.uploader.upload(file.tempFilePath,{
            resource_type: "auto"
        });
        return result.secure_url;
    } catch (error) {
        console.log("Error uploading file to cloudinary:", error);
        throw new Error("Error uploading file to cloudinary");
    }
}

//createSong is a function that creates a new song and saves it to the database
export const createSong = async (req, res, next) => {
    try {
        //check if all the files are uploaded and if not return a 400 status code
        if(!req.files || !req.files.audioFile || !req.files.imageFile){
            return res.status(400).json({message: "Please upload all the files"});
        }

        //get the files from the request
        const {title, artist, albumId, duration}= req.body;

        //audioFile is the audio file uploaded by the user and imageFile is the image file uploaded by the user
        const audioFile = req.files.audioFile;
        const imageFile = req.files.imageFile;

        //upload the files to cloudinary before saving them to the database
        const audioUrl = await uploadToCloudinary(audioFile);
        const imageUrl = await uploadToCloudinary(imageFile);

        //create a new song object and save it to the database and if albumId is present then add the song to the album
        const song = new Song({
            title,
            artist,
            imageUrl,
            audioUrl,
            duration,
            albumId : albumId || null
        })

        //save the song
        await song.save();

        if(albumId){
            //add the song to the album and as it is an array we can use $push
            await Album.findByIdAndUpdate(albumId, {$push: {songs: song._id}});
        }

        res.status(200).json(song);
    } catch (error){
        console.log("Error in createSong route:", error);
        next(error);
    }
}

//deleteSong is a function that deletes a song
export const deleteSong = async (req, res, next) => {
    try {
        //get the id of the song from the request using params
        const { id } = req.params;

        //find the song by id
        const song = await Song.findById(id);
        
        //if song is belongs to an album
        if(song.albumId){
            //remove the song from the album by using $pull
            await Album.findByIdAndUpdate(song.albumId, {$pull: {songs: song._id}});
        }

        //delete the song from the database and send a 200 status code
        await Song.findByIdAndDelete(id);

        res.status(200).json({message: "Song deleted successfully"});
    } catch (error) {
        console.log("Error in deleteSong route:", error);
        next(error);
    }
}

//createAlbum is a function that creates a new album
export const createAlbum = async (req, res, next) => {
    try {
        //get the files from the request
        const { title, artist, releaseYear } = req.body;

        const { imageFile } = req.files;

        //imageUrl is the image file uploaded by the user 
        const imageUrl = await uploadToCloudinary(imageFile);

        //create a new album object and save it to the database
        const album = new Album({
            title,
            artist,
            imageUrl,
            releaseYear,
        });

        //save the album
        await album.save();

        res.status(200).json(album);
    } catch (error) {
        console.log("Error in createAlbum route:", error);
        next(error);
    }
}


//deleteAlbum is a function that deletes an album
export const deleteAlbum = async (req, res, next) => {
    try {
        //get the id of the album from the request
        const {id} = req.params;

        //delete all the songs that belong to the album
        await Song.deleteMany({albumId: id});

        //delete the album
        await Album.findByIdAndDelete(id);

        res.status(200).json({message: "Album deleted successfully"});
    } catch (error) {
        console.log("Error in deleteAlbum route:", error);
        next(error);
    }
}

//checkAdmin is a function that checks if the user is an admin
export const checkAdmin = async (req, res, next) => {
    res.status(200).json({admin : true});
}