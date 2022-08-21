import './App.css';
import RoutesMain from './routes';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import AuthProvider from './contexts/auth';
import RegisterProvider from './contexts/register';


function App() {

  const location = useLocation()

  const [userLogged, setUserLogged] = useState(null);
 

  return (
    <RegisterProvider>
    <AuthProvider>
      <main>
        
        <RoutesMain
        location={location}
        userLogged={userLogged}
        setUserLogged={setUserLogged}/>

      </main>
      <ToastContainer />
    </AuthProvider>
    </RegisterProvider>
  );
}

export default App;
