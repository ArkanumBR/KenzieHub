import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import './style.css';
import { FaTrash } from 'react-icons/fa';

function Techs ({ status, title, deleteTech, id }) {



    return (
        <>
        <div className="divDasTechs">
            <span className="techName">{title}</span>
            <div className="divNivelTrash">
                <span>{status}</span>
                <span><FaTrash className='trash' onClick={() => deleteTech(id)}/></span>
            </div>
        </div>
        
        </>
    )
}

export default Techs