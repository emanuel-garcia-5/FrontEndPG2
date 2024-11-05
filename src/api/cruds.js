import Vehiculos from "@/pages/dashboard/vehiculos";
import axios from "./axios";



export const registerEmergencia = (emergencia, headers) => axios.post('/emergencias',emergencia, headers);
export const loadEmergencias = headers => axios.get('/emergencias', headers);
export const registerEstadoEmergencia = (id, emergencia, headers) => axios.put(`/emergencias/${id}`,emergencia, headers);

export const registerVehiculo = ( vehiculo, headers ) => axios.post('/vehiculo', vehiculo, headers)
export const loadVehiculos = (headers) => axios.get('/vehiculo', headers)

export const registerRecurso = ( recurso, headers ) => axios.post('/recurso', recurso, headers)
export const loadRecurso= (headers) => axios.get('/recurso', headers)

export const registerPersonal = ( personal, headers ) => axios.post('/personal', personal, headers)
export const loadPersonal= (headers) => axios.get('/personal', headers)


export const registerDespacho = ( despacho, headers ) => axios.post('/despacho', despacho, headers)
export const loadDespachos= (headers) => axios.get('/despacho', headers)

export const infoPublica = () => axios.get('/emergencias/infopublica')