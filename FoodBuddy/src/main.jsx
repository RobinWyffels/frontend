import React from 'react'
import ReactDOM from 'react-dom/client'
import { Auth0Provider } from "@auth0/auth0-react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Home from './Components/Pages/Home.jsx'
import FoodInfo from './Components/Pages/Food/FoodInfo.jsx'
import NotFound from './Components/Pages/NotFound.jsx';
import UnderConstruction from './Components/Pages/UnderConstruction.jsx';
import Layout from './Components/Layout.jsx'
import FoodDetails from './Components/Pages/Food/FoodDetails.jsx';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        index: true,
        element: <Navigate to="/home" replace />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/foodinfo",
        element: <FoodInfo />,
      },
      {
        path: "/foodNutrients/:id",
        element: <FoodDetails />,
        
      },
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "/underConstuction",
        element: <UnderConstruction />,
      },
    ],
  },
  
  {
    path: "*",
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-k2d82dpnk36wm4mx.eu.auth0.com"
      clientId="utJCPRkAxSzynRkvTotAosG6z4wQ8CvD"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <RouterProvider router={router} />
    </Auth0Provider>
  </React.StrictMode>
);
