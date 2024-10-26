import { loadRecurso, registerRecurso } from '@/api/cruds';
import { useAuth } from '@/context/AuthContext';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const Recursos = () => {
  const {token} = useAuth()
  const { register, handleSubmit, reset } = useForm();
  const [recursos, setRecursos] = useState([]);
  const [loading, setLoading] = useState(false);

  // Obtener la lista de recursos desde el backend
  useEffect(() => {
    const fetchRecursos = async () => {
      try {
        const res =await  loadRecurso({headers: {'x-token': token}})
       
        setRecursos(res.data);
      } catch (error) {
        console.error('Error al obtener los recursos:', error);
      }
    };

    fetchRecursos();
  }, []);

  // Función para registrar un nuevo recurso
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await registerRecurso(data, {headers: {'x-token': token}})

        setRecursos([...recursos, res.data]); // Actualizamos la lista de recursos
        reset(); // Limpiar el formulario

    } catch (error) {
      console.error('Error al registrar el recurso:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Lista de Recursos</h1>

      {/* Formulario para registrar un nuevo recurso */}
      <form onSubmit={handleSubmit(onSubmit)} className="mb-6 p-4 bg-gray-100 rounded-lg">
        <div className="mb-4">
          <label htmlFor="TipoRecurso" className="block text-sm font-medium text-gray-700">Tipo de Recurso</label>
          <input
            id="TipoRecurso"
            {...register('TipoRecurso', { required: true })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="Nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            id="Nombre"
            {...register('Nombre', { required: true })}
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
            <option value="Disponible">Disponible</option>
            <option value="Ocupado">Ocupado</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="Descripcion" className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            id="Descripcion"
            {...register('Descripcion', { required: true })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md"
          disabled={loading}
        >
          {loading ? 'Registrando...' : 'Registrar Recurso'}
        </button>
      </form>

      {/* Tabla de recursos */}
      <table className="min-w-full bg-white border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Tipo</th>
            <th className="border border-gray-300 px-4 py-2">Nombre</th>
            <th className="border border-gray-300 px-4 py-2">Estado</th>
            <th className="border border-gray-300 px-4 py-2">Descripción</th>
          </tr>
        </thead>
        <tbody>
          {recursos.map((recurso) => (
            <tr key={recurso._id}>
              <td className="border border-gray-300 px-4 py-2">{recurso.TipoRecurso}</td>
              <td className="border border-gray-300 px-4 py-2">{recurso.Nombre}</td>
              <td className="border border-gray-300 px-4 py-2">{recurso.Estado}</td>
              <td className="border border-gray-300 px-4 py-2">{recurso.Descripcion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recursos;
