import { useAuth } from '@/context/AuthContext'
import React from 'react'
import {Navigate, Outlet} from "react-router-dom"



const ProtectedRoute = () => {
    const {user, isAuthenticated, loading} = useAuth()

    console.log(loading, isAuthenticated)
    if(loading) return <h1>Cargando...</h1>
    if(!loading && !isAuthenticated)return <Navigate to='/' replace></Navigate>

  return (
    <Outlet></Outlet>
  )
}

export default ProtectedRoute