import './App.css';
import RoutesMain from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from './contexts/auth';



function App() {


  return (
   
    <AuthProvider>
      <main>
        
      <RoutesMain />

      </main>
      <ToastContainer />
    </AuthProvider>
    
  );
}

export default App;
