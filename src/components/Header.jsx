import React from 'react'
import Logo from './Logo'
import { IoMdSearch } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import {toast} from 'react-toastify'
import { setUserDetails } from '../store/userSlice';


export default function Header() {
    const user = useSelector(state=>state?.user?.user)
    const dispatch = useDispatch()
    const handleLogout = async() =>{
        const fetchData = await fetch(SummaryApi.logoutUser.url,{
            method: SummaryApi.logoutUser.method,
            credentials: 'include'
        })

        const dataResponse = await fetchData.json()

        if(dataResponse.success){
            toast.success(dataResponse.message)
            dispatch(setUserDetails(null))
        }
        if(dataResponse.error){
            toast.error(dataResponse.message)
        }
    
    }
  return (
    <header className='h-16 shadow-sm bg-slate-100 '>
        <div className='container mx-auto h-full flex items-center justify-between '>
            <div className='cursor-pointer '>
                <Link to={"/"}>   
                 <Logo w={90} h={50}/>
                </Link>
            </div>
            <div className='bg-white flex justify-between w-full max-w-lg border rounded-full items-center shadow-md pl-4'>
                <input type="text" placeholder='Search...' className=' w-full outline-none ' />
                <div className='flex items-center text-2xl justify-center px-4 py-2 bg-slate-200 rounded-r-full cursor-pointer '>
                <IoMdSearch />
                </div>
            </div>
            <div className='flex items-center gap-4 '>
                <div className='text-3xl cursor-pointer  '>
                    {
                        user?.profilePic ? (
                            <img src={user?.profilePic} className='w-10 h-10 rounded-full ' />
                        ) :(
                            <FaRegUserCircle />
                        )
                    }
               </div>
               <div >
                {
                    user?._id ? (
                        <button onClick={handleLogout} className='px-2 py-1 text-white bg-red-500 rounded-full '>Logout</button>
                    ) : (
                        <Link to={"/login"} className='px-2 py-1 text-white bg-red-500 rounded-full '>Login</Link>
                    )
                }
               </div>
            </div>
            
        </div>
    </header>
  )
}
