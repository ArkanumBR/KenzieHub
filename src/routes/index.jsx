import Login from "../pages/login/login";
import Dashboard from "../pages/dashboard";
import Register from "../pages/register/register";
import { AnimatePresence } from "framer-motion";
import { Routes, Route, Navigate } from "react-router-dom";


const RoutesMain = ({ location }) => (
    
    
    <AnimatePresence wait>
    <Routes>        
        <Route path="/" element={<Login/>} location={location} key={location.pathname} />
        
        
        
        <Route path="/dashboard" element={<Dashboard />} location={location} key={location.pathname}/> 
       
            <Route path="/register" element={<Register/>} location={location} key={location.pathname}/>
            <Route path="*" element={<Navigate to={"/"}/>} location={location} key={location.pathname}/>    
        
             
               
    </Routes>
    </AnimatePresence>
)

export default RoutesMain

