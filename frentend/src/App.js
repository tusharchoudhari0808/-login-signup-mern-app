import { Routes ,Route, Navigate} from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import SingUp from './pages/SingUp';
import Home from './pages/Home';
import { useState } from 'react';
import RefreshHendler from './pages/RefreshHendler';
function App() {
  const [isAuthorize, setIsAuthorize] = useState(false);

const PrivetRoutes = ({element}) =>{ 
  return isAuthorize ? element : <Navigate to="/login"/>
}

  return (
    <div className="App">
      <RefreshHendler setIsAuthorize = {setIsAuthorize}/>
    <Routes>
      <Route path = '/' element={<Navigate to="/login"/> }/>
      <Route path = '/login' element={<Login/>}/>
      <Route path = '/singup' element={<SingUp/>}/>
      <Route path = '/home'element={<PrivetRoutes  element={<Home/>} />}/>
    </Routes>
    </div>
  );
}

export default App;
