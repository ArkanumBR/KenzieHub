import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Form from "../../components/form";
import logo from "../../images/Logo.jpg"
import style from "./style.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';



const Login = ({ userLogged, setUserLogged }) => {
    

    const navigate = useNavigate();
   

    const schema = yup.object({
        email: yup.string().email("Deve ser um e-mail válido.").required("Campo obrigatório."),
        password: yup.string().min(8, "Senha tem pelo menos 8 caracteres.").required("Campo obrigatório."),
        
    });
    
    const { register, handleSubmit, formState: { errors }, setError } = useForm({
        resolver: yupResolver(schema),
    });

    
        
   function handleForm(user){
     axios.post("https://kenziehub.herokuapp.com/sessions", {...user}).then((response) =>{
        console.log(response);     
        window.localStorage.clear();       
        window.localStorage.setItem("authToken", response.data.token);
        window.localStorage.setItem("name", response.data.user.name);
        window.localStorage.setItem("module", response.data.user.course_module);
        setUserLogged(true);
        toast.success("Login feito com sucesso!")
        navigate("/dashboard")




    })
        .catch((error) =>
        {   alert("Dados incorretos")
            setError("password", {message: console.log(error.response.data)})
        }
        )
   }

    return (
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
    )
}

export default Login