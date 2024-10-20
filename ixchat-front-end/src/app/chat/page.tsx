"use client";
import { useState } from 'react';
import Link from 'next/link';

const Chat = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="text-black h-[80%] w-[80%] lg:w-[60%] bg-white rounded-xl shadow-lg">
        {/* Cabeçalho do chat */}
        <div className="p-4 flex justify-between items-center border-b">
          <h1 className="text-lg font-semibold">Mensagens</h1>
          <div className="flex items-center relative">
            <div className="flex flex-col text-right">
              <span className="font-medium">Maria</span>
              <span className="text-sm text-gray-500">maria@gmail.com</span>
            </div>
            <div
              className="w-8 h-8 rounded-full bg-gray-400 ml-2 cursor-pointer"
              onClick={toggleMenu}
            ></div>
            {menuVisible && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                <Link href="/" className="block px-4 py-2 text-black hover:bg-gray-100 transition">
                  Meus Dados
                </Link>
                <Link href="/login" className="block px-4 py-2 text-red-500 hover:bg-gray-100 transition">
                  Sair
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Corpo do chat */}
        <div className="grid grid-cols-[250px_1fr] h-full">
          {/* Lista de Conversas */}
          <div className="bg-gray-100 border-r p-4">
            {/* Conversas aqui */}
          </div>

          {/* Janela de Conversa */}
          <div className="flex flex-col h-full">
            {/* Cabeçalho da Conversa */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-yellow-300 mr-3"></div>
                <div>
                  <h2 className="text-lg font-semibold">Cláudia</h2>
                  <span className="text-sm text-green-500">Online</span>
                </div>
              </div>
            </div>

            {/* Corpo da Conversa */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              {/* Mensagens aqui */}
            </div>

            {/* Caixa de Mensagem */}
            <div className="p-5 flex justify-between items-center border-t bg-white border">
              <input
                type="text"
                placeholder="Digite sua mensagem aqui"
                className="flex-1 p-2 border rounded-lg outline-none"
              />
              <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg">Enviar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
