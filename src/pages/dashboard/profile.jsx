import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { loadPersonal, registerPersonal } from '@/api/cruds';
import { useAuth } from '@/context/AuthContext';


export const PersonalComponent = () => {const { register, handleSubmit, reset } = useForm();
const [personas, setPersonas] = useState([]);
const {token} = useAuth()

// Obtener la lista de personas desde el backend
useEffect(() => {
  const fetchPersonal = async () => {
    try {
      const response = await loadPersonal({headers: {'x-token': token}})
      setPersonas(response.data);
  
    }catch (err){
      console.log(err)
    }
  }
   fetchPersonal();
}, []);

// Manejar el envío del formulario para registrar una nueva persona
const onSubmit = async (data) => {
  try {
          const res = await registerPersonal( data, {headers: {'x-token': token}})
        
            setPersonas([...personas, res.data]); // Actualizar la lista con la nueva persona
            reset(); // Limpiar el formulario
        }
      catch(error){
            console.error('Error al crear la persona:', error);
        }
};

return (
    <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Registrar Nueva Persona</h1>

        {/* Formulario para registrar una nueva persona */}
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    {...register('Nombre', { required: true })}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Apellido</label>
                <input
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    {...register('Apellido', { required: true })}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Rol</label>
                <input
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    {...register('Rol', { required: true })}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                <input
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    {...register('Telefono', { required: true })}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Correo</label>
                <input
                    type="email"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    {...register('Correo', { required: true })}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Estado</label>
                <input
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    {...register('Estado', { required: true })}
                />
            </div>
            <button
                type="submit"
                className="md:col-span-2 bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600"
            >
                Registrar
            </button>
        </form>

        {/* Tabla de listado de personas */}
        <h2 className="text-xl font-bold mb-4">Listado de Personal</h2>
        <table className="min-w-full bg-white border border-gray-200">
            <thead>
                <tr>
                    <th className="px-4 py-2 border-b">Nombre</th>
                    <th className="px-4 py-2 border-b">Apellido</th>
                    <th className="px-4 py-2 border-b">Rol</th>
                    <th className="px-4 py-2 border-b">Teléfono</th>
                    <th className="px-4 py-2 border-b">Correo</th>
                    <th className="px-4 py-2 border-b">Estado</th>
                </tr>
            </thead>
            <tbody>
                {personas.map((persona) => (
                    <tr key={persona._id}>
                        <td className="px-4 py-2 border-b">{persona.Nombre}</td>
                        <td className="px-4 py-2 border-b">{persona.Apellido}</td>
                        <td className="px-4 py-2 border-b">{persona.Rol}</td>
                        <td className="px-4 py-2 border-b">{persona.Telefono}</td>
                        <td className="px-4 py-2 border-b">{persona.Correo}</td>
                        <td className="px-4 py-2 border-b">{persona.Estado}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
};

export default PersonalComponent;
