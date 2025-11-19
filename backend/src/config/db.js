import mongoose from "mongoose"


const connectDB = async ()=>{

    try {
    
        const connection = await  mongoose.connect(process.env.mongoDB_URI);
        if (connection) {
            
            console.log("Database Connected")
        } 
    } catch (error) {
         console.log("connection error",error)
    }
}

export default connectDB;