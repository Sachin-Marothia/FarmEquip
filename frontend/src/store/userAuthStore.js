
import {create} from "zustand"
import {axiosInstance} from "../lib/axios"

import { toast } from "react-hot-toast";
import signup from "../pages/signup";
import { data } from "react-router-dom";





export const useAuthStore = create((set,get)=>({
   
     authUser:null,
     isCheckingAuth:true,
     productData:[],


     checkAuth: async()=>{
          try {
             const res=  await axiosInstance.get('/auth/check')
              set({authUser:res.data})
            
          } catch (error) {
            console.log("Error in check auth",error)
          
            set({authUser:null})
           set({ isCheckingAuth:false})
          } finally{
            set({isCheckingAuth:false})
          }
     },

     signup:async(data)=>{
           try {
           
               const res = await axiosInstance.post("/auth/signup",data)
               
               set({authUser:res.data})
               get().getProduct()
              toast.success(res.data.message)
           } catch (error) {
               console.log("Error in signup authstorw ",error)

               toast.error(error.response.data.message)
               set({authUser:null})
           }
     },

     signin:async(data)=>{
         try {
          const res = await axiosInstance.post("/auth/login",data)
          set({authUser:res.data})
          get().getProduct()
          toast.success(res.data.message)
         } catch (error) {
          toast.error(error.response.data.message)
          set({authUser:null})
         }
     },

     Logout:async()=>{
      try {
        const res = await axiosInstance.post("/auth/logout")
        set({authUser:null})
      } catch (error) {
        console.log(error)
      }
     },
     
     addProduct:async(data)=>{
      try {
        console.log(data)
         const res = await axiosInstance.post("/product/create",data)
        toast.success(res.data.message)
      } catch (error) {
        console.log("Error in addProduct", error) 
        toast.error(error.response?.data?.message)
      }
     },

     getProduct:async()=>{
     try {
         const res = await axiosInstance.get("/product/getall")
       set({productData:res.data})
       console.log(get().productData)
     } catch (error) {
       console.log(error)
       toast.error(error?.response?.data.message)
     }
     }

}))