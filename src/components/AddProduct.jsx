import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import { MdCancel } from "react-icons/md";
import { useSelector } from 'react-redux';

function AddProduct({onClose, callProduct}) {
    const user = useSelector((state) => state?.user?.user);

    var restuId = "";
    if(user?.restaurantId){
        restuId = user?.restaurantId;
   }else{
        restuId = user?._id
   }
   
   // This should show a valid restaurantId if it's set
   const [allCategory, setAllCategory] = useState([])
   const fetchAllCategory =async()=>{
       const dataResponse = await fetch(SummaryApi.allCategory.url, {
           method: SummaryApi.allCategory.method,
           credentials: 'include',
           headers: {
               "content-type" : "application/json"
           },
           body: JSON.stringify({ restaurantId: restuId })
       });

       const dataApi = await dataResponse.json();

       if (dataApi.success) {
           setAllCategory(dataApi.data);
       }
       if (dataApi.error) {
           toast.error(dataApi.error);
       }
   }
   useEffect(()=>{
       fetchAllCategory()
   },[restuId])

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        category: "",
        restaurantId: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
            restaurantId: restuId
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Add form validation
        if (!formData.name || !formData.price) {
            toast.error("Product name and price are required!");
            return;
        }

        setLoading(true);

        try {

            const dataResponse = await fetch(SummaryApi.createProduct.url,{
                method: SummaryApi.createProduct.method,
                credentials: "include",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(formData)    
            })

            const dataApi = await dataResponse.json()

          if(dataApi.success){
            toast.success(dataApi.message)
            onClose()
            callProduct()
          }
          if(dataApi.error){
            toast.error(dataApi.message)
          }
            
        } catch (error) {
            console.error(error);
            toast.error("Failed to add product. Please try again later.");
        } finally {
            setLoading(false);
        }
    }

    
  return (
    <div className='bg-red-400 fixed w-full h-full left-0 top-0 flex justify-center items-center'>
        <div className='bg-white w-full max-w-[400px] h-auto p-2 rounded shadow-sm '>
        <div className='flex justify-between items-center mb-4 '>
            <h2 className='font-bold text-2xl '>Add Product</h2>
            <MdCancel className='text-red-500 text-xl cursor-pointer ' onClick={()=>onClose()} />
        </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Product Name:</label>
                    <input
                        className='border rounded w-full'
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Price</label>
                    <input
                        className='border rounded w-full'

                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Category</label>
                    <select name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className='border rounded w-full'
                    >
                        <option value="">Select</option>

                        {
                            allCategory.map((item,index)=>{
                                return (
                                    <option key={index} value={item.name}>
                                        {item.name}
                                    </option>
                                )
                            })
                        }

                    </select>
                </div>
                <div>
                    <label>Description</label>
                    <textarea
                        className='border rounded w-full'

                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
                
                <button type="submit" disabled={loading} className='my-2 bg-red-500 px-4 py-1 rounded w-full block items-center text-white hover:bg-red-600 transition-all ' >
                    {loading ? "Adding..." : "Add Product"}
                </button>
            </form>
        </div>
    </div>
  )
}

export default AddProduct