import { Card, IconButton, Typography, Button, Tooltip } from "@material-tailwind/react";

import {useState} from "react"

import {CheckCircleIcon, XCircleIcon, UserGroupIcon, CubeTransparentIcon} from "@heroicons/react/24/solid";


 
const TABLE_HEAD = ["Tipo de Emergencias", "Descripcion", "Ubicacion", "Prioridad", "Reportado Por", ""];
 
 
export function EmergenciasTable({tableRows, onUpdateEstado}) {

    const [despachos, setDespachos] = useState([]);
    const [selectedDespacho, setSelectedDespacho] = useState('');

  return (
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableRows.map(({ _id, TipoEmergencia, Descripcion, Ubicacion, Prioridad, ReportadoPor, Estado}, index) => (
            <tr key={_id} className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {TipoEmergencia}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {Descripcion}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {Ubicacion}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {Prioridad}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {ReportadoPor}
                </Typography>
              </td>
              <td className="p-4 flex items-center gap-2">
              <label>Despacho:</label>
            <select value={selectedDespacho} onChange={e => setSelectedDespacho(e.target.value)}>
                <option value="">Selecciona un despacho</option>
                {despachos.map((despacho) => (
                    <option key={despacho._id} value={despacho._id}>
                        {despacho.FechaHoraDespacho} - {despacho.Estado}
                    </option>
                ))}
            </select>
                {Estado === 'Pendiente' ? (<>
                    <Typography>
                    <Tooltip content="Asignar recursos">
                        <Button variant="text"
                            color="light-blue"
                            className="hidden items-center gap-1 px-4 xl:flex normal-case">
                            <CubeTransparentIcon className="h-5 w-5 text-light-blue-500" />
                        </Button>
                        </Tooltip>
                    </Typography>
                    <Typography>
                    <Tooltip content="Asignar personas">
                        <Button variant="text"
                            color="brown"
                            className="hidden items-center gap-1 px-4 xl:flex normal-case">
                            <UserGroupIcon className="h-5 w-5 text-brown-500" />
                        </Button>
                        </Tooltip>
                    </Typography>
                    <Typography as="a" variant="small" color="blue-gray" className="font-medium">
                      <Tooltip content="Marcar como En Proceso">
                          <Button
                              variant="text"
                              color="blue-gray"
                              className="hidden items-center gap-1 px-4 xl:flex normal-case"
                              onClick={() => onUpdateEstado(_id, 'En proceso')}
                          >
                              <CheckCircleIcon className="h-5 w-5 text-light-green-500" />
                          </Button>
                          </Tooltip>
                      </Typography>
                </> ): <></>
                }
                {(Estado === 'En proceso') && <>
                    <Typography as="a" variant="small" color="blue-gray" className="font-medium">
                      <Tooltip content="Marcar como Resuelto">
                          <Button
                              variant="text"
                              color="blue-gray"
                              className="hidden items-center gap-1 px-4 xl:flex normal-case"
                              onClick={() => onUpdateEstado(_id, 'Resuelto')}
                          >
                              <CheckCircleIcon className="h-5 w-5 text-light-green-500" />
                          </Button>
                          </Tooltip>
                      </Typography>

                      <Typography as="a" variant="small" color="ligth-green" className="font-medium">
                      <Tooltip content="Marcar como Cancelado">
                          <Button
                              variant="text"
                              color="red"
                              className="hidden items-center gap-1 px-4 xl:flex normal-case"
                              onClick={() => onUpdateEstado(_id, 'Cancelado')}
                          >
                              <XCircleIcon className="h-5 w-5 text-red-500" />
                          </Button>
                          </Tooltip>
                      </Typography>
                </>}
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}