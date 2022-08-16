import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Form from "../../components/form";
import logo from "../../images/Logo.jpg";
import './style.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


const Register = () => {

    const navigate = useNavigate();

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
    )
}

export default Register