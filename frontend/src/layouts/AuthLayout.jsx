import AuthHeader from "../components/layouts/AuthHeader";
import AuthFooter from "../components/layouts/AuthFooter";

export default function AuthLayout({ children }) {
  return (
    <div className="flex flex-col h-screen">
      <section className="flex-1"><AuthHeader/></section>
      <section className="flex items-center justify-center flex-5 ">
        {children}
      </section>
      <section className="flex-1"><AuthFooter/></section>
    </div>
  );
}
