import {BrowserRouter ,Routes, Route,Navigate} from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import { CommentsContextProvider } from './context/CommentContext';
//pages and components
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Settings from './pages/Settings';
import Navbar from './components/Navbar';


function App() {
  const {accounts} = useAuthContext();

  return (
    <CommentsContextProvider>
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
          <Route path="/settings" element={accounts ? <Settings/> : <Navigate to="/login" />} />

        </Routes>

      </div>
      </BrowserRouter>
    </div>
    </CommentsContextProvider>
  );
}

export default App;
