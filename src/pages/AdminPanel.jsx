import React, { useState }  from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { toast } from "react-toastify"; 
import SummaryApi from '../common';
export default function AdminPanel() {
    const user = useSelector(state => state?.user?.user)
    //add product
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
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
    };

  return (
    <div className='min-h-[calc(100vh-120px)] flex '>
        <aside className='bg-white min-h-full w-full max-w-60 customShadow'>
            <div className='h-32 bg-red-500 flex flex-col justify-center items-center '>
                {
                    user?.profilePic ? (
                        <img src={user?.profilePic} className='w-20 h-20 rounded-full' />
                    ) : (
                        <FaRegUserCircle />
                    )
                }
            <p className='capitalize text-lg font-semibold ' >{user?.name}</p>
            </div>
        </aside>
        <main>

            
        <div>
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Product Name</label>
                    <input
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
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Category</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Adding..." : "Add Product"}
                </button>
            </form>
        </div>
    
        </main>
    </div>
  )
}
