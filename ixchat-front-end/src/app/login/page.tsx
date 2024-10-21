"use client";
import { useAuth } from "@/hooks/useAlth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [stayConnected, setStayConnected] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { login } = useAuth()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(username, password, router);
    // lógica para autenticação
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-800 via-purple-700 to-pink-700">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <h2 className="text-slate-700 text-2xl font-bold mb-6 text-center">Acesse sua conta</h2>
        <p className="text-gray-500 text-center mb-8">
          Insira suas credenciais para fazer login
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Usuário
            </label>
            <div className="relative mt-1">
              <input
                id="username"
                className="text-slate-700 block w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-indigo-400 focus:border-indigo-500"
                placeholder="usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 14l4 4m0 0l-4-4m4 4V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-6"
                  />
                </svg>
              </span>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="text-slate-700 block w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="**********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={togglePasswordVisibility}>
                {showPassword ? (
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                )}
              </span>
            </div>
          </div>
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="stayConnected"
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              checked={stayConnected}
              onChange={() => setStayConnected(!stayConnected)}
            />
            <label
              htmlFor="stayConnected"
              className="ml-2 block text-sm text-gray-900"
            >
              Continuar conectado
            </label>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center items-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Acessar <span className="ml-2">→</span>
          </button>
        </form>
        <div className="mt-6 text-center">
          <Link
            href="/sing-up"
            className="text-sm text-indigo-600 hover:underline"
          >
            Criar uma nova conta
          </Link>
        </div>
      </div>
    </div >
  );
}

export default Login;
