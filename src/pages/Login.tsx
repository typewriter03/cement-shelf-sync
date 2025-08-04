import { LoginForm } from "@/components/LoginForm";

interface LoginProps {
  onLogin: (username: string, password: string) => void;
}

export default function Login({ onLogin }: LoginProps) {
  return <LoginForm onLogin={onLogin} />;
}