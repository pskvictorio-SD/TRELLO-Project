import AuthLayout from "../layouts/AuthLayout";
import Input from "../components/ui/Input";
import Form from "../components/ui/Form.jsx";
import useValidateForm from "../hooks/useValidationForm.js";
import useFetch from "../hooks/useFetch.js";
import { useState } from "react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Custom Hook para validar campos de formulario
  const { data, validateName, validateEmail, validatePassword } =
    useValidateForm(name, email, password);
  // Custom hook para realizar peticiones a la API
  const {} = useFetch()

  const handleSubmit = () => {
    validateName();
    validateEmail();
    validatePassword();
  };

  return (
    <AuthLayout>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        size="lg"
      >
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold text-center">Register</h1>
          <div className="flex flex-col gap-5 mt-5 w-full px-5">
            <Input
              onChange={(e) => setName(e.target.value)}
              type="name"
              placeholder="Nombre"
            />
            <p className="text-red-400">
              {data.find((item) => item.field === "name")?.message}
            </p>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
            />
            <p className="text-red-400">
              {data.find((item) => item.field === "email")?.message}
            </p>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Contraseña"
            />
            <p className="text-red-400">
              {data.find((item) => item.field === "password")?.message}
            </p>
            <Input variant="button" type="submit" />
          </div>
        </div>
      </Form>
    </AuthLayout>
  );
}

export default Register;
