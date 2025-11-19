import { Route , Routes  , Navigate } from "react-router-dom"
import { useEffect } from "react"
import Home from "./pages/home"
import Login from "./pages/login"
import Signup from "./pages/signup"
import Product from "./pages/product"
import { Loader } from "lucide-react"
import { useAuthStore } from './store/userAuthStore'   
import { Toaster } from "react-hot-toast";

function App() {
  const {checkAuth , authUser , isCheckingAuth ,getProduct}  = useAuthStore()

  useEffect(() => {
     
      checkAuth()
       getProduct()
  
  }, []) 
     
  if (isCheckingAuth && !authUser) { 
    return(
      <div className="flex items-center justify-center  h-screen">
         <Loader  className="size-10 animate-spin"/>
      </div> 
    )
  }
    

  

  return (
    
    <div className="">
              <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={authUser?<Home/> :  <Navigate to='/login' />} />,
        <Route path="/login" element={ !authUser ? <Login/> : <Navigate to='/'/>} />,
        <Route path="/signup" element={! authUser ? <Signup/> : <Navigate to='/'/> } />, 
        <Route path="/product" element={authUser?<Product/>:<Navigate to='/login'/>} />
      </Routes>
     
    </div>
  )
}
 
export default App
