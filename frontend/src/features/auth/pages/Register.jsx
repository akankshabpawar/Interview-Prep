import React, { useState } from 'react'
import '../authForm.scss'
import { Link ,Navigate, useNavigate} from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Register = () => {
  const navigate = useNavigate();
  const{loading, handleRegister} = useAuth();

  const [username, setUsername]= useState("");
  const [email, setEmail]= useState("");
  const [password, setPassword]= useState("");

  const handleSubmit = async(e)=>{

    e.preventDefault();
    await handleRegister({username, email, password});
    navigate("/");

  }

  if(loading){
    return(<p> Loading.............</p>)
  }
  
  return (
    <main>
      <div className='form_container'>

        <h1> Register </h1>

        <form onSubmit={handleSubmit}>

          <div className="input_field">
            <label htmlFor="input"> Username</label>
            <input type="text" id="input" name="email" 
            placeholder='Enter Username'
            onChange={(e)=>setUsername(e.target.value)}/> 
          </div>

          <div className="input_field">
            <label htmlFor="input"> Email</label>
            <input type="text" id="input" name="email" 
            placeholder='Enter Email Address'
            onChange={(e)=>setEmail(e.target.value)}/> 
          </div>

          <div className="input_field">
            <label htmlFor="input"> Password</label>
            <input type="text" id="input" name='password' 
            placeholder='Enter Password'
            onChange={(e)=>setPassword(e.target.value)}/>  
          </div>

          <div className="btn">
            <button className='sub_btn
            '> Register </button>
          </div>

          <div className="navigate">
            Already have an Registered ? <Link to={"/login"}> Login </Link> here
          </div>
        </form>
        
      </div>
    </main>
  )
}

export default Register
