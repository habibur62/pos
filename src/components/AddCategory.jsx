import React, { useState } from 'react'
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import { MdCancel } from "react-icons/md";

function AddCategory({onClose, callProduct}) {
    const [formData, setFormData] = useState({
        category: "",

    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Add form validation
        if (!formData.category) {
            toast.error("Product category is required!");
            return;
        }

        setLoading(true);

        try {

            const dataResponse = await fetch(SummaryApi.createCategory.url,{
                method: SummaryApi.createCategory.method,
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
            <h2 className='font-bold text-2xl '>Add Product Category</h2>
            <MdCancel className='text-red-500 text-xl cursor-pointer ' onClick={()=>onClose()} />
        </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Category Name:</label>
                    <input
                        className='border rounded w-full'
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    />
                </div>


                
                <button type="submit" disabled={loading} className='my-2 bg-red-500 px-4 py-1 rounded w-full block items-center text-white hover:bg-red-600 transition-all ' >
                    {loading ? "Adding..." : "Add Category"}
                </button>
            </form>
        </div>
    </div>
  )
}

export default AddCategory