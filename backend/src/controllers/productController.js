 import Product from "../models/productModel.js"
 import cloudinary from "../config/cloudinary.js"
 
 
 export const createProduct =async(req,res)=>{
 
  try {
    

    const {productName , productModel, productRent , ownerNumber ,productLocation ,productImage}=req.body


    if (!productName || !productModel || !productRent || !ownerNumber) {

        return res.status(400).json({message:"Please provide all fields"})
        
    } 
    const cldres = await cloudinary.uploader.upload(productImage)
  
    const response = new Product({
        productName,
        productImage:cldres.secure_url,
        productModel,
        productRent,
        ownerNumber,
        productLocation,
    })
   await response.save()
    return res.status(201).json({message:"Product listead"})
} catch (error) {
    console.log(error.message)
    res.status(500).json({message:"Internal server error"})
}
 }

 
 export const getProduct = async(req,res)=>{

    try {
        

        const response = await Product.find();
       
          if(!response){
            return res.status(404).json({message:"Product not found"})
          }
        return res.status(200).json(response)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:"Internal server error"})
    }
 }

