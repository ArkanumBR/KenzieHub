import { createContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


 
export const RegContext = createContext({});

const RegisterProvider = ({ children }) => {
  const navigate = useNavigate(); 

  const schema = yup.object({
      name: yup.string().required("Campo necessário."),
      email: yup.string().email("Deve ser um e-mail válido").required("Campo necessário."),
      password: yup.string().matches(
          // eslint-disable-next-line no-useless-escape
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Necessário 8 caracteres, uma letra maiúscula, uma letra minúscula, um numero e um caracter especial"
        ).required("Campo necessário."),
      confirmPass: yup.string().oneOf([yup.ref('password')], "Senha não confere.").required("Campo necessário."),
      bio: yup.string().required("Campo necessário."),
      contact: yup.string()
      .required("Campo necessário.")
      .matches(/^[0-9]+$/, "Somente números")
      .min(10, 'Precisa ser um telefone válido no formato, como por exemplo: 38998976570')
      .max(11, 'Precisa ser um telefone válido no formato, como por exemplo: 38998976570'),
      course_module: yup.string().required("Campo necessário."),

  });
  
  const { register, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(schema),
  });
  
  
 async function registerUser(data){
  await axios.post("https://kenziehub.herokuapp.com/users", data)
 .then((response) => {
  console.log(response.data)
  toast.success("Cadastro feito com sucesso!")
  navigate("/")
})
 .catch((error) => {
  toast.error("Email já cadastrado!")
  console.log(error)}); 
 }

   

    return (
        <RegContext.Provider value={{ handleSubmit, registerUser, register, errors }}>
          {children}
        </RegContext.Provider>
      );
}

export default RegisterProvider