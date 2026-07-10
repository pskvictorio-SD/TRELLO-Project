import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Workspace from "./pages/Workspace.jsx";
import Boards from "./pages/Board.jsx";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./utils/protectedRoutes.jsx";

import { DataContextProvider } from "./contexts/dataContext.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <DataContextProvider>
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/workspace" element={<Workspace />} />
            <Route path="/boards" element={<Boards />} />
          </Route>
        </Routes>
      </DataContextProvider>
    </BrowserRouter>
  );
};

export default App;
