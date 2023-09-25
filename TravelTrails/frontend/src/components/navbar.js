import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
        <div className="container">
            <Link to="/">
           
            <img
                src="logo.png"
                alt="TravelTrails Logo"
                className="logo"
                width="556" 
                height="188" 
   
/>

            </Link> 
            
        </div>
    </header>
  );
}
export default Navbar
