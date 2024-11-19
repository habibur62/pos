import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import AddProduct from '../components/AddProduct';
import EditProduct from '../components/EditProduct';
import { MdDelete } from "react-icons/md";
import DeleteProduct from '../components/DeleteProduct';

export default function AllOrder() {
    const [allOrders, setAllOrders] = useState([]);
    const [openUpload, setOpenUpload] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [editProductData, setEditProductData] = useState(null); // Track data for the product to edit

    const fetchAllOrders = async () => {
        const dataResponse = await fetch(SummaryApi.allOrders.url, {
            method: SummaryApi.allOrders.method,
            credentials: 'include'
        });

        const dataApi = await dataResponse.json();

        if (dataApi.success) {
            setAllOrders(dataApi.data);
        }
        if (dataApi.error) {
            toast.error(dataApi.error);
        }
    };

    useEffect(() => {
        fetchAllOrders();
    }, []);


    return (
        <div className='p-4 overflow-hidden'>
            <div className='flex justify-between items-center bg-gray-200 p-4 rounded mb-4'>
                <h2 className='text-lg font-semibold'>All Orders</h2>
    
            </div>
            <div className="overflow-x-auto">
                <table className='min-w-full border border-gray-300'>
                    <thead className='bg-gray-100'>
                        <tr>
                            <th className='px-4 py-2 border'>Si</th>
                            <th className='px-4 py-2 border'>Id</th>
                            <th className='px-4 py-2 border'>Customer Name</th>
                            <th className='px-4 py-2 border'>Customer Phone</th>                  
                            <th className='px-4 py-2 border'>Product Details</th>
                            <th className='px-4 py-2 border'>Created Date</th>
                            <th className='px-4 py-2 border'>Report</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allOrders.map((product, index) => (
                            
                            <tr key={index} className='hover:bg-gray-50'>
                                <td className='px-4 py-2 border text-center'>{index + 1}</td>
                                <td className='px-4 py-2 border'>{product._id}</td>
                                <td className='px-4 py-2 border'>{product?.name}</td>
                                <td className='px-4 py-2 border'>{product?.phone}</td>
                                <td className='px-4 py-2 border'>
                                
                                    {product?.items?.map((item, index)=>(
                                        <ul className="list-disc ml-6" key={index}>
                                        <li >
                                            {item.productId} - Quantity: {item.quantity} - Price: {item.productPrice}
                                        </li>
                                        </ul>
                                    ))
                                    
                                    }
                                </td>

                                <td className='px-4 py-2 border'>{new Date(product.createdAt).toLocaleDateString()}</td>
                                <td className='px-4 py-2 border text-center'>
                                    <button 
                                        className='bg-red-500 text-white p-2 rounded-full hover:bg-red-700'
                                        
                                    >
                                        Print
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
