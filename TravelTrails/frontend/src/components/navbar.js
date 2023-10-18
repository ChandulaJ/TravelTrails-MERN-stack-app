import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { accounts } = useAuthContext()
  const { logout } = useLogout()
  const handleClick = () => {
    logout()
  }


  return (
    <header>
      <div className="header">
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
            {accounts && (
            <div>
              <span>{accounts.username}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!accounts && (
            <div>
           <Link to="/login">
              <button>Log in</button>
              </Link>
            </div>
          )}
            </nav>
        </div>
        </div>
    </header>
  );
}
export default Navbar
