import AuthLayout from "../layouts/AuthLayout";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Form from "../components/ui/Form.jsx";
import Spinner from "../components/ui/Spinner.jsx";
import useForm from "../hooks/useForm.js";

function Login() {
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

  const handleSubmit = async () => {
    validate();
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
        {/* {loading && <Spinner />} */}
        {/* {error && <p>Error: {error.message}</p>} */}
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold text-center">Iniciar Sesion</h1>
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

            <Input variant="button" type="submit" />
          </div>
        </div>
      </Form>
    </AuthLayout>
  );
}

export default Login;
