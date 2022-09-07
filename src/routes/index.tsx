import Login from "../pages/login/login";
import Dashboard from "../pages/dashboard";
import Register from "../pages/register/register";
import { AnimatePresence } from "framer-motion";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";


interface IPrivateRoute {
    children: ReactNode;
    redirectTo: string;
  }
  
  const PrivateRoute = ({ children, redirectTo }: IPrivateRoute) => {
    const isAuthenticated = localStorage.getItem("authToken") !== null;
  
    return <>
    {isAuthenticated ? children : <Navigate to={redirectTo} />}
    </>;
  };


const RoutesMain = () => {

const location = useLocation();

return (
    <AnimatePresence>
        <Routes location={location} key={location.pathname}>        
            <Route path="/" element={<Login/>} />    
                     
            <Route path="*" element={<Navigate to={"/"}/>}/>  
           
            <Route path="/register" element={<Register/>}/>

            <Route path="/dashboard" element={<PrivateRoute redirectTo="/">
                <Dashboard/>
            </PrivateRoute>}
            />
            
        </Routes>
    </AnimatePresence>
    );
}

export default RoutesMain

