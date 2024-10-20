"use client"; // Certifique-se de que o componente está no lado do cliente

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation'; // Importação correta para o useRouter na versão 13+
// import { useAuth } from '@/hooks/useAlth';
import { api } from '@/utils/api';
import toast from 'react-hot-toast';
import Link from 'next/link';

const SignUp = () => {
  const router = useRouter();
  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 10000);
  }
  // const { login } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const photo = 'https://i.pravatar.cc/300?u=a' + generateRandomNumber();
      // Envie os dados para a API
      const res = await api.post("/users/", { name, username, password, photo });

      if (res.status === 200 || res.status === 201 || res.status === 204) {
        toast.success("Cadastro realizado com sucesso!");
        router.push("/login");
      } else {
        toast.error(res.data.message);
      }

    } catch (error: any) {
      toast.error(error.response?.data?.message || "Erro ao cadastrar");
      console.error("Erro ao cadastrar:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-800 via-purple-700 to-pink-700">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">


        <h1 className="text-slate-700 text-2xl font-semibold mb-6">Sign Up</h1>
        <form className="flex flex-col w-full max-w-md space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="user" className="text-slate-500 mb-2 font-medium">Usuário</label>
            <input
              type="text"
              id="user"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite seu nome"
              className="text-black p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="username" className="text-slate-500 mb-2 font-medium">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Digite seu username"
              className="text-black p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-slate-500 mb-2 font-medium">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              className="text-black p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="p-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Cadastrar
          </button>
          <Link href="/login" className="p-2 justify-center text-center bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-300">Voltar</Link>

        </form>
      </div>
    </div >
  );
};

export default SignUp;
