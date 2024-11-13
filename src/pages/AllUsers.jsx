import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from "react-toastify"; 
import { FaEdit } from "react-icons/fa";

export default function AllUsers() {
    const [allUser, setAllUser] = useState([])

    const fetchAllUsers = async()=>{
        const dataResponse = await fetch(SummaryApi.allUsers.url,{
            method: SummaryApi.allUsers.method,
            credentials: 'include'
        })

        const dataApi = await dataResponse.json()
        if(dataApi.success){
          setAllUser(dataApi.data)
        }
        if(dataApi.error){
          toast.error(dataApi.error);
        }
    }

    useEffect(()=>{
        fetchAllUsers()
    },[])


  return (
    <div className='w-full p-4'>
      <table className='w-full min-w-[90vh]  userTable' >
        <thead>
          <tr>
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
            {
              allUser.map((user,index)=>{
                return(
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
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

