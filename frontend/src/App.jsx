import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ComponentsUi from "./components/ui/ComponentsUi.jsx";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<ComponentsUi />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App