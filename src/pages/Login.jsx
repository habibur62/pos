import React, { useState } from 'react'
import loginImg from '../assets/login.png'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';


export default function Login() {
    const [showhidePass, setShowhidePass] = useState(false)

    const[data, setData] = useState({
        email: "",
        password: ""
    })
    const handleOnChange = (e) =>{
        const {name, value} = e.target

      //  console.log(e.target)
        setData((prev)=>{
            return{
                ...prev,
                [name]: value
            }
        })
    }
    console.log(data)
    const handleOnSubmit = (e) =>{
        e.preventDefault()
    }
  return (
    <section id='login'>
        <div className='mx-auto container p-4 '>
            <div className='bg-slate-50 p-2 w-full max-w-md mx-auto '>
            <div className='w-20 h-20 mx-auto '>
                <img src={loginImg} alt='login Icons' />
            </div>
            <form onSubmit={handleOnSubmit}>
                <div className='grid'>
                    <label htmlFor="">Email:</label>
                    <div className='p-2 bg-white'>
                      <input type="email" id='email' name='email' placeholder='Enter Email...' className='w-full outline-none rounded-full ' onChange={handleOnChange} />
                    </div>
                </div>
                <div className='grid'>
                    <label htmlFor="">Password:</label>
                    <div className='p-2 bg-white flex '>
                      <input type={showhidePass? "text" : "password"}id='password' name='password' placeholder='Enter password...' className='w-full h-full outline-none rounded-full'  onChange={handleOnChange}/>
                        <div className='cursor-pointer items-center flex ' onClick={()=>setShowhidePass(!showhidePass)}>
                            {
                                showhidePass ? (
                                    <FaEyeSlash />
                                ) : (
                                    <FaEye />

                                )
                            }
                        </div>
                    </div>
                </div>
                <Link to={"/forgot-password"} className='block w-fit ml-auto hover:underline ' >
                    Forgot Password
                </Link>
                <button className='bg-red-600 px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 mx-auto block my-4 '>Login</button>
            </form>
                <p> Don't have an Account ? <Link to={"/signup"} className='text-red-500 hover:text-red-700 hover:underline '>Sign Up</Link> </p>
            </div>
        </div>
    </section>
  )
}
