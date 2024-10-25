import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  TruckIcon,
  CubeTransparentIcon
} from "@heroicons/react/24/solid";
import { Home, PersonalComponent, Tables, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import { Publico } from "./pages/main/publico";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faSuitcaseMedical} from "@fortawesome/free-solid-svg-icons"
import Vehiculos from "./pages/dashboard/vehiculos";
import Recursos from "./pages/dashboard/recursos";
import { Despachos } from "./pages/dashboard/despachos";
const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "home",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Personal",
        path: "/profile",
        element: <PersonalComponent />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "estadisticas y reportes",
        path: "/tables",
        element: <Tables />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "registro de emergencias",
        path: "/notifications",
        element: <Notifications />,
      },
      {
        icon: <TruckIcon {...icon}/>,
        name: "Vehiculos",
        path: "/vehiculos",
        element: <Vehiculos />
      },
      {
        icon: <FontAwesomeIcon icon={faSuitcaseMedical} />,
        name: "Recursos",
        path: "/recursos",
        element: <Recursos />
      },
      {
        icon: <CubeTransparentIcon {...icon}/>,
        name: "Despachos",
        path: "/despachos",
        element: <Despachos />
      }
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
  {
    layout: "Main",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "publico",
        path: "/publico",
        element: <Publico />,
      }
    ]
  }
];

export default routes;
