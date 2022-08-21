import { Container } from "./style"
import { MdClose } from 'react-icons/md'
import { useContext } from "react"
import { AuthContext } from "../../contexts/auth";
import { useForm } from "react-hook-form";





const Modal = () => {

    const { addNewTech, setOpenModal } = useContext(AuthContext);

    const {register, handleSubmit} = useForm();
    
    return (

        
        <Container onSubmit={handleSubmit(addNewTech)}>
            
            <div className="modalBox">
                <button onClick={() => setOpenModal(false)} className="closebutton" >
                    <MdClose size={21}/>
                </button>
                <div className="modalCompleto">
                    <div className="cabecalhoModal">
                        <p>Cadastrar Tecnologia</p>
                    </div>
                    <span>Nome</span>
                    <input placeholder="Tech" type="text" {...register("title")}></input>
                    <span>Selecionar Status</span>
                    <select {...register("status")}>
                        <option value="Iniciante">Iniciante</option>
                        <option value="Intermediario">Intermediario</option>
                        <option value="Avançado">Avançado</option>
                    </select>
                    <button className="cadastrarTech">Cadastrar Tecnologia</button>
                </div>                
            </div>
            
        </Container>
    

    )
}

export default Modal