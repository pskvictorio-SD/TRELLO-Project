import AuthLayout from "../layouts/AuthLayout";
import Input from "../components/ui/Input";
import Link from "../components/ui/Link.jsx";
import Form from "../components/ui/Form.jsx";
import Spinner from "../components/ui/Spinner.jsx";

import { registerUser } from "../services/auth.service.js";
import { createWorkspace } from "../services/workspace.service.js";
import useFetch from "../hooks/useFetch.js";
import useForm from "../hooks/useForm.js";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [res, setRes] = useState();
  const navigate = useNavigate();

  function validateRegister(values) {
    let errors = {};
    const onlyLetters = /[^a-zA-Z ]/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (values.name.length < 4) {
      errors.name = "El nombre debe tener al menos 4 caracteres";
    }
    if (values.name.match(onlyLetters)) {
      errors.name = "El nombre solo puede contener letras";
    }

    if (!emailRegex.test(values.email)) {
      errors.email = "El email ingresado no es valido";
    }

    if (values.password.length < 6) {
      errors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    return errors;
  }
  // Custom Hook para validar campos de formulario
  const { values, errors, handleChange, validate } = useForm(
    { name: "", email: "", password: "" },
    validateRegister,
  );

  // Custom Hook para hacer peticiones
  const { request, loading, error } = useFetch();

  const handleSubmit = async () => {
    const valitationErrors = validate();

    if (Object.keys(valitationErrors).length > 0) return;

    // guarda el usuario en la base de datos y devuelve un token
    const res = await request(() =>
      registerUser({
        username: values.name,
        email: values.email.toLowerCase(),
        password: values.password,
      }),
    );
    setRes(res);
    if (!res.ok) {
      return;
    }

    // Guarda el token en el localStorage
    localStorage.setItem("token", res.token);

    // Crear workspace para el usuario
    const workspaceRes = await request(() => {
      createWorkspace();
    });

    // redirect al workspace del usuario
    navigate("/workspace");
  };

  return (
    <AuthLayout>
      <div className="">
        {/* Dashed Grid */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, #e7e5e4 1px, transparent 1px),
              linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 0 0",
            maskImage: `
              repeating-linear-gradient(
                to right,
                black 0px,
                black 3px,
                transparent 3px,
                transparent 8px
              ),
              repeating-linear-gradient(
                to bottom,
                black 0px,
                black 3px,
                transparent 3px,
                transparent 8px
              )
            `,
            WebkitMaskImage: `
              repeating-linear-gradient(
                to right,
                black 0px,
                black 3px,
                transparent 3px,
                transparent 8px
              ),
              repeating-linear-gradient(
                to bottom,
                black 0px,
                black 3px,
                transparent 3px,
                transparent 8px
              )
            `,
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        />
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          size="lg"
          bg="white"
          className="p-6"
        >
          {loading && <Spinner />}
          {error && <p>Error: {error.message}</p>}
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold text-center">Register</h1>
            <div className="flex flex-col gap-5 mt-5 w-full px-5">
              <Input
                type="text"
                placeholder="Nombre"
                name="name"
                value={values.name}
                onChange={handleChange}
              />
              {errors.name && <p className="text-red-500">{errors.name}</p>}

              <Input
                type="text"
                name="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}

              <Input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={values.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password}</p>
              )}
              {res && !res.ok && <p className="text-red-500">{res.message}</p>}

              <Input variant="button" type="submit" />

              <Link to="/">¿Ya tienes una cuenta? Inicia Sesión</Link>
            </div>
          </div>
        </Form>
      </div>
    </AuthLayout>
  );
}

export default Register;
