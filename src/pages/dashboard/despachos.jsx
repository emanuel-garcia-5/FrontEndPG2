import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { loadDespachos, loadPersonal, loadRecurso, loadVehiculos, registerDespacho } from '@/api/cruds';

export const Despachos = () => {
  const {token} = useAuth()

    const { register, handleSubmit, reset } = useForm();
    const [despachos, setDespachos] = useState([]);
    const [vehiculos, setVehiculos] = useState([]);
    const [recursos, setRecursos] = useState([]);
    const [personal, setPersonal] = useState([]);

    // Cargar datos de Vehiculos, Recursos y Personal al montar el componente
    useEffect(() => {
        const fetchData = async () => {
            const vehiculosResponse = await loadVehiculos({headers: {'x-token': token}});
            const recursosResponse = await loadRecurso({headers: {'x-token': token}})
            const personalResponse = await loadPersonal({headers: {'x-token': token}})

            setVehiculos(vehiculosResponse.data);
            setRecursos(recursosResponse.data);
            setPersonal(personalResponse.data);
        };
        fetchData();
        fetchDespachos();
    }, []);

    // Función para obtener despachos
    const fetchDespachos = async () => {
        const response = await loadDespachos({headers: {'x-token': token}});
        setDespachos(response.data);
    };

    // Función para registrar un nuevo despacho
    const onSubmit = async (data) => {
        try {
            await registerDespacho(data, {headers: {'x-token': token}})
            fetchDespachos(); // Actualiza la lista de despachos
            reset(); // Resetea el formulario después de enviar
        } catch (error) {
            console.error('Error al registrar el despacho', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Registrar Despacho</h1>

            {/* Formulario para registrar un nuevo despacho */}
            <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Estado</label>
                    <select {...register('estado')} className="w-full p-2 border border-gray-300 rounded">
                        <option value="PENDIENTE">PENDIENTE</option>
                        <option value="EN_CAMINO">EN_CAMINO</option>
                        <option value="FINALIZADO">FINALIZADO</option>
                        <option value="CANCELADO">CANCELADO</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Vehículos Asignados</label>
                    <select {...register('VehiculosAsignados')} className="w-full p-2 border border-gray-300 rounded" multiple>
                        {vehiculos.map(vehiculo => (
                            <option key={vehiculo._id} value={vehiculo._id}>{vehiculo.TipoVehiculo} - {vehiculo.Matricula}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Recursos</label>
                    <select {...register('Recursos')} className="w-full p-2 border border-gray-300 rounded" multiple>
                        {recursos.map(recurso => (
                            <option key={recurso._id} value={recurso._id}>{recurso.TipoRecurso} - {recurso.Nombre}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Personal</label>
                    <select {...register('Personal')} className="w-full p-2 border border-gray-300 rounded" multiple>
                        {personal.map(p => (
                            <option key={p._id} value={p._id}>{p.Nombre} {p.Apellido} - {p.Rol}</option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Registrar Despacho</button>
            </form>

            {/* Tabla para listar los despachos registrados */}
            <h2 className="text-xl font-bold mb-4">Lista de Despachos</h2>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b">Fecha y Hora</th>
                        <th className="py-2 px-4 border-b">Estado</th>
                        <th className="py-2 px-4 border-b">Vehículos</th>
                        <th className="py-2 px-4 border-b">Recursos</th>
                        <th className="py-2 px-4 border-b">Personal</th>
                    </tr>
                </thead>
                <tbody>
                    {despachos.map((despacho) => (
                        <tr key={despacho._id}>
                            <td className="py-2 px-4 border-b">{despacho.despachoID}</td>
                            <td className="py-2 px-4 border-b">{new Date(despacho.fechaHoraDespacho).toLocaleString()}</td>
                            <td className="py-2 px-4 border-b">{despacho.estado}</td>
                            <td className="py-2 px-4 border-b">
                                {despacho.VehiculosAsignados.map(id => {
                                    const vehiculo = vehiculos.find(v => v._id === id);
                                    return vehiculo ? `${vehiculo.TipoVehiculo} - ${vehiculo.Matricula}, ` : '';
                                })}
                            </td>
                            <td className="py-2 px-4 border-b">
                                {despacho.Recursos.map(id => {
                                    const recurso = recursos.find(r => r._id === id);
                                    return recurso ? `${recurso.TipoRecurso} - ${recurso.Nombre}, ` : '';
                                })}
                            </td>
                            <td className="py-2 px-4 border-b">
                                {despacho.Personal.map(id => {
                                    const persona = personal.find(p => p._id === id);
                                    return persona ? `${persona.Nombre} ${persona.Apellido}, ` : '';
                                })}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Despachos;
