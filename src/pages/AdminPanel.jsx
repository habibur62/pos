import React from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import { useSelector } from 'react-redux'

export default function AdminPanel() {
    const user = useSelector(state => state?.user?.user)

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
            </div>
        </aside>
        <main>
                main
        </main>
    </div>
  )
}
