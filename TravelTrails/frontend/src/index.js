import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SocialPostsContextProvider } from './context/SocialPostContext';
import { AuthContextProvider } from './context/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <SocialPostsContextProvider>
    <App />
    </SocialPostsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);


