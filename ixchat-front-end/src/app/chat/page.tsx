"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAlth";
import toast from "react-hot-toast";
import { api } from '@/utils/api'
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  name: string;
  photo: string;
  isOnline: boolean;
}

interface Message {
  id: number;
  content: string;
  timestamp: string;
  isSent: boolean;
}

const Chat = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const { logout, data } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const handleLogout = () => {
    logout();
    router.push("/login");
    toast.success("Logout realizado com sucesso!");
  };

  const getDataUsers = async () => {
    try {
      const response = await api.get("/users/");
      setUsers(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  }

  useEffect(() => {
    getDataUsers();
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const newMessageObj: Message = {
        id: messages.length + 1,
        content: newMessage,
        timestamp: new Date().toLocaleTimeString(),
        isSent: true
      };
      setMessages([...messages, newMessageObj]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className='h-[70%] w-[70%] lg:w-[60%] bg-background rounded-xl'>
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
                onClick={() => setMenuVisible(!menuVisible)}
                alt="Foto de perfil"
                className="w-10 h-10 rounded-full cursor-pointer"
              />
              {menuVisible && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                  <Link href="/" className="block px-4 py-2 text-black hover:bg-gray-100">
                    Chat
                  </Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100">
                    Sair
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Corpo principal */}
        <div className="grid grid-cols-[250px_1fr] h-[calc(100%-64px)]">
          {/* Lista de usuários */}
          <div className="bg-gray-100 p-4 border-r overflow-y-auto">
            {users.map((user) => (
              <div key={user.id} className="mb-4 p-2 bg-blue-50 rounded-lg hover:bg-blue-100">
                <div className="flex items-center">
                  <img src={user.photo} alt={user.name} className="w-10 h-10 rounded-full mr-3" />
                  <div>
                    <h2 className="font-semibold text-gray-800">{user.name}</h2>
                    <span className="text-sm text-gray-500">{user.isOnline ? "Online" : "Offline"}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Área de chat */}
          <div className="flex flex-col bg-gray-50">
            {/* Mensagens */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.isSent ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-3 rounded-lg max-w-[60%] ${message.isSent ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                    <p>{message.content}</p>
                    <span className="text-xs">{message.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Input de mensagem */}
            <div className="text-black p-4 bg-gray-100 flex items-center">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Digite sua mensagem"
                className="flex-1 p-3 border rounded-lg"
              />
              <button 
                onClick={handleSendMessage}
                className="ml-3 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
              >
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
