import { useParams } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import apiFetch from "@/services/fetch";
import { MainContainer, Text, Button } from "@components/index";

interface Message {
  id: string;
  room_id: string;
  user_id: string;
  content: string;
  created_at: string;
}

const ChatRoom = () => {
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

  return (
    <MainContainer>
      <Text fontSize="4xl" bold={true}>
        Chat Room
      </Text>

      <div className="w-full bg-white rounded-lg shadow-md p-4 flex flex-col gap-4">
        <div className="h-96 overflow-y-auto border border-gray-200 rounded-lg p-4">
          {messages.length === 0 ? (
            <Text fontSize="md" bold={false}>
              메시지가 없습니다
            </Text>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-100"
              >
                <Text fontSize="sm" bold={true}>
                  {msg.user_id}
                </Text>
                <Text fontSize="md" bold={false}>
                  {msg.content}
                </Text>
                <div className="text-xs text-gray-400 mt-1">
                  {new Date(msg.created_at).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>

        <form onSubmit={sendMessage} className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="메시지를 입력하세요..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button size="md" type="submit">
            Send
          </Button>
        </form>
      </div>
    </MainContainer>
  );
};

export default ChatRoom;
