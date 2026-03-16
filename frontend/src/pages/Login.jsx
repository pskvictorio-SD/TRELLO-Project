import AuthLayout from "../layouts/AuthLayout";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

function Login() {
  return (
    <AuthLayout>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <div className="flex flex-col gap-5 mt-5">
          <Input.InputEmail placeholder="Email" />
          <Input.InputPassword placeholder="Password" />
          <Button.BtnPrimary>Login</Button.BtnPrimary>
        </div>
      </div>
    </AuthLayout>
  );
}

export default Login;