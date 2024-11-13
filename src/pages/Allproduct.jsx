import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from "react-toastify"; 
import { FaEdit } from "react-icons/fa";

export default function AllProduct() {
    const [allProduct, setAllProduct] = useState([])

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
    <div className='w-full p-4'>
      <table className='w-full userTable' >
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
                      <button className='bg-green-100 p-2 rounded-full hover:bg-green-400 '><FaEdit /></button>
                    </td>
                  </tr>
                )
              })
            }
        </tbody>
      </table>
    </div>
  )
}

