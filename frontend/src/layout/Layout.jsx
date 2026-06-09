import React from 'react';
import './style/layout.scss'
import { FaPaperPlane } from "react-icons/fa";
import {useAuth} from "../features/auth/hooks/useAuth.js"
import { useNavigate } from 'react-router-dom';

const Layout = ({children}) => {

    const navigate = useNavigate();
const{user, loading, handleLogout} = useAuth();

if(loading){
    return (<h1>Loading...........</h1>)
}
// console.log(user);

async function handleClick(){
    const data = await handleLogout();
    console.log(data);
    navigate("/login");
}

  return (
    <div className='app'>
      <nav className="navbar">
        <div className='logo-section'>
          <FaPaperPlane className='icon' />
          <h2 className="logo">JobFit</h2>
        </div>

        {user && (
        <div className="user-section">
            <span className="username">{user.username}</span>
            <button className="logout-btn" onClick={handleClick}>Logout</button>
        </div>
        )}
      </nav>

      
        {children}
      

      <footer className="footer">
        <p>© 2026 JobFitAI. All rights reserved.</p>

        <div className="footer-links">
          <a href="/#">Privacy Policy</a>
          <a href="/#">Terms</a>
          <a href="/#">Contact</a>
        </div>
      </footer>
    </div>
  );
};

export default Layout;