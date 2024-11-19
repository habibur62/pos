import React from 'react'
import { Link } from 'react-router-dom';
import { IoIosCreate } from "react-icons/io";

export default function Home() {
  return (
    <div className='bg-white h-[100vh] w-full pt-4 '>
      <div className='flex justify-center items-center gap-4'>
        <Link to={"/order"}>
            <div className='bg-white w-[200px] h-[200px] border rounded shadow-2xl flex items-center justify-center'>
                <IoIosCreate  className='text-6xl text-red-400 '/>
                <h2>Create Order</h2>
            </div>
        </Link>
        
        <div className='bg-white w-[200px] h-[200px] border rounded shadow-2xl flex items-center justify-center'>
          <h2>Total Order</h2>
        </div>
      </div>
    </div>
  )
}
