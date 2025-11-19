import express from "express"
import { createProduct , getProduct } from "../controllers/productController.js"
import { protectRoute } from "../middleware/protectRoute.js"


const Router = express.Router()

Router.post('/create',protectRoute,createProduct)
Router.get('/getall',protectRoute , getProduct )


export default Router 