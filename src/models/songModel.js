import mongoose from "mongoose";

// Define the song schema it means how the data will look like
const songSchema = new mongoose.Schema({
    title: {type: String,required: true},
    artist: {type: String,required: true},
    imageUrl: {type: String,required: true},
    audioUrl: {type: String,required: true},
    duration:{type: Number,required: true},
    
    // albumId is the id of the album to which the song belongs here we are referencing the album model and it is optional
    albumId: {type: mongoose.Schema.Types.ObjectId,ref: "Album",required: false}
}, {timestamps: true})

export const Song = mongoose.model("Song", songSchema);