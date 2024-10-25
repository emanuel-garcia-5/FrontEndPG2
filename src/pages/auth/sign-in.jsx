import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useAuth} from "../../context/AuthContext"
import {useForm} from "react-hook-form"



export function SignIn() {

  const {register, handleSubmit} = useForm();

  const {singin,  isAuthenticated, errors: singErrors} = useAuth();

  const onSubmit = handleSubmit((data) => {
    singin(data)
  })



const navigate = useNavigate()

  useEffect(()=>{
    if(isAuthenticated) navigate("/dashboard/home")
  },[isAuthenticated])

  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Ingresa tu correo y tu contraseña para iniciar sesion.</Typography>
        </div>
        
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={onSubmit}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Correo
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
             
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register("correo",{required: true})}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Contraseña
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
             
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register("password", {required: true})}
            />
          </div>
          <div className="flex justify-center items-center">
          {singErrors.map((error, i)=>(
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" key={i} role="alert">
              {error.msg}
            </div>
          ))}
        </div>
          <Button className="mt-6" fullWidth type="submit">
            Sign In
          </Button>
        </form>
      </div>
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>

    </section>
  );
}

export default SignIn;
