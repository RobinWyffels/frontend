import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from "@auth0/auth0-react";
import App from './App'; // Adjust the path as needed
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const root = document.getElementById('root');
const app = (
  <React.StrictMode>
    <Auth0Provider
      domain="dev-k2d82dpnk36wm4mx.eu.auth0.com"
      clientId="utJCPRkAxSzynRkvTotAosG6z4wQ8CvD"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);

createRoot(root).render(app);