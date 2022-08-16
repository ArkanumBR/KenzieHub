import './App.css';


import RoutesMain from './routes';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const [userLogged, setUserLogged] = useState(null);
 

  return (
    <>
    <main>
      
      <RoutesMain
      userLogged={userLogged}
      setUserLogged={setUserLogged}/>

    </main>
    <ToastContainer />
    </>
  );
}

export default App;
