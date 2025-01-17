import express from "express";
import { PORT, mongoDBCONNECTION } from "./config.js";
import mongoose from 'mongoose';
import AuthRoutes from './routes/Auth.js';
import cookieParser from "cookie-parser";
import JsonWebTokenError  from "jsonwebtoken";
import cors from 'cors';
import VenueRoutes from './routes/Venue.js';
import FavoriteRoutes from './routes/favorites.js';


const app = express();

app.use(
    cors({
        credentials: true,
        origin: ["http://localhost:3000", "http://localhost:5173"]
    })
)

mongoose 
.connect(mongoDBCONNECTION)
.then(()=> {
    app.listen(PORT, () => {
        console.log(`app running on port: ${PORT}`);
    });
    console.log("connected to db");    
})
.catch((error)=> {
    console.error("MongoDB connection error:", error);
    process.exit(1);  // Exit process with failure
});

app.use((err, req, res, next) => {
console.error(err.stack);
res.status(500).json({ message: 'Something went wrong!' });
});


app.use(express.json());

app.use(cookieParser());

app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) =>{
    console.log(req)
    return res.status(200).send("working");
});

app.use('/api/auth', AuthRoutes);
app.use('/api/venues', VenueRoutes);
app.use('/api/favorites', FavoriteRoutes);

