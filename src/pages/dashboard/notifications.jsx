import React, {useState, useEffect} from "react";
import { Button} from '@material-tailwind/react';
import {
  Card,
  CardBody,
  Dialog,
  CardFooter
} from "@material-tailwind/react";

import {useForm} from "react-hook-form"
import {loadEmergencias, registerEmergencia, registerEstadoEmergencia} from '../../api/cruds'
import { useAuth } from "@/context/AuthContext";
import {EmergenciasTable} from "@/widgets/componentes/emergenciasTable";


export function Notifications() {

  const { register, handleSubmit, reset } = useForm();
  const [emergencias, setEmergencias] = useState([]);
  const [tab, setTab] = useState('Pendiente');
  const {token} = useAuth()
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  
  useEffect(() => {
    const cargarEmergencias = async () => {
      try {
        const response = await loadEmergencias({ headers: {'x-token': token}}) // Endpoint de tu API
        
        setEmergencias(response.data); // Suponiendo que 'data' es un array de emergencias
      } catch (error) {
        console.error('Error al cargar emergencias:', error);
      }
    };

    cargarEmergencias();
  }, []);


  const actualizarEmergencia = (emergenciaActualizada) => {
    setEmergencias((emergenciasAnteriores) =>
      emergenciasAnteriores.map((emergencia) =>
        emergencia._id === emergenciaActualizada._id ? emergenciaActualizada : emergencia
      )
    );
  };

  
  const onUpdateEstadoEmergencia = async (id, estado) => {

   const res = await registerEstadoEmergencia(id, {Estado: estado}, { headers: {'x-token': token}})

   actualizarEmergencia(res.data)

  }
  const onSubmit = async (data) => {
    const nuevaEmergencia = {
      id: emergencias.length + 1,
      ...data,
      Estado: 'Pendiente',// Por defecto se agrega como Pendiente
    };

    const res = await registerEmergencia(nuevaEmergencia, { headers: {'x-token': token}})

    setEmergencias([...emergencias, res.data]);
    setOpen(false)
    reset();
  };


  // Filtrar emergencias por el estado de la pestaña actual
  const emergenciasFiltradas = emergencias.filter(e => e.Estado === tab);

  return (

    <div className="p-4">
    <h1 className="text-2xl font-bold mb-4">Gestión de Emergencias</h1>
    <div className="flex justify-end">
    <Button color="blue" variant="gradient" onClick={handleOpen}>Nueva Emergencia</Button>
    </div>
    {/* Pestañas para seleccionar el estado */}
    <div className="mb-4">
      {['Pendiente', 'En proceso', 'Resuelto', 'Cancelado'].map((estado) => (
        <button
          key={estado}
          className={`px-4 py-2 mr-2 border-b-4 ${tab === estado ? 'border-blue-500' : 'border-transparent'}`}
          onClick={() => setTab(estado)}
        >
          {estado}
        </button>
      ))}
    </div>

    {/* Lista de emergencias filtradas */}
    <div className="mb-4">
      {emergenciasFiltradas.length === 0 ? (
        <p>No hay emergencias en este estado.</p>
      ) : (<EmergenciasTable tableRows={emergenciasFiltradas} onUpdateEstado={onUpdateEstadoEmergencia}></EmergenciasTable>
        )}
    </div>
    <Dialog
        size="lg"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full">
          <CardBody className="flex flex-col gap-4">
            
            {/* Formulario para registrar una nueva emergencia */}
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Registrar nueva emergencia</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700">Tipo de Emergencia</label>
          <select {...register('TipoEmergencia')} className="w-full mt-2 p-2 border rounded" required>
            <option value="Incendio">Incendio</option>
            <option value="Accidente">Accidente</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Descripción</label>
          <textarea {...register('Descripcion')} className="w-full mt-2 p-2 border rounded" required />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Ubicación</label>
          <input {...register('Ubicacion')} className="w-full mt-2 p-2 border rounded" type="text" required />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Prioridad</label>
          <input {...register('Prioridad')} className="w-full mt-2 p-2 border rounded" type="number" min="1" max="5" required />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Reportado Por</label>
          <input {...register('ReportadoPor')} className="w-full mt-2 p-2 border rounded" type="text" required />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Registrar Emergencia
        </button>
      </form>
    </div>
          </CardBody>
          <CardFooter className="pt-0">
            <div>
              </div>  
          </CardFooter>
        </Card>
      </Dialog>
  </div>
  );
}

export default Notifications;
