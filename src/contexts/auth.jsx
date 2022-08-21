import { createContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import api from "../services/api";



export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {

    const [userLogged, setUserLogged] = useState(null);
    const [techs, setTechs]           = useState();
    const [openModal, setOpenModal] = useState(false)  
    const navigate = useNavigate();   
   
   

    const schema = yup.object({
        email: yup.string().email("Deve ser um e-mail válido.").required("Campo obrigatório."),
        password: yup.string().min(8, "Senha tem pelo menos 8 caracteres.").required("Campo obrigatório."),
        
    });
    
    const { register, handleSubmit, formState: { errors }, setError } = useForm({
        resolver: yupResolver(schema),
    });

    
        
   function handleForm(user){
     api.post("sessions", {...user}).then((response) =>{
          
        window.localStorage.clear();       
        window.localStorage.setItem("authToken", response.data.token);
        window.localStorage.setItem("name", response.data.user.name);
        window.localStorage.setItem("userID", response.data.user.id);
        window.localStorage.setItem("module", response.data.user.course_module);
        setUserLogged(true);
        setTechs(response.data.user.techs);
        toast.success("Login feito com sucesso!");
        navigate("/dashboard");
    })
        .catch((error) =>
        {   toast.error("Dados incorretos!");
            setError("password", {message: console.log(error.response.data)})
        }
        )
   }

   function clearAll(){
    window.localStorage.clear();     
    setUserLogged(false);
    toast.success("Logout realizado!")   
    navigate("/");
}

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

function deleteTech(id){
    
   api.delete(`users/techs/${id}`, {
    headers: { Authorization : `Bearer ${localStorage.getItem("authToken")}`}
   }).then((response) => {
    toast.success("Tech excluída com sucesso!") 
    return response.data;
   }).catch((error) => console.log(error))
}

async function addNewTech(data){
  await api.post("users/techs", data, {
    headers: { Authorization : `Bearer ${localStorage.getItem("authToken")}`}
   })
  .then((response) => {
    toast.success("Tech cadastrada com sucesso!");
    setOpenModal(false);
  }).catch((error) => {
    toast.error("Tech não cadastrada =(");
  })
}
    return (
        <AuthContext.Provider value={{ handleSubmit, handleForm, register, errors, clearAll, techs, deleteTech, addNewTech, openModal, setOpenModal }}>
          {children}
        </AuthContext.Provider>
      );
}

export default AuthProvider