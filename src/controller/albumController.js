import { Album } from "../models/albumModel.js"

//getAllAlbums is a function that returns all the albums
export const getAllAlbums = async (req, res, next) => {
    try {
        //find all the albums
        const albums = await Album.find();
        res.status(200).json(albums);
    } catch (error) {
        next(error);    
    }
}

//getAllAlbumById is a function that returns a specific album
export const getAllAlbumById = async (req, res, next) => {
    try {
        //get the id of the album from the request
        const {albumId} = req.params;

        //find the album by album id and populate the songs
        //populate is used to get the songs of the album from the array of song ids
        const album = await Album.findById(albumId).populate("songs");

        //if album is not found
        if(!album) {
            return res.status(404).json({message: "Album not found"});
        }

        //return the album
        res.status(200).json(album);
    } catch (error) {
        next(error);
    }
}