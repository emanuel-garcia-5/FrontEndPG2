import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { Publico } from "./pages/main/publico";
import ProtectedRoute from "./pages/ProtectedRoute";


function App() {
  return (
      <Routes>
      <Route path="/" element = {<Publico/>}/>
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/" replace />} />

      <Route element={<ProtectedRoute/>}>
      <Route path="/dashboard/*" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
