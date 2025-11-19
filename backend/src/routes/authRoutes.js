import express from "express"
import {login,signup,logout, updateProfilePic , userCheck} from  "../controllers/authController.js"
import {protectRoute} from "../middleware/protectRoute.js"

const Router = express.Router()

Router.post("/login",login)
Router.post("/signup",signup)
Router.post("/logout",logout)
Router.post("/profilepic",protectRoute,updateProfilePic)
Router.get("/check",protectRoute, userCheck  )


export default Router;