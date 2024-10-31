import { useState } from 'react'

import './App.css'

import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <main className='min-h-[calc(95vh-100px)] '>
      <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App
