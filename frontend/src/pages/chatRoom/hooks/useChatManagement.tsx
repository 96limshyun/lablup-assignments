import { useParams } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import apiFetch from "@/services/fetch";
import { type Message } from "@/types";

const useChatManagement = () => {
  const { id } = useParams();
  const socketRef = useRef<WebSocket | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const loadMessages = async () => {
      const data = await apiFetch(`/chat_messages/${id}`, "GET");
      setMessages(data);
    };
    loadMessages();

    const socket = new WebSocket(`ws://localhost:8000/ws/rooms/${id}`);
    socketRef.current = socket;

    socket.onmessage = (event: MessageEvent) => {
      const parsedData = JSON.parse(event.data);
      if (parsedData.type === "new_message") {
        setMessages((prev) => [...prev, parsedData.data]);
      }
    };

    return () => {
      socket.close();
      socketRef.current = null;
    };
  }, [id]);

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim() || !id) return;

    await apiFetch("/chat_messages/", "POST", {
      room_id: id,
      user_id: id,
      content: message,
    });
    setMessage("");
  };
  return {
    message,
    setMessage,
    messages,
    sendMessage,
  };
}

export default useChatManagement