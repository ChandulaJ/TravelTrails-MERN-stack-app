import {BrowserRouter ,Routes, Route,Navigate} from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
//pages and components
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/navbar';


function App() {
  const {accounts} = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
    
      <div className = "pages">
        <Routes>
          <Route path = "/" element = { <div>
                {accounts && <Navbar />}
                {accounts ? <Home /> : <Navigate to="/login" />}
              </div>}
              />
          <Route path = "/signup" element = { <div>
                { <Navbar />}
                {!accounts? <Signup/> : <Navigate to="/"/>}
                </div>}
                />
                
          <Route path = "/login" element = {!accounts? <Login/> : <Navigate to="/"/>}/>
        </Routes>

      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
