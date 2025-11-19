import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../config/utility.js"
import cloudinary from "../config/cloudinary.js"


export const login = async(req,res)=>{


   try {
      
  
 const {email , password} = req.body

 const user = await User.findOne({email})

 if(!user){
   return res.status(400).json({message:"User doesnt Existed"})
 }

    const verifyPassword = await bcrypt.compare(password, user.password)

    if (!verifyPassword) {
       return res.status(400).json({
       
        message:"Password not matched"})
   }
   generateToken(user._id ,res)
  return res.status(200).json({
    message:"Login succesfull "})
   } catch (error) {
    console.log(error.message)
    return res.status(5000).json({message:error.message})
   }
}

export const signup = async(req,res)=>{


   try {

    const {email, password , username}=req.body;

    if( !email || !password || !username){
      return res.status(400).json({message:"All fields are required"})
    }
    const user = await User.findOne({email});

    if(user){
      return res.status(400).json({message:"User already existed"})
    }
    if(password.length < 6){
      return res.status(400).json({message:"Password length is less then 6"})
   
   
   }
    const salt = await bcrypt.genSalt(10)
    const hashpassword = await bcrypt.hash(password , salt);

    const newuser = new User({
      username,
      email,
      password:hashpassword,
     
    })

  const response= await newuser.save()

   generateToken(newuser._id,res)
   return res.status(201).json({userId:response._id , message:"User created"})

 

} catch (error) {
   console.log(error.message)
      res.status(500).json({message:"Internal Server Error"})
}
}
 

export const logout = async(req,res)=>{


  try {
    
    res.cookie("jwt", "" , {maxAge:0});
    res.status(200).json({Message:"Logout Succesfull"})

  } catch (error) {
    console.log(error.message)
     res.status(500).json({message:"Internal Server Error"})
  }
}

export const updateProfilePic = async(req,res)=>{


  try {
 

    const {profilePic} = req.body

    if(!profilePic){
      return res.status(400).json({message:"Profilepic is not provided"})
    } 
    
    const response = await cloudinary.uploader.upload(profilePic)

    const updateres = await User.findByIdAndUpdate(req.user._id,{profilePic:response.secure_url},{new:true});


    res.status(200).json({message:"user updated"})

  } catch (error) {
    
    console.log("error in profilrpic", error.message)
    res.status(500).json({message:"Internal server error  "})
  }  

}

export const userCheck  = async(req,res)=>{
  try {
       res.status(200).json({message:"User is Authenticated"})
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message:"Internal server error"})
  }
}