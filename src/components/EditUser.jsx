import React, { useState } from 'react'
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import { MdCancel } from "react-icons/md";

function EditUser({onClose, initialData, callProduct}) {
    const [formData, setFormData] = useState(initialData);
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
        if (!formData.name || !formData.email|| !formData.password) {
            toast.error("Staff name, email,password are required!");
            return;
        }

        setLoading(true);

        try {

            const dataResponse = await fetch(SummaryApi.updateStaff.url,{
                method: SummaryApi.updateStaff.method,
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
            toast.error("Failed to update Staff. Please try again later.");
        } finally {
            setLoading(false);
        }
    }
  return (
    <div className='bg-slate-700 z-10 bg-opacity-90  fixed w-full h-full left-0 top-0 flex justify-center items-center'>
        <div className='bg-white w-full max-w-[400px] h-auto p-2 rounded shadow-sm '>
        <div className='flex justify-between items-center mb-4 '>
            <h2 className='font-bold text-2xl '>Edit Product</h2>
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
                <div>
                    <label>Email</label>
                    <input
                        className='border rounded w-full'

                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Role:</label>
                    
                    <select name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className='border rounded w-full'
                    >
                        <option value="">Select</option>
                        <option value="Admin">
                            Admin
                        </option>
                        <option value="Staff" >
                            Staff
                        </option>
                    </select>
                </div>
                
                <button type="submit" disabled={loading} className='my-2 bg-red-500 px-4 py-1 rounded w-full block items-center text-white hover:bg-red-600 transition-all ' >
                    {loading ? "Updaing..." : "Update Staff"}
                </button>
            </form>
        </div>
    </div>
  )
}

export default EditUser