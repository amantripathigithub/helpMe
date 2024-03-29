import './App.css';
import { Toaster } from 'react-hot-toast';
import Signup from './components/Signup';

import Profile from './components/Profile'
import { Routes, Route } from 'react-router-dom';
import NoMatch from './components/NoMatch';
import Helpme from './components/Helpme';
import Map from './components/Map';
import Login from './components/Login';
import LetsHelp from './components/LetsHelp';
function App() {
  
  return (
    <div className="App">
       <Toaster position="bottom-center" reverseOrder={false} />
       <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/helpMe" element={<Helpme />} />
          <Route path="/map" element={<Map />} />
          <Route exact path="/lets_help/:id" element={<LetsHelp />} />

          <Route path="*" element={<NoMatch />} />
       </Routes>
     
    </div>
  );
}

export default App;
