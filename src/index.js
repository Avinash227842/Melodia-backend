import express from "express"
import dotenv from "dotenv"
import userRoutes from "./routes/userRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import songRoutes from "./routes/songRoutes.js"
import albumRoutes from "./routes/albumRoutes.js"
import statRoutes from "./routes/statRoutes.js"
import { connectDB } from "./lib/db.js"
import { clerkMiddleware } from '@clerk/express'
import fileUpload from "express-fileupload"
import path from "path"
import cors from "cors"
import { createServer } from "http"
import { initializeSocket } from "./lib/socket.js"
import cron from "node-cron"
import fs from "fs"

dotenv.config();

//__dirname is a global variable that points to the current directory and path.resolve() is a function that returns the absolute path
const __dirname = path.resolve();

//express is a function that returns a server
const app = express();

//PORT is a variable that holds the port number from env
const PORT = process.env.PORT;

//createServer is a function that returns a http server
const httpServer = createServer(app);
//initializeSocket is a function that returns a socket server here we are building a socket server on top pf our express server
initializeSocket(httpServer)

//cors is a middleware used to allow cross origin requests from the frontend
app.use(cors(
    {
        origin: "http://localhost:3000",
        credentials: true
    }
))

//it is a middleware used to parse request body
app.use(express.json());

//clerk middleware used to add authentication to the req obj => req.auth
app.use(clerkMiddleware());

//fileupload is a middleware used to upload files
//we use it to upload files to cloudinary
//useTempFiles is a boolean that tells fileupload to use temp files and tempFileDir is a string that tells fileupload where to store the temp files
// basically jb bhi file ya song upload krenge woh is tmp directory me store hoga and tb tk rhega jb tk hum cloudinary p upload ni kr denge
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "temp"),
    createParentPath: true,
    limits: {
        fieldSize: 1024 * 1024 * 40 // 40 MB
    }
}));


app.use("/api/users", userRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/songs", songRoutes)
app.use("/api/albums", albumRoutes)
app.use("/api/stats", statRoutes)

//if we are in production mode
 if (process.env.NODE_ENV === "production") {
    //express.static() ek middleware hai jo Express ko bolta hai ki ek folder ko public banado.
    // Iska matlab: us folder ke andar jo bhi files hain (HTML, CSS, JS, images), woh browser se direct access ho sakti hain bina kisi extra route ke.
	app.use(express.static(path.join(__dirname, "../frontend/dist")));
	app.get("/{*splat}", (req, res) => {
		res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
	});
} 


//cron jobs to delete temp files after every hour 

const tempDir = path.join(process.cwd(), "temp");
cron.schedule("0 * * * *", () => {
	if (fs.existsSync(tempDir)) {
		fs.readdir(tempDir, (err, files) => {
			if (err) {
				console.log("error", err);
				return;
			}
			for (const file of files) {
				fs.unlink(path.join(tempDir, file), (err) => {});
			}
		});
	}
});

//an error handler middleware
app.use((err, req, res, next) =>{
    res.status(500).json({message : process.env.NODE_ENV === "production" ? "Internal Server Error" : err.message});
})

httpServer.listen(PORT, () => {
    console.log("Server listening on port"+PORT);
    connectDB();
});

