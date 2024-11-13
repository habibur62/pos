import React, { useState }  from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { toast } from "react-toastify"; 
import SummaryApi from '../common';
import {Link, Outlet} from 'react-router-dom'

export default function AdminPanel() {
    const user = useSelector(state => state?.user?.user)
    //add product
   

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
            <p className='capitalize text-lg  ' >{user?.role}</p>
            </div>
            <div>
                <nav className='grid p-4 '>
                    <Link to={"all-users"} className='px-2 hover:bg-slate-100 ' >All Users</Link>
                    <Link to={"all-product"} className='px-2 hover:bg-slate-100 ' >All product</Link>

                </nav>
            </div>
        </aside>
        <main>
            <Outlet />
        </main>
    </div>
  )
}
