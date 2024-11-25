import React, { useState } from 'react'
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import { MdCancel } from "react-icons/md";
import { useSelector } from 'react-redux';

function AddCategory({onClose, callUsers}) {
    const user = useSelector((state) => state?.user?.user);

    var restuId = "";
    if(user?.restaurantId){
        restuId = user?.restaurantId;
   }else{
        restuId = user?._id
   }

    const [formData, setFormData] = useState({
        name: "",
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
        if (!formData.name) {
            toast.error("Category name is required!");
            return;
        }

        setLoading(true);

        try {

            const dataResponse = await fetch(SummaryApi.addCategory.url,{
                method: SummaryApi.addCategory.method,
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
            callUsers()
          }
          if(dataApi.error){
            toast.error(dataApi.message)
          }
            
        } catch (error) {
            console.error(error);
            toast.error("Failed to add category. Please try again later.");
        } finally {
            setLoading(false);
        }
    }
    //console.log(formData)
  return (
    <div className='bg-red-400 fixed w-full h-full left-0 top-0 flex justify-center items-center'>
        <div className='bg-white w-full max-w-[400px] h-auto p-2 rounded shadow-sm '>
        <div className='flex justify-between items-center mb-4 '>
            <h2 className='font-bold text-2xl '>Add Category</h2>
            <MdCancel className='text-red-500 text-xl cursor-pointer ' onClick={()=>onClose()} />
        </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        className='border rounded w-full'
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>


                
                <button type="submit" disabled={loading} className='my-2 bg-red-500 px-4 py-1 rounded w-full block items-center text-white hover:bg-red-600 transition-all ' >
                    {loading ? "Adding..." : "Add"}
                </button>
            </form>
        </div>
    </div>
  )
}

export default AddCategory