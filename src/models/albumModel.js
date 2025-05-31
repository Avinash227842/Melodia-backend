import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
    title: {type: String,required: true},
    artist: {type: String,required: true},
    imageUrl: {type: String,required: true},
    releaseYear: {type: Number,required: true},
    // songs is an array of song ids here we are referencing the song model which gives us an array of song objects
    songs: [
        {type: mongoose.Schema.Types.ObjectId,ref: "Song"}
    ]
}, {timestamps: true})

export const Album = mongoose.model("Album", albumSchema);