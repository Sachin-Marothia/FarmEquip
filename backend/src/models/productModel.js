import mongoose from "mongoose"


const productSchema  = new mongoose.Schema({

    productName:{
        type:String,
        required:true
    },
    productRent:{
        type:String,
        required:true

    },
    productImage:{
        type:String
    },
    productModel:{
        type:String

    },
    ownerNumber:{
        type:String,
        required:true
    },
    productLocation:{
        type:String,
        required:true
    }

},{timestamps:true})


const Product = mongoose.model("product", productSchema)

export default Product
