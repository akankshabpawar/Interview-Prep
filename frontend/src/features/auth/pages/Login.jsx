import React,{useState} from 'react';
import '../authForm.scss'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth} from '../hooks/useAuth';



const Login = () => {
  const navigate = useNavigate();

  const {loading, handleLogin} = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) =>{
    e.preventDefault();
    await handleLogin({email, password});
    navigate("/");
  }

  if(loading){
    return(<p> Loading.............</p>)
  }

  return (
    <main>
      <div className='form_container'>

        <h1> Login </h1>

        <form onSubmit={handleSubmit}>
          <div className="input_field">
            <label htmlFor="input"> Email</label>
            <input type="text" id="input" name="email" 
            placeholder='Enter Email Address'
            onChange={(e)=> setEmail(e.target.value)}/> 
          </div>

          <div className="input_field">
            <label htmlFor="input"> Password</label>
            <input type="text" id="input" name='password' 
            placeholder='Enter Password'
            onChange={(e)=> setPassword(e.target.value)}/>  
          </div>

          <div className="btn">
            <button className='sub_btn
            '> Login </button>
          </div>

          <div className="navigate">
            Dont have an account ? <Link to={"/register"} >Register</Link> here
          </div>
        </form>
      </div>
    </main>
  )
}

export default Login
