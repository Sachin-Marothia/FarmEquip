import express from "express"
import dotenv from "dotenv"
dotenv.config();
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import cookieParser from "cookie-parser";
import cors from 'cors'
import path from 'path'





const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

const __dirname = path.resolve();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true

}))

app.use(cookieParser());

app.use("/api/auth" , authRoutes )
app.use("/api/product" , productRoutes) 


if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname, "../frontend" , "dist","index.html"));
    })
}

const PORT = process.env.PORT

 
app.listen(PORT,()=>{
    connectDB() 
    console.log(`Server is runnig on port ${PORT} `)
}) 