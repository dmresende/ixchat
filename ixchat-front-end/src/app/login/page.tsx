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
  const { login } = useAuth()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(username, password, router);
    // lógica para autenticação
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
                type="password"
                id="password"
                className="text-slate-700 block w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="**********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                    d="M12 12v2m0-2v2m0 0h4m-4 0h-4"
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