import AuthLayout from "../layouts/AuthLayout";
import Input from "../components/ui/Input";
import Link from "../components/ui/Link";
import Form from "../components/ui/Form.jsx";
import Spinner from "../components/ui/Spinner.jsx";
import useForm from "../hooks/useForm.js";
import useFetch from "../hooks/useFetch.js";
import { loginUser } from "../services/auth.service.js";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [res, setRes] = useState();
  const navigate = useNavigate();

  function validateLogin(values) {
    let errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(values.email)) {
      errors.email = "El email ingresado no es valido";
    }

    if (values.password.length < 6) {
      errors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    return errors;
  }
  // Custom Hook para validar campos de formulario
  const { values, errors, handleChange, validate, validateField } = useForm(
    { email: "", password: "" },
    validateLogin,
  );

  // Custom Hook para hacer peticiones
  const { request, loading, error } = useFetch();

  const handleSubmit = async () => {
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) return;

    const res = await request(() =>
      loginUser({
        email: values.email.toLowerCase(),
        password: values.password,
      }),
    );

    setRes(res);

    if (!res.ok) {
      return;
    }

    localStorage.setItem("token", res.token);
    navigate("/workspace");
  };

  return (
    <AuthLayout>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        size="lg"
        className="p-6"
      >
        {loading && <Spinner />}
        {error && <p>Error: {error.message}</p>}
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold text-center">Iniciar Sesión</h1>
          <div className="flex flex-col gap-5 mt-5 w-full px-5">
            <Input
              value={values.email}
              onChange={handleChange}
              type="email"
              placeholder="Email"
              name="email"
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}

            <Input
              value={values.password}
              onChange={handleChange}
              type="password"
              placeholder="Contraseña"
              name="password"
            />

            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}

            {res && !res.ok && <p className="text-red-500">{res.message}</p>}

            <Input variant="button" type="submit" />

            <Link to="/auth/register">¿No tienes cuenta? Registrate</Link>
          </div>
        </div>
      </Form>
    </AuthLayout>
  );
}

export default Login;
