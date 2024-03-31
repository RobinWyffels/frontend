import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Home from './Components/Pages/Home.jsx'
//import FoodInfo from './Components/Pages/Food/FoodInfo.jsx'
import NotFound from './Components/Pages/NotFound.jsx';
import Layout from './Components/Layout.jsx'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
// import './index.css'


const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        index: true,
        element: <Navigate to="/home" replace/>,
      },
      {
        path: "/home",
        element: <Home />,
      },
      //{
      //   path: "/foodInfo",
      //   element: <FoodInfo />,
      // },
      {
        path: "*",
        element: <NotFound/>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} /> {/* 👈 */}
  </React.StrictMode>
);
