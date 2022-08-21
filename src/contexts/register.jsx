import { createContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';



export const RegContext = createContext({});

const RegisterProvider = ({ children }) => {
 

  const schema = yup.object({
      name: yup.string().required("Campo necessário."),
      email: yup.string().email("Deve ser um e-mail válido").required("Campo necessário."),
      password: yup.string().matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Necessário 8 caracteres, uma letra maiúscula, uma letra minúscula, um numero e um caracter especial"
        ).required("Campo necessário."),
      confirmPass: yup.string().oneOf([yup.ref('password')], "Senha não confere.").required("Campo necessário."),
      bio: yup.string().required("Campo necessário."),
      contact: yup.string()
      .required("Campo necessário.")
      .matches(/^[0-9]+$/, "Somente números")
      .min(10, 'Precisa ser um telefone válido')
      .max(11, 'Precisa ser um telefone válido'),
      course_module: yup.string().required("Campo necessário."),

  });
  
  const { register, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(schema),
  });
  
  
 function registerUser(data){
  console.log(data);

  axios.post("https://kenziehub.herokuapp.com/users", data)
 .then((response) => console.log(response.data))
 .catch((error) => console.log(error));

 toast.success("Cadastro feito com sucesso!")
 
 }

   

    return (
        <RegContext.Provider value={{ handleSubmit, registerUser, register, errors }}>
          {children}
        </RegContext.Provider>
      );
}

export default RegisterProvider