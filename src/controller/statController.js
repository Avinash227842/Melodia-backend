import { User } from "../models/userModel.js";
import { Song } from "../models/songModel.js";
import { Album } from "../models/albumModel.js";

export const getStats = async (req, res, next) => {
    try {
        //const totalSongs = await Song.countDocuments();
        //const totalUsers = await User.countDocuments();
        //const totalAlbums = await Album.countDocuments();
        
        //an optimized code for above 3 lines
        //Promise.all is used to run all the promises in parallel
        const [totalSongs, totalUsers, totalAlbums, uniqueArtists] = await Promise.all([
            Song.countDocuments(),
            User.countDocuments(),
            Album.countDocuments(),

            //fetch kiye sare songs and albums ko unko fir combine karenge using $unionWith and then group karenge by unique artist and count karenge
            Song.aggregate([
                {
                    $unionWith:{
                        coll: "Album",
                        pipeline:[]
                    }
                },
                {
                    $group:{
                        _id:"$artist",
                    }
                },
                {
                    $count:"count"
                }
            ])
        ]);

        res.status(200).json({
            totalSongs,
            totalUsers,
            totalAlbums,
            totalArtists: uniqueArtists[0]?.count || 0
        });
    } catch (error) {
        next(error);
    }
}