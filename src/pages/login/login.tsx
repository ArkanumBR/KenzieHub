
import Form from "../../components/form";
import logo from "../../images/Logo.jpg"
import "./style.css";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import api from "../../services/api";
import { toast } from "react-toastify";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

interface IUser{
    email?: string,
    password?: string,
    name?: string,
    bio?: string,
    contact?: string,
    course_module?: string,
    title?: string;
    status?: string;
    }

const Login = () => {
    

    const navigate = useNavigate();
    const {setUserLogged, setTechs, } = useContext(AuthContext);

    const schema = yup.object({
        email: yup.string().email("Deve ser um e-mail válido.").required("Campo obrigatório."),
        password: yup.string().min(8, "Senha tem pelo menos 8 caracteres.").required("Campo obrigatório."),
        
    });
    
    const { register, handleSubmit, formState: { errors } } = useForm<IUser>({
        resolver: yupResolver(schema),
    });
   
    const handleForm = (user : IUser) =>{
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
           }
           )
      }
   
   

    return (
        <motion.div
        initial={{ scaleY: 0}}
        animate={{ scaleY: 1}}
        exit={{ scaleY: 0}}
        transition={{duration: 1}}>
        <div className="divMainLogin">
            <img src={logo} alt="logo" className="imgLogin"/>

            <div className="divLogin">
                <h2 className="h2Login">Login</h2>
            
            
            <Form onSubmit={handleSubmit(handleForm)}>
               
                <label htmlFor="email">Email</label>
                <input type="text" id="email" {...register('email')}/>
                <p>{errors.email?.message}</p>
                
                <label htmlFor="password">Password</label>
                <input type="password" id="password"  {...register('password')}/>
                <p>{errors.password?.message}</p>

                <button type="submit">Entrar</button>
            </Form>
            <h4 className="h4Login">Ainda não possui uma conta?</h4>
            <button className="buttonCadastre" onClick={() => {                
                navigate("/register")}}>Cadastre-se</button>

            </div>
        </div>
        </motion.div>
    )
}

export default Login