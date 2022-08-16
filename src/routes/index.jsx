import Login from "../pages/login/login";
import Dashboard from "../pages/dashboard";
import Register from "../pages/register/register";
const { Routes, Route, Navigate } = require("react-router-dom");


const RoutesMain = ({ userLogged, setUserLogged }) => (
    <Routes>
        
        <Route path="/" element={<Login userLogged={userLogged} setUserLogged={setUserLogged}/>} />
        
        {userLogged === true? 
        <>
        <Route path="/dashboard" element={<Dashboard setUserLogged={setUserLogged}/>}/> 
        </>
        :
        <>
            <Route path="/register" element={<Register/>} />
            <Route path="*" element={<Navigate to={"/"}/>}/>    
        </>
         }       
        

        
    </Routes>
)

export default RoutesMain

