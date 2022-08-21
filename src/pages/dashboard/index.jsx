import './style.css';
import logo from "../../images/Logo.jpg";
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import Techs from '../../components/techs';
import Modal from '../../components/modal';


const Dashboard = () => {

  
const { clearAll, techs, deleteTech, openModal, setOpenModal } = useContext(AuthContext);



    return (
        <motion.div
        initial={{ scaleY: 0}}
        animate={{ scaleY: 1}}
        exit={{ scaleY: 0}}
        transition={{duration: 1}}>

        <div className='divNavBar'>
            <img src={logo} alt="logo" />
            <button className='buttonSair' onClick={clearAll}>Sair</button>
        </div>
        <header className='headerHome'> 
            <h2 className='h2Home'>Olá, {localStorage.getItem("name")}</h2>
            <h4 className='h4Home'> {localStorage.getItem("module")}</h4>
        </header>
        <main className='mainHome'>
            <div className='divTechs'>
                <span>Tecnologias</span>
                <button className='buttonAddTechs' onClick={() => setOpenModal(!openModal)}>+</button>
                {openModal && (
                    <Modal/>
                    
                 )}
            </div>
            <div className='listagemTechs'>
                {techs.map((e) => {
                return (
                    <Techs
                    status={e.status}
                    title={e.title}
                    id={e.id}
                    deleteTech={deleteTech} 
                    key={e.created_at}                  
                    />
                )})}  
            </div>
        </main>
        </motion.div>
    )
}

export default Dashboard