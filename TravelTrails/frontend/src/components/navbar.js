import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const { logout } = useLogout()
  const handleClick = () => {
    logout()
  }

  return (
    <header>
        <div className="container">
            <Link to="/">
           
            <img
                src="logo.png"
                alt="TravelTrails Logo"
                className="logo"
                width="556" 
                height="188"/>

            </Link> 
            
            <nav>
              <div>
                <button onClick={handleClick}>
                  Logout
                </button>
              </div>
              <div>
                <Link to = "/login">Login  </Link>
                <Link to = "/signup">  Signup</Link>
              </div>
            </nav>
        </div>
    </header>
  );
}
export default Navbar
