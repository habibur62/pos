import React from 'react'
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className='bg-white h-[100vh] w-full pt-4 '>
      <div className='flex justify-center items-center gap-4'>
        <Link to={"/order"}>
             <div className='cursor-pointer bg-slate-100 w-[200px] h-[200px] border rounded shadow-ml flex items-center justify-center'>
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
