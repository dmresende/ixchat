// src/app/chat/page.tsx
"use client";

import { useEffect } from "react";
import { io } from "socket.io-client";

const ChatPage = () => {
  useEffect(() => {
    const socket = io(); // Conecta ao servidor Socket.IO

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    return () => {
      socket.disconnect(); // Desconecta ao desmontar o componente
    };
  }, []);
};

export default ChatPage;
