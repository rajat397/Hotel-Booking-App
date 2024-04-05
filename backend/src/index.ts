import express from 'express';
import cors from 'cors';
import "dotenv/config";
import userRoutes from './routes/users'
import authRoutes from './routes/auth'
import connectToMongoDB  from './connect';
import cookieParser from 'cookie-parser';
import path from "path";

connectToMongoDB();


const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
   origin:process.env.FRONTEND_URL,
   credentials:true,
}));

app.use(express.static(path.join(__dirname,"../../frontend/dist")));
app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);
    


app.listen(7000, ()=>{
   console.log("server is running on localhost:7000");
});