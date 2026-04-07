import AuthLayout from "../layouts/AuthLayout";
import Input from "../components/ui/Input";
import Form from "../components/ui/Form.jsx";
import { registerUser } from "../services/handleUsers/postUser.js";
import useFetch from "../hooks/useFetch.js";
import useForm from "../hooks/useForm.js";

function Register() {
  // Custom Hook para validar campos de formulario
  function validateRegister(values) {
    const errors = {};
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
  const { values, errors, handleChange, validate } = useForm(
    { name: "", email: "", password: "" },
    validateRegister,
  );

  // Custom Hook para hacer peticiones
  const { request, loading, error } = useFetch();

  const handleSubmit = async () => {
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) return;

    const res = await request(() =>
      registerUser({ 
        username: values.name,
        email: values.email,
        password: values.password,
       }),
    );
    console.log(res);
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

            <Input variant="button" type="submit" />
          </div>
        </div>
      </Form>
    </AuthLayout>
  );
}

export default Register;
