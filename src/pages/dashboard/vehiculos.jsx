import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import {loadVehiculos, registerVehiculo} from "../../api/cruds"

import { useAuth } from "@/context/AuthContext";

const Vehiculos = () => {
    const {token} = useAuth()
    const { register, handleSubmit, reset } = useForm();
    const [vehiculos, setVehiculos] = useState([]);
    const [loading, setLoading] = useState(false);
    
    // Obtener la lista de vehículos desde el backend
    useEffect(() => {
      const fetchVehiculos = async () => {
        try {
          const response = await loadVehiculos({headers: {'x-token': token}}); // Cambia este endpoint según tu API
          
          setVehiculos(response.data);
        } catch (error) {
          console.error('Error al obtener los vehículos:', error);
        }
      };
  
      fetchVehiculos();
    }, []);
  
    // Función para registrar un nuevo vehículo
    const onSubmit = async (data) => {

        const nuevoVehiculo = {
            id: vehiculos.length + 1,
      ...data
        }
      setLoading(true);
      try {
        const response = await registerVehiculo(nuevoVehiculo, {headers: {'x-token': token}})
  
          setVehiculos([...vehiculos, response.data]); // Actualizamos la lista de vehículos
          reset(); // Limpiar el formulario

      } catch (error) {
        console.error('Error al registrar el vehículo:', error);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Lista de Vehículos</h1>
  
        {/* Formulario para registrar un nuevo vehículo */}
        <form onSubmit={handleSubmit(onSubmit)} className="mb-6 p-4 bg-gray-100 rounded-lg">
          <div className="mb-4">
            <label htmlFor="TipoVehiculo" className="block text-sm font-medium text-gray-700">Tipo de Vehiculo</label>
            <input
              id="TipoVehiculo"
              {...register('TipoVehiculo', { required: true })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="Matricula" className="block text-sm font-medium text-gray-700">Matricula</label>
            <input
              id="Matricula"
              {...register('Matricula', { required: true })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="Estado" className="block text-sm font-medium text-gray-700">Estado</label>
            <select
              id="Estado"
              {...register('Estado', { required: true })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            >
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="Capacidad" className="block text-sm font-medium text-gray-700">Capacidad</label>
            <textarea
              id="Capacidad"
              {...register('Capacidad', { required: true })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md"
            disabled={loading}
          >
            {loading ? 'Registrando...' : 'Registrar Vehículo'}
          </button>
        </form>
  
        {/* Tabla de vehículos */}
        <table className="min-w-full bg-white border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Tipo de Vehiculo</th>
              <th className="border border-gray-300 px-4 py-2">Matricula</th>
              <th className="border border-gray-300 px-4 py-2">Estado</th>
              <th className="border border-gray-300 px-4 py-2">Capacidad</th>
            </tr>
          </thead>
          <tbody>
            {vehiculos.map((vehiculo) => (
              <tr key={vehiculo._id}>
                <td className="border border-gray-300 px-4 py-2">{vehiculo.TipoVehiculo}</td>
                <td className="border border-gray-300 px-4 py-2">{vehiculo.Matricula}</td>
                <td className="border border-gray-300 px-4 py-2">{vehiculo.Estado}</td>
                <td className="border border-gray-300 px-4 py-2">{vehiculo.Capacidad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}

export default Vehiculos