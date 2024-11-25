import React, { useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa';
import { MdOutlineDelete } from "react-icons/md";
import AddCategory from '../components/AddCategory';
import { useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import DeleteCategory from '../components/DeleteCategory';

function AllCategory() {
    const user = useSelector((state) => state?.user?.user);

    const [allCategory, setAllCategory] = useState([])
    const [openUpload, setOpenUpload] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [editUserData, setEditUserData] = useState(null);


    // This should show a valid restaurantId if it's set
    var restuId = "";
    if(user?.restaurantId){
        restuId = user?.restaurantId;
   }else{
        restuId = user?._id
   }
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

    //delete category...................................
    const [deleteProduct, setDeleteProduct] = useState(null);
    const handleDeleteClick = (product) => {
        setDeleteProduct(product);
    };
    
    const handleCancelDelete = () => {
        setDeleteProduct(null);
    };

  return (
    <div className='w-full p-4'>
      <div className='flex justify-between items-center bg-gray-200 p-4 rounded mb-4'>
                <h2 className='text-lg font-semibold'>All Users</h2>
                <button 
                    className='bg-red-500 text-white rounded-full px-4 py-2 hover:bg-red-700'
                    onClick={() => setOpenUpload(!openUpload)}
                >
                    Upload Category
                </button>
            </div>
      <table className='w-full userTable' >
        <thead className='bg-slate-100'>
          <tr>
            <th>Sr.</th>
            <th>Name</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
            {
              allCategory.map((user,index)=>{
                return(
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{user.name}</td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className='gap-2 flex justify-center '>
                      <button className='bg-red-400 text-white p-2 rounded-full hover:bg-red-700 ' onClick={()=>handleDeleteClick(user)} ><MdOutlineDelete /></button>
                    </td>
                  </tr>
                )
              })
            }
        </tbody>
      </table>
      {openUpload && (
        <AddCategory onClose={setOpenUpload} callUsers={fetchAllCategory} />
      )}
            {deleteProduct && (
                <DeleteCategory productId={deleteProduct} callProduct={fetchAllCategory} onCancelDelete={handleCancelDelete} />
            )}

    </div>
  )
}

export default AllCategory