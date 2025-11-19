import React, { useState, useMemo } from 'react'
import Navbar from '../component/navbar'
import { useAuthStore } from '../store/userAuthStore'

const product = () => {
  const {productData} =  useAuthStore()
  const [searchQuery, setSearchQuery] = useState('')

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return productData // Return all products if search is empty
    }

    const query = searchQuery.toLowerCase().trim()
    return productData.filter((item) => {
      // Search in product name, location, and model
      return (
        item.productName?.toLowerCase().includes(query) ||
        item.productLocation?.toLowerCase().includes(query) ||
        item.productModel?.toLowerCase().includes(query)
      )
    })
  }, [productData, searchQuery])

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  return (
    <div>
      <Navbar/>
        {/* Search */}
        <div className="mt-8 flex justify-center">
            <input
              type="text"
              placeholder="Search equipment (tractor, rotavator, etc.)"
              className="w-full max-w-xl px-4 py-3 rounded-l-lg shadow-md text-gray-800 outline-none"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button 
              className="px-6 py-3 bg-yellow-400 font-semibold text-gray-900 rounded-r-lg hover:bg-yellow-300 transition"
              onClick={() => setSearchQuery('')}
            >
              Clear
            </button>
          </div>

      <section className="max-w-6xl mx-auto py-12 px-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Available Equipment {searchQuery && `(${filteredProducts.length} found)`}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
            <div key={item._id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden">
              <img
                src={item.productImage}
                className="h-40 w-full object-cover"
                alt=""
              />

              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800">{item.productName}</h3>
                <p className="text-sm text-gray-600 mt-1">{`Available in ${item.productLocation}`}</p>
                <p className="text-sm text-gray-600 mt-1">{`Model ${item.productModel}`}</p>
                <p className="text-sm text-gray-600 mt-1">{`Owner-Number ${item.ownerNumber}`}</p>

                <p className="text-green-600 font-bold text-lg mt-3">{`₹${item.productRent} / day`}</p>

                <button className="mt-4 w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                  View Details
                </button>
              </div>
            </div>
          ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600 text-lg">No equipment found matching "{searchQuery}"</p>
              <p className="text-gray-500 text-sm mt-2">Try searching for different keywords</p>
            </div>
          )}

        </div>
      </section>
    </div>
  )
}

export default product
