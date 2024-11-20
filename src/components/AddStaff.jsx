import React, { useState } from 'react'
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import { MdCancel } from "react-icons/md";

function AddStaff({onClose, callUsers}) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
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
        if (!formData.name || !formData.password||!formData.email) {
            toast.error("Staff name,email and password are required!");
            return;
        }

        setLoading(true);

        try {

            const dataResponse = await fetch(SummaryApi.addStaff.url,{
                method: SummaryApi.addStaff.method,
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
            toast.error("Failed to add staff. Please try again later.");
        } finally {
            setLoading(false);
        }
    }
    //console.log(formData)
  return (
    <div className='bg-red-400 fixed w-full h-full left-0 top-0 flex justify-center items-center'>
        <div className='bg-white w-full max-w-[400px] h-auto p-2 rounded shadow-sm '>
        <div className='flex justify-between items-center mb-4 '>
            <h2 className='font-bold text-2xl '>Add Staff</h2>
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
                    <label>Password</label>
                    <input
                        className='border rounded w-full'
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
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
                    {loading ? "Adding..." : "Add Staff"}
                </button>
            </form>
        </div>
    </div>
  )
}

export default AddStaff