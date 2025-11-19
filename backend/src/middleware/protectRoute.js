import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

export const protectRoute = async(req,res,next)=>{

    try {
        const token = req.cookies.jwt
        if(!token){
            return res.status(400).json({message:"Unauthorized - No token privided"})
        }

         const decode = jwt.verify(token, process.env.JWT_SECRET)
         if(!decode){
            return res.status(400).json({message:"Token not verified"})
         }
         
          const user = await User.findById(decode.userId).select("-password")
          if(!user){
            return res.status(400).json({message:"User not found "})
          }

          req.user = user ;
           
         
          next()

    } catch (error) {
        console.log("Error in protectRoute middleware",error.message)
     res.status(500).json({message:"Internal Server Error"})
    }
}