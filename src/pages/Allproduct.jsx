import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import AddProduct from '../components/AddProduct';
import EditProduct from '../components/EditProduct';
import { MdDelete } from "react-icons/md";
import DeleteProduct from '../components/DeleteProduct';

export default function AllProduct() {
    const [allProduct, setAllProduct] = useState([]);
    const [openUpload, setOpenUpload] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [editProductData, setEditProductData] = useState(null); // Track data for the product to edit

    const fetchAllProduct = async () => {
        const dataResponse = await fetch(SummaryApi.allProduct.url, {
            method: SummaryApi.allProduct.method,
            credentials: 'include'
        });

        const dataApi = await dataResponse.json();

        if (dataApi.success) {
            setAllProduct(dataApi.data);
        }
        if (dataApi.error) {
            toast.error(dataApi.error);
        }
    };

    useEffect(() => {
        fetchAllProduct();
    }, []);

    // Edit product
    const handleEditClick = (product) => {
        setEditProductData(product);
        setOpenEdit(true);
    };

    // Delete product
    const [deleteProduct, setDeleteProduct] = useState(null);
    const handleDeleteClick = (product) => {
        setDeleteProduct(product);
    };
    const handleCancelDelete = () => {
        setDeleteProduct(null);
    };

    return (
        <div className='p-4 overflow-hidden'>
            <div className='flex justify-between items-center bg-gray-200 p-4 rounded mb-4'>
                <h2 className='text-lg font-semibold'>All Products</h2>
                <button 
                    className='bg-red-500 text-white rounded-full px-4 py-2 hover:bg-red-700'
                    onClick={() => setOpenUpload(!openUpload)}
                >
                    Upload Product
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className='min-w-full border border-gray-300'>
                    <thead className='bg-gray-100'>
                        <tr>
                            <th className='px-4 py-2 border'>Si</th>
                            <th className='px-4 py-2 border'>Id</th>
                            <th className='px-4 py-2 border'>Name</th>
                            <th className='px-4 py-2 border'>Price</th>
                            <th className='px-4 py-2 border'>Category</th>
                            <th className='px-4 py-2 border'>Stock</th>
                            <th className='px-4 py-2 border'>Created Date</th>
                            <th className='px-4 py-2 border'>Edit</th>
                            <th className='px-4 py-2 border'>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allProduct.map((product, index) => (
                            <tr key={index} className='hover:bg-gray-50'>
                                <td className='px-4 py-2 border text-center'>{index + 1}</td>
                                <td className='px-4 py-2 border'>{product._id}</td>
                                <td className='px-4 py-2 border'>{product?.name}</td>
                                <td className='px-4 py-2 border'>${product?.price}</td>
                                <td className='px-4 py-2 border'>{product?.category}</td>
                                <td className='px-4 py-2 border text-center'>{product.stock}</td>
                                <td className='px-4 py-2 border'>{new Date(product.createdAt).toLocaleDateString()}</td>
                                <td className='px-4 py-2 border text-center'>
                                    <button 
                                        className='bg-green-100 text-green-800 p-2 rounded-full hover:bg-green-400'
                                        onClick={() => handleEditClick(product)}
                                    >
                                        <FaEdit />
                                    </button>
                                </td>
                                <td className='px-4 py-2 border text-center'>
                                    <button 
                                        className='bg-red-500 text-white p-2 rounded-full hover:bg-red-700'
                                        onClick={() => handleDeleteClick(product)}
                                    >
                                        <MdDelete />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {openUpload && (
                <AddProduct onClose={setOpenUpload} callProduct={fetchAllProduct} />
            )}
            {openEdit && editProductData && (
                <EditProduct onClose={setOpenEdit} initialData={editProductData} callProduct={fetchAllProduct} />
            )}
            {deleteProduct && (
                <DeleteProduct productId={deleteProduct} callProduct={fetchAllProduct} onCancelDelete={handleCancelDelete} />
            )}
        </div>
    );
}
