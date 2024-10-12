import { registerRequest, loginrequest, verifyTokenRequest } from '@/api/auth';
import { createContext, useState, useContext, useEffect } from 'react'
import Cookies from 'js-cookie'

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth debe estar dentro de un provider")
    }
    return context;
}

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        if(errors.length > 0){
            const timer = setTimeout(()=>{
                setErrors([])
            }, 5000)

            return () => clearTimeout(timer);
        }
    }, [errors])

    useEffect(()=>{
      async function checkLogin () {
        const cookie =  Cookies.get('x-token')
      if(cookie){
        try{
            const res = await verifyTokenRequest(cookie)
            
            if(!res.data){
                setIsAuthenticated(false)
                setLoading(false)
                return;
            } 

            setIsAuthenticated(true)
            setUser(res.data)
            setLoading(false)
        } catch (error){
            setIsAuthenticated(false)
            setUser(null)
            setLoading(false)
        }
      }else{
        setLoading(false)
      }
      }

      checkLogin()
    },[])

    const singup = async (user) => {
        try {
            const res = await registerRequest(values)
            setUser(res.data);
            setIsAuthenticated(true)
        } catch (error) {
            setErrors(error.response.data)
            console.log(errors, error)
        }
    }

    const singin = async (user) => {
        try{
            const res = await loginrequest(user);
            setUser(res.data.usuario)
            setIsAuthenticated(true)
        }catch (error){
            setErrors(error.response.data.errors)
            console.log(error)
        }
    }


    return (
        <AuthContext.Provider value={{ singup, singin, user, isAuthenticated, errors, loading }}>
            {children}
        </AuthContext.Provider>
    )
}