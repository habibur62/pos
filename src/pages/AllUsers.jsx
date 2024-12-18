import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from "react-toastify"; 
import { FaEdit } from "react-icons/fa";
import AddStaff from '../components/AddStaff';
import { MdOutlineDelete } from "react-icons/md";
import EditUser from '../components/EditUser';
import DeleteUser from '../components/DeleteUser';

export default function AllUsers() {
    const [allUser, setAllUser] = useState([])
    const [openUpload, setOpenUpload] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [editUserData, setEditUserData] = useState(null); // Track data for the product to edit


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

    //role count
    const [roleCounts, setRoleCounts] = useState({ admin: 0, staff: 0 });

useEffect(() => {
  const counts = allUser.reduce(
    (acc, user) => {
      if (user.role === "Admin") {
        acc.admin += 1;
      } else if (user.role === "Staff") {
        acc.staff += 1;
      }
      return acc;
    },
    { admin: 0, staff: 0 } // Initialize both counts to 0
  );

   setRoleCounts(counts);
  }, [allUser]); // Re-run when allUser changes

  //Edit user role.................................
    const handleEditClick = (user) => {
      setEditUserData(user);
      setOpenEdit(true);

  };

   // Delete product
   const [deleteUser, setDeleteUser] = useState(null);
   const handleDeleteClick = (user) => {
    setDeleteUser(user);
    
   };
   
   const handleCancelDelete = () => {
    setDeleteUser(null);
   };

    

  return (
    <div className='w-full p-4'>
      <div className='flex justify-between items-center bg-gray-200 p-4 rounded mb-4'>
                <h2 className='text-lg font-semibold'>All Users</h2>
                <button 
                    className='bg-red-500 text-white rounded-full px-4 py-2 hover:bg-red-700'
                    onClick={() => setOpenUpload(!openUpload)}
                >
                    Upload Staff
                </button>
            </div>
      <table className='w-full userTable' >
        <thead className='bg-slate-100'>
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
                    <td className='gap-2 flex justify-center '>
                      <button className='bg-green-100 p-2 rounded-full hover:bg-green-400 '  onClick={() => handleEditClick(user)} ><FaEdit /></button>
                      <button className='bg-red-400 text-white p-2 rounded-full hover:bg-red-700 ' onClick={()=>handleDeleteClick(user)} ><MdOutlineDelete /></button>
                    </td>
                  </tr>
                )
              })
            }
        </tbody>
      </table>
      {openUpload && (
        <AddStaff onClose={setOpenUpload} callUsers={fetchAllUsers} />
      )}
      {openEdit && editUserData && (
                <EditUser onClose={setOpenEdit} initialData={editUserData} callProduct={fetchAllUsers} />
            )}
      {
        deleteUser && (
                <DeleteUser userId={deleteUser} callProduct={fetchAllUsers} onCancelDelete={handleCancelDelete} />
            )
      }
    </div>
  )
}

