import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


import api from "../services/api";



interface ITech{
  title: string;
  status: string;
  id?: string;
}

interface IAuth{
  children: ReactNode;
}

interface IAuthContext{
  userLogged: boolean,
  setUserLogged: Dispatch<SetStateAction<boolean>>,
  techs: ITech[];
  setTechs: Dispatch<React.SetStateAction<ITech[]>>;
  openModal: boolean,
  setOpenModal:  Dispatch<SetStateAction<boolean>>,
}
export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider = ({ children } : IAuth) => {

    const [userLogged, setUserLogged] = useState(false);
    const [techs, setTechs]           = useState<ITech[]>([]);
    const [openModal, setOpenModal] = useState(false)  
    const navigate = useNavigate();   


useEffect(() => {
    if (localStorage.getItem("authToken") !== null) {
      api
        .get("profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}`, }
        })
        .then((response) => {
            setTechs(response.data.techs);
            setUserLogged(response.data);
        })
        .catch((error) => console.log(error));
    } 
  }, [techs, navigate, userLogged]);




    return (
        <AuthContext.Provider value={{ techs, setTechs, openModal, setOpenModal, userLogged, setUserLogged }}>
          {children}
        </AuthContext.Provider>
      );
}

export default AuthProvider