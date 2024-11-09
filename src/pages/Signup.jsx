import React, { useState } from 'react'
import loginImg from '../assets/login.png'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
export default function Signup() {
  const [showhidePass, setShowhidePass] = useState(false)
  const [showConfirmPass, setShowConfirmPass] = useState(false)

  
  const[data, setData] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      profilePic: ""
  })
  const navigate = useNavigate()

  const handleOnChange = (e) =>{
      const {name, value} = e.target
      setData((prev)=>{
          return{
              ...prev,
              [name]: value
          }
      })
  }
  const [image, setImage] = useState(null);

  const handleProfilePic = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set the image preview URL
        // Update profilePic in the data state after image is loaded
        setData((prev) => ({
          ...prev,
          profilePic: reader.result,
        }));
      };
      reader.readAsDataURL(file); // Convert the file to a data URL
    }
  };
  //console.log(image)
  

 // connect with backend
  const handleOnSubmit = async(e) =>{
      e.preventDefault()

      if(data.password === data.confirmPassword){
        const dataResponse = await fetch(SummaryApi.signUp.url,{
            method: SummaryApi.signUp.method,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)    
        })
    
          const dataApi = await dataResponse.json()
          if(dataApi.success){
            toast.success(dataApi.message)
            navigate("/login")
          }
          if(dataApi.error){
            toast.error(dataApi.message)
          }

      }else{
        console.log("Password did not match")
      }
    
  }
  



  return (
    <section id='login'>
        <div className='mx-auto container p-4 '>
            <div className='bg-slate-50 p-2 w-full max-w-md mx-auto '>
            <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full '>
              <div>
                {
                    image ? (
                        <img src={image} alt='login Icons' />
                    ) : (
                        <img src={loginImg} alt='login Icons' />
                    )
                }
              </div>
                <form >
                    <label>
                    <div className='absolute cursor-pointer bg-white bg-opacity-80 text-sm  text-center bottom-0 w-full '>
                        Upload Photo
                        </div>
                        <input type="file" className='hidden ' onChange={handleProfilePic} />
                    </label>
                </form>
            </div>
            <form className='pt-5 flex flex-col gap-2 ' onSubmit={handleOnSubmit}>
                <div className='grid'>
                    <label htmlFor="">Name:</label>
                    <div className='p-2 bg-white'>
                      <input type="text" id='name' name='name' value={data.name} placeholder='Enter name...' className='w-full outline-none rounded-full ' onChange={handleOnChange} required />
                    </div>
                </div>
                <div className='grid'>
                    <label htmlFor="">Email:</label>
                    <div className='p-2 bg-white'>
                      <input type="email" id='email' name='email'value={data.email} placeholder='Enter Email...' className='w-full outline-none rounded-full ' onChange={handleOnChange} required />
                    </div>
                </div>
                <div className='grid'>
                    <label htmlFor="">Password:</label>
                    <div className='p-2 bg-white flex '>
                      <input type={showhidePass? "text" : "password"}id='password' name='password'value={data.password} placeholder='Enter password...' className='w-full h-full outline-none rounded-full'  onChange={handleOnChange} required/>
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
                <div className='grid'>
                    <label htmlFor="">Confirm Password:</label>
                    <div className='p-2 bg-white flex '>
                      <input type={showConfirmPass? "text" : "password"}id='confirmPassword' name='confirmPassword' value={data.confirmPassword} placeholder='Enter confirm password...' className='w-full h-full outline-none rounded-full'  onChange={handleOnChange} required/>
                        <div className='cursor-pointer items-center flex ' onClick={()=>setShowConfirmPass(!showConfirmPass)}>
                            {
                                showConfirmPass ? (
                                    <FaEyeSlash />
                                ) : (
                                    <FaEye />

                                )
                            }
                        </div>
                    </div>
                </div>
                <button className='bg-red-600 px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 mx-auto block my-4 '>Sign Up</button>
            </form>
                <p>Have an Account ? <Link to={"/login"} className='text-red-500 hover:text-red-700 hover:underline '>Sign In</Link> </p>
            </div>
        </div>
    </section>
  )
}
