import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import { Publico } from "./pages/main/publico";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "Dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "home",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "usuarios",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "estadisticas",
        path: "/tables",
        element: <Tables />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "registro de emergencias",
        path: "/notifications",
        element: <Notifications />,
      },
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
