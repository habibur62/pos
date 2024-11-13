import React from "react";
import ReactDOM from "react-dom";
import {RouterProvider} from "react-router-dom"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import router from "./routes/index.jsx";
import { Provider } from 'react-redux'
import { store } from "./store/store.jsx";

createRoot(document.getElementById('root')).render(
 // <React.StrictMode>
      <Provider store={store}>
       <RouterProvider router={router} />
    </Provider>
 // </React.StrictMode>,
)
