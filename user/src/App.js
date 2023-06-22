import './App.css';
import { Toaster } from 'react-hot-toast';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  
  return (
    <div className="App">
       <Toaster position="bottom-center" reverseOrder={false} />
      <Signup></Signup>
     
    </div>
  );
}

export default App;
