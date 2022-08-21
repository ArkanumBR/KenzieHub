
import Form from "../../components/form";
import logo from "../../images/Logo.jpg";
import './style.css';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { RegContext } from "../../contexts/register";
import { motion } from 'framer-motion';


const Register = () => {

    const navigate = useNavigate();
    const {handleSubmit, registerUser, register, errors} = useContext(RegContext);


   

    return (
        <motion.div
        initial={{ scaleY: 0}}
        animate={{ scaleY: 1}}
        exit={{ scaleY: 0}}
        transition={{duration: 1}}>
        <div>
            <div className="divImgBTN">
            <img src={logo} alt="logo" />
            <button className="buttonVoltar" onClick={() => navigate("/")}>Voltar</button>
            </div>
        <div className="divRegister">
            <h2 className="h2Register">Crie sua conta</h2>
            <h4 className="h4Register">Rápido e grátis, vamos nessa</h4>
            <Form onSubmit={handleSubmit(registerUser)}>
                <label htmlFor="name" >Nome</label>
                <input type="text" id="name" placeholder="Digite aqui seu nome" {...register('name')}/>
                <p className="errors">{errors.name?.message}</p>

                <label htmlFor="email" >Email</label>
                <input type="text" id="email" placeholder="Digite aqui seu email" {...register('email')}/>
                <p className="errors">{errors.email?.message}</p>
                
                <label htmlFor="password" >Senha</label>
                <input type="password" id="password"  placeholder="Digite aqui sua senha" {...register('password')}/>
                <p className="errors">{errors.password?.message}</p>

                <label htmlFor="confirmPass" >Confirmar Senha</label>
                <input type="password" id="confirmPass"  placeholder="Digite novamente sua senha" {...register('confirmPass')}/>
                <p className="errors">{errors.confirmPass?.message}</p>

                <label htmlFor="bio" >Bio</label>
                <input type="text" id="bio" placeholder="Fale sobre você" {...register('bio')}/>
                <p className="errors">{errors.bio?.message}</p>

                <label htmlFor="contact" >Contato</label>
                <input type="text" id="contact" placeholder="Opção de contato" {...register('contact')}/>
                <p className="errors">{errors.contact?.message}</p>

                <label htmlFor="course_module">Selecionar Módulo</label>
                <select name="" id="course_module" {...register('course_module')}>
                    <option>M1 - HTML/CSS</option>
                    <option>M2 - JavaScript</option>
                    <option>M3 - React</option>
                </select>
                <p className="errors">{errors.course_module?.message}</p>

                <button type="submit">Cadastrar</button>
            </Form>
        </div>
        </div>
        </motion.div>
    )
}

export default Register