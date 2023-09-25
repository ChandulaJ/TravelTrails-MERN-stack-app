import React,{useState} from 'react'
const AccountForm =()=>{
    const[username,setUsername]=useState('')
    const[password,setPassword]=useState('')
    const[email,setEmail]=useState('')
    const[address,setAddress]=useState('')
    const[occupation,setOccupation]=useState('')
    const[dateofbith,setDateofbirth]=useState('')
    const[error,setError]=useState(null)

    const handleSubmit = async(e)=>{
        e.preventDefault()

        const account = {username,password,email,address,occupation,dateofbith}
        const response = await fetch('/api/accounts',{
            method:'POST',
            body:JSON.stringify(account),
            headers:{'Content-Type':'application/json'}
        })
        
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }

        if(response.ok){
            setError(null)
            console.log('account added',json)
            setUsername('')
            setPassword('')
            setEmail('')
            setAddress('')
            setOccupation('')
            setDateofbirth('')
        }
      
    }

    return(
        <form className='create' onSubmit = {handleSubmit}>
            <h3>Create an account</h3>
            <label>Username</label>
            <input
            type='text'
            onChange={(e)=>setUsername(e.target.value)}
            value ={username}
            />  
   
<label>Password</label> 
            <input
            type='text'
            onChange={(e)=>setPassword(e.target.value)}
            value ={password}
            />

<label>Email</label>
            <input
            type='text'
            onChange={(e)=>setEmail(e.target.value)}
            value ={email}
            />  

<label>Address</label>
            <input
            type='text'
            onChange={(e)=>setAddress(e.target.value)}
            value ={address}
            />

<label>Occupation</label>
            <input
            type='text'
            onChange={(e)=>setOccupation(e.target.value)}
            value ={occupation}
            />  

<label>Date of birth</label>
            <input
            type='text'
            onChange={(e)=>setDateofbirth(e.target.value)}
            value ={dateofbith}
            />

<button>Create account</button>
{error && <div className="error">{error}</div>}
            </form>

    )
}


export default AccountForm
