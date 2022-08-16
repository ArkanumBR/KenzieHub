import './style.css';
import logo from "../../images/Logo.jpg";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const Dashboard = ({ setUserLogged }) => {

const navigate = useNavigate();

function clearAll(){
        window.localStorage.clear();     
        setUserLogged(false);
        toast.success("Logout realizado!")   
        navigate("/");
    }
    return (
        <>
        <div className='divNavBar'>
            <img src={logo} alt="logo" />
            <button className='buttonSair' onClick={clearAll}>Sair</button>
        </div>
        <header className='headerHome'> 
            <h2 className='h2Home'>Olá, {localStorage.getItem("name")}</h2>
            <h4 className='h4Home'> {localStorage.getItem("module")}</h4>
        </header>
        <main className='mainHome'>
            <p>Que pena! Estamos em desenvolvimento.</p>
            <p>Nossa aplicação está em desenvolvimento, em breve teremos novidades</p>
        </main>
        </>
    )
}

export default Dashboard