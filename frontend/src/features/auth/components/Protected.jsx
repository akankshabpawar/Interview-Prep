import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Loading from '../../../layout/Loading'


const Protected = ({children}) => {
  

  const {user, loading} = useAuth();   

  if(loading){
    return (<Loading/>)
  }

  if(!user){
    return <Navigate to={'/login'}></Navigate>
  }

  return children;
}

export default Protected
