import { useEffect, useState } from 'react'

import './App.css'

import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from './common'
import Context from './context'
import { useDispatch } from 'react-redux'
import { setUserDetails } from './store/userSlice'

function App() {

  const dispatch = useDispatch()

  const fetchUserDetails = async() =>{
    const dataResponse = await fetch(SummaryApi.currentUser.url,{
      method: SummaryApi.currentUser.method,
      credentials: 'include'
    })

    const dataApi = await dataResponse.json()
    if(dataApi.success){
      dispatch(setUserDetails(dataApi.data))
    }
  }
  useEffect(()=>{
    fetchUserDetails()
  })
  return (
    <>
      <Context.Provider value={{
        fetchUserDetails
      }}>
      <ToastContainer />
      <Header />
      <main className='min-h-[calc(95vh-100px)] '>
      <Outlet />
      </main>
      <Footer />
      </Context.Provider>
    </>
  )
}

export default App
