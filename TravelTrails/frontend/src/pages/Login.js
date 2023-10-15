import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import { Link } from "react-router-dom";


const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {login,error,isLoading} = useLogin()



  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(username, password)
    
  }
  
  return (
    <div className="login-container">
    <div className="form-container">
    <form className="login" onSubmit={handleSubmit} >
    <img src={"topImg.png"} alt="Top Image" className="topimage" /> 

      <input 
        type="text" 
        onChange={(e) => setUsername(e.target.value)} 
        value={username} 
        placeholder="Username"
        className="login-input"
      />
    
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
        placeholder="Password"
        className="login-input"
      />
      <div className="center-button">
      <button disabled={isLoading}>LOGIN</button>
      </div>

      <div className="separator">
        <div className="line"></div>
        <div className="or">OR</div>
        <div className="line"></div>
      </div>
   

      <div className="center-button">
      <Link to="/signup">
          <button className="signup-btn" disabled={isLoading}>SIGNUP</button>
        </Link>
      </div>
      
      {error && <div className="error">{error}</div>}
    </form>
    <img src="loginPicBottom.png" alt="Travel image" className="login-bottom-img" />
    
    </div>
    <div className="form-container">
    <img src="loginPic.png" alt="LoginImage" className="loginPic" />
    </div>
    </div>
   
    
  )
}

export default Login