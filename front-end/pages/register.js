import AuthForm from "../components/AuthForm";

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <AuthForm mode="register" />
    </main>
  );
}
