import AuthLayout from "../layouts/AuthLayout";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

function Login() {
  return (
    <AuthLayout>
      <Card size="md">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold text-center">Register</h1>
          <div className="flex flex-col gap-5 mt-5 w-full px-5">
            <Input placeholder="Nombre" type="name"/>
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Contraseña" />
            <Button>Register</Button>
          </div>
        </div>
      </Card>
    </AuthLayout>
  );
}

export default Login;
