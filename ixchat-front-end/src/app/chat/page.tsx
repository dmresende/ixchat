"use client";
import { useState, useRef, use, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAlth";
import toast from "react-hot-toast";
import { api } from '@/utils/api'
import { useRouter } from 'next/navigation';
interface UserTypes {
  id: number
  name: string
  username: string
  photo: string
}

const Chat = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const { logout, data } = useAuth();
  const [users, setUsers] = useState<UserTypes[]>([]);
  const [visibleUsersCount, setVisibleUsersCount] = useState(9); // Número inicial de usuários visíveis
  const router = useRouter();

  console.log('users: ', users)

  const handleLogout = () => {
    logout();
    router.push("/login");
    toast.success("Logout realizado com sucesso!");
  };

  const getDataUsers = async () => {
    try {
      const rest = await api.get("/users/");
      setUsers(rest.data);

    } catch (error) {
      console.error(error);
    }
  }

  const loadMoreUsers = () => {
    setVisibleUsersCount(prevCount => prevCount + 2);
  };

  useEffect(() => {
    getDataUsers()
  }, [])

  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  return (
    <div className=" flex justify-center items-center w-screen h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className='h-[70%] w-[70%] lg:w-[60%]  bg-background rounded-xl '>
        {/* Cabeçalho */}
        <div className="p-4 flex justify-between items-center bg-white border-b">
          <h1 className="text-xl font-bold text-gray-800">Mensagens</h1>
          <div className="flex items-center">
            <div className="text-right mr-4">
              <span className="block font-medium text-gray-800">{data?.user?.name}</span>
              <span className="text-sm text-gray-500">{data.user?.username}</span>
            </div>
            <div className="relative">
              <img
                src={data?.user?.photo}
                onClick={toggleMenu}
                alt="Foto de perfil"
                className="w-10 h-10 rounded-full cursor-pointer"
              />
              {menuVisible && (
                <div className="absolute left-full mt-2 w-48 bg-white rounded-lg shadow-lg z-10 transition-opacity duration-300 opacity-100">
                  <Link href="/" className="block px-4 py-2 text-black hover:bg-gray-100 transition">
                    x
                  </Link>
                  <a onClick={handleLogout} className="block px-4 py-2 text-red-500 hover:bg-gray-100 transition">
                    sair
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Corpo principal */}
        <div className="grid grid-cols-[250px_1fr] h-full">


          {/* Barra lateral de conversas */}
          <div className="bg-gray-100 p-4 border-r">
            {users?.length > 0 && users.map((user) => (
              <div key={user.id} className="mb-4">
                <div className="flex items-center p-2 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100">
                  <div className="w-12 h-12 rounded-full bg-yellow-500 mr-3"></div>
                  <div>
                    <h2 className="font-semibold text-gray-800">{user.name}</h2>
                  </div>
                </div>
              </div>
            ))}
            {/* {users.length > visibleUsersCount && ( // Verifica se há mais usuários para mostrar
              // <button
              //   onClick={loadMoreUsers}
              //   className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              // >
              //   Carregar mais
              // </button>
            )} */}
          </div>

          {/* Área do chat */}
          <div className="flex flex-col bg-gray-50">
            {/* Cabeçalho do chat */}
            <div className="p-4 flex items-center bg-white border-b">
              <div className="w-12 h-12 rounded-full bg-yellow-500 mr-3"></div>
              <div>
                <h2 className="font-semibold text-gray-800">Cláudia</h2>
                <span className="text-sm text-green-500">Online</span>
              </div>
            </div>

            {/* Mensagens */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-white">
              <div className="flex justify-start">
                <div className="bg-gray-200 p-3 rounded-lg max-w-[60%]">
                  <p className="text-gray-800">Oi, tudo bem?</p>
                  <span className="text-xs text-gray-500">Hoje, 08:30</span>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-blue-500 text-white p-3 rounded-lg max-w-[60%]">
                  <p>Sim e você?</p>
                  <span className="text-xs text-gray-200">Hoje, 08:31</span>
                </div>
              </div>
            </div>

            {/* Caixa de texto */}
            <div className="p-4 bg-gray-100 flex items-center">
              <input
                type="text"
                placeholder="Digite sua mensagem aqui"
                className="flex-1 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <button className="ml-3 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all">
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Chat;
