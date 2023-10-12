import {useState} from 'react';

const Signup = () => {  
    const[username,setUsername] = useState('')
    const[password,setPassword] = useState('')
    const[email,setEmail] = useState('')
    const[address,setAddress] = useState('')
    const[occupation,setOccupation] = useState('')
    const[dateofbith,setDateofbirth] = useState('')


    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log(username,password)
    }

    return(
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign up</h3>

            <label>Username:</label>
            <input 
            type="username" 
            onChange={(e) => setUsername(e.target.value)}
            value={username} 
            />

        <label>Password:</label>
            <input 
            type="password"  
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            />

            <label>Email:</label>
            <input 
            type="email"  
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            />

            <label>Address:</label>
            <input 
            type="address"  
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            />

            <label>Occupation:</label>
            <input 
            type="occupation"  
            onChange={(e) => setOccupation(e.target.value)}
            value={occupation}
            />

            <label>Date of Birth:</label>
            <input 
            type="dateofbith"  
            onChange={(e) => setDateofbirth(e.target.value)}
            value={dateofbith}
            />
            <button>Sign up</button>
        </form>

        
    )
}

export default Signup;