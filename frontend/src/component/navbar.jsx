import react from 'react'
import { Link } from 'react-router-dom'
import { LogOut } from 'lucide-react';
import { useAuthStore } from '../store/userAuthStore';


const navbar =()=>{
     const {Logout} = useAuthStore()

     const btnSubmit =()=>{
      console.log("click")
      Logout()
     }
     
    return (
        <div className="">
          <div className=" h-20 w-[100vw] bg-black text-white flex justify-between items-center px-24 ">

            <div className="">FarmEquip</div>
     
             <div className=" flex space-x-9 items-center ">
                <div className=""><Link to="/" >Home</Link></div>
              <div className=""><Link to='/product'>Product</Link></div>  

              <div className=" bg-red-700 px-2 rounded-lg py-1 w-[7vw] flex">
                <button
                onClick={btnSubmit}
                className='flex items-center pl-2'>LogOut  <span className='px-3'><LogOut size={17}/></span></button>
              </div>

 
             </div>
          </div>
        </div>
    )
}

export default navbar
