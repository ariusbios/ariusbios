import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#0F1115] px-6 text-white">
      <h1 className="mb-8 text-xl font-bold">Painel Arius Bios</h1>
      <LoginForm />
    </div>
  );
}
