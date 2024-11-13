import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from "react-toastify"; 
import { FaEdit } from "react-icons/fa";
import AddProduct from '../components/AddProduct';

export default function AllProduct() {
    const [allProduct, setAllProduct] = useState([])
    const [openUpload, setOpenUpload] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)

    const fetchAllProduct = async()=>{
        const dataResponse = await fetch(SummaryApi.allProduct.url,{
            method: SummaryApi.allProduct.method,
            credentials: 'include'
        })

        const dataApi = await dataResponse.json()

        if(dataApi.success){
          setAllProduct(dataApi.data)
        }
        if(dataApi.error){
          toast.error(dataApi.error);
        }
    }

    useEffect(()=>{
        fetchAllProduct()
    },[])


  return (
    <div className='w-full p-4 overflow-x-auto'>
        <div className='w-full flex justify-between items-center bg-slate-200 p-2 mb-2 '>
            <h2>All Product</h2>
            <button className='bg-red-400 rounded-full p-2 hover:bg-red-700 text-white ' onClick={()=>setOpenUpload(!openUpload)} >Upload Product</button>
        </div>
      <table className=' min-w-full table-auto userTable' >
        <thead className='bg-slate-100'>
          <tr>
            <th>Si</th>
            <th>Id</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Created Date</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
            {
              allProduct.map((product,index)=>{
                return(
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{product._id}</td>
                    <td>{product?.name}</td>
                    <td>{product?.price}</td>
                    <td>{product?.category}</td>
                    <td>{product.stock}</td>
                    <td>{new Date(product.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button className='bg-green-100 p-2 rounded-full hover:bg-green-400 ' onClick={()=>setOpenEdit(!openEdit)} ><FaEdit /></button>
                    </td>
                  </tr>
                )
              })
            }
        </tbody>
      </table>
      {
        openUpload && 
        <AddProduct onclose={setOpenUpload}/>
      }
      {
        openEdit && 
        <EditProduct onclose={setOpenEdit}/>
      }
    </div>
  )

}

