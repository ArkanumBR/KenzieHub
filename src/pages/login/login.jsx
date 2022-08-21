
import Form from "../../components/form";
import logo from "../../images/Logo.jpg"
import "./style.css";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";



const Login = () => {
    

    const navigate = useNavigate();
    const {handleSubmit, handleForm, register, errors} = useContext(AuthContext);
   

   

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