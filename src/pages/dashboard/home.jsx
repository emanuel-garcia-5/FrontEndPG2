import React from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import {
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
  statisticsCardsData,
  statisticsChartsData,
  projectsTableData,
  ordersOverviewData,
} from "@/data";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";

export function Home() {
  return (
    <div className="container mx-auto p-4 text-center">
    <h1 className="text-4xl font-bold mb-4">Bienvenido al Sistema de Registro de Emergencias</h1>
    <p className="text-lg text-gray-700">
      Este sistema está diseñado para ayudar a gestionar y registrar las emergencias atendidas por la estación de bomberos.
      Aquí podrás registrar, consultar y gestionar despachos, recursos, vehículos y mucho más.
    </p>
    <p className="text-lg text-gray-700 mt-4">
      ¡Gracias por formar parte de este esfuerzo para brindar un mejor servicio a la comunidad!
    </p>
  </div>
  );
}

export default Home;
