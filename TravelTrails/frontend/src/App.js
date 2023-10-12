import {BrowserRouter ,Routes, Route} from 'react-router-dom';
//pages and components
import Home from './pages/Home';
import Navbar from './components/navbar';
import AccountCreation from './pages/AccountCreation';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <div className = "pages">
        <Routes>
          <Route path = "/" element = {<Home/>}/>
          <Route path = "/accountCreation" element = {<AccountCreation/>}/>
        </Routes>

      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
