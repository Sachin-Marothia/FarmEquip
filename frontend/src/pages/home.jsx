import React from 'react'
import { useState } from 'react';
import Navbar from '../component/navbar'
import { useAuthStore } from '../store/userAuthStore';
import toast from 'react-hot-toast';

const home = () => {
  
  const {addProduct , productData ,getProduct}= useAuthStore()

  const [selectedImg, setSelectedImg] = useState(null);
  const [click , setclick ]= useState(false)
  const [formData , setformData]=useState({
    productName:"",
    productRent:"",
    productImage:"",
    productModel:"",
    productLocation:"",
    ownerNumber:""
  })
  
  const formChange=(e)=>{
    const {name , value} = e.target
 
     setformData({
      ...formData,
      [name]:value
     })


  }
 

  const formSubmit=(e)=>{
    e.preventDefault();
   
 addProduct(formData)
 getProduct()
    btnSubmit()  
  }
const btnSubmit =(e)=>{
   if(click==false){
    setclick(true)
   }else{
    setclick(false)
   }
}


  const handleChange =(e)=>{
      const file = e.target.files[0]

      if (!file) {
        return
      }
      const maxSize = 5 * 1024 * 1024; // 2MB in bytes

      if (file.size > maxSize) {
        toast.error("Image size must be less than 5MB");
        return;
      }
    

      const reader = new FileReader()

      reader.readAsDataURL(file)
      reader.onload = async()=>{
        const base64Image = reader.result;
        setformData({
          ...formData,
          productImage:base64Image
        })
        
      }

  }
    
  return (

    <div className="min-h-screen bg-gray-50">
    <Navbar/>
      {/* Hero Section */}
      <section className="w-full bg-green-600 py-16 px-6 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Rent Farm Equipment Easily & Affordably
          </h1>
          <p className="mt-4 text-lg opacity-90">
            Find tractors, harvesters, tools, and more from nearby farmers & vendors.
          </p>

        
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-6xl mx-auto py-12 px-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Popular Categories</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: "Tractors", icon: "🚜" },
            { name: "Harvesters", icon: "🌾" },
            { name: "Rotavators", icon: "⚙️" },
            { name: "Sprayers", icon: "🧴" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white shadow-md rounded-xl py-6 flex flex-col items-center hover:shadow-lg transition cursor-pointer"
            >
              <div className="text-4xl">{item.icon}</div>
              <p className="mt-2 font-semibold text-gray-700">{item.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Equipment */}
      <section className="max-w-6xl mx-auto py-12 px-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Available Equipment</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

          {productData.map((item) => (
            <div key={item._id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden">
              <img
                src={item.productImage}
                className="h-40 w-full object-cover"
                alt=""
              />

              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800">{item.productName}</h3>
                <p className="text-sm text-gray-600 mt-1">{`Available in ${item.productLocation}`}</p>

                <p className="text-green-600 font-bold text-lg mt-3">{`₹${item.productRent} / day`}</p>

                <button className="mt-4 w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                  View Details
                </button>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* CTA */}
      <section className="bg-yellow-300 py-12 px-6 mt-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900">
            Have equipment to rent out?
          </h2>
          




        <button onClick={btnSubmit} className='cursor-pointer px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700'>List Your Equipment</button>


         { click && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
    
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Enter Details</h2>
                  <button
                    onClick={btnSubmit}
                    className="text-xl text-gray-600 hover:text-gray-800"
                  >
                    ✖
                  </button>
                </div>
    
                <form className="space-y-4">
                <div className='' >
                    <label  htmlFor='imageInput' className=" flex justify-center 
                      text-sm font-medium w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">Upload Image</label>
                    <input type='file' id='imageInput' name='productImage' onChange={handleChange} className="hidden" /> 
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Name</label>
                    <input name='productName' onChange={formChange} className="w-full border p-2 rounded-lg mt-1" />
                  </div> 
    
                  <div>
                    <label className="block text-sm font-medium">Rent Price</label>
                    <input onChange={formChange} name='productRent' className="w-full border p-2 rounded-lg mt-1" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Model</label>
                    <input onChange={formChange} name='productModel' className="w-full border p-2 rounded-lg mt-1" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Location</label>
                    <input onChange={formChange} name='productLocation' className="w-full border p-2 rounded-lg mt-1" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Owner Number</label>
                    <input onChange={formChange} name='ownerNumber' className="w-full border p-2 rounded-lg mt-1" />
                  </div>
                  

    
                  <button
                    type="button"
                    onClick={formSubmit}
                   
                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                  >
                    Submit
                  </button>
                </form>
    
              </div>
            </div>
          
         )}
        
        
        </div>
      </section>

    </div>
  )
}

export default home
