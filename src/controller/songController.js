import { Song } from "../models/songModel.js"

//getAllSongs is a function that returns all the songs
export const getAllSongs = async (req, res, next) => {
    try {
        //find all the songs using the find method and sort them by createdAt
        //-1 means sort in descending order from newest to oldest
        const songs = await Song.find().sort({createdAt: -1})
        res.json(songs);
    } catch (error) {
        next(error);
    }
}

//getFeaturedSongs is a function that returns 5 random songs
export const getFeaturedSongs = async (req, res, next) => {
    try {
        //aggregate is a mongodb pipeline that allows us to perform multiple operations on the data
        //sample is a method that returns a random sample of the data
        //project is a method that allows us to select the fields we want to return
        const songs = await Song.aggregate([
            {$sample: {size: 6}},
            {
                $project: {
                    _id: 1,
                    title: 1,
                    artist: 1,
                    imageUrl: 1,
                    audioUrl: 1
                }
            }
        ])
        res.json(songs);
    } catch (error) {
        next(error);
    }
}

//getMadeForYouSongs is a function that returns 4 random songs
export const getMadeForYouSongs = async (req, res, next) => {
    try {
        //aggregate is a mongodb pipeline that allows us to perform multiple operations on the data
        //sample is a method that returns a random sample of the data
        //project is a method that allows us to select the fields we want to return
        const songs = await Song.aggregate([
            {$sample: {size: 4}},
            {
                $project: {
                    _id: 1,
                    title: 1,
                    artist: 1,
                    imageUrl: 1,
                    audioUrl: 1
                }
            }
        ])
        res.json(songs);
    } catch (error) {
        next(error);
    }
}

//getTrendingSongs is a function that returns 4 random songs
export const getTrendingSongs = async (req, res, next) => {
    try {
        //aggregate is a mongodb pipeline that allows us to perform multiple operations on the data
        //sample is a method that returns a random sample of the data
        //project is a method that allows us to select the fields we want to return
        const songs = await Song.aggregate([
            {$sample: {size: 4}},
            {
                $project: {
                    _id: 1,
                    title: 1,
                    artist: 1,
                    imageUrl: 1,
                    audioUrl: 1
                }
            }
        ])
        res.json(songs);
    } catch (error) {
        next(error);
    }
}

//searchSongs is a function that returns songs that match the search query
export const searchSongs = async (req, res, next) => {
    //get the search query from the request
  const query = req.query.search;

  //if the search query is not provided or is not a string return an error
  if (!query || typeof query !== "string") {
    return res.status(400).json({ message: "Search query is required" });
  }

  try {
    //create a regular expression to match the search query
    const regex = new RegExp(query, "i"); // case-insensitive, partial match

    //find all the songs that match the search query using the find method we perform search using song name or artist and select the _id, title, artist, imageUrl and audioUrl
    const songs = await Song.find({
      $or: [
        { title: { $regex: regex } },
        { artist: { $regex: regex } },
      ],
    }).select("_id title artist imageUrl audioUrl duration");

    res.json(songs);
  } catch (error) {
    next(error);
  }
};