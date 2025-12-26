import { MainContainer, Text, MessagePanel } from "@components/index";
import { useParams, useLocation } from "react-router-dom";
import { useState, useCallback } from "react";
import { type Message } from "@/types";
import useSocketManagement from "@/hooks/useSocketManagerment";
import apiFetch from "@/services/fetch";

const ChatRoom = () => {
  const { id } = useParams();
  const { userId } = useLocation().state as { userId: string };
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const handleOnMessage = useCallback((event: MessageEvent) => {
    const parsedData = JSON.parse(event.data);
    if (parsedData.type === "new_message") {
      setMessages((prev) => [...prev, parsedData.data]);
    }
  }, []);

  useSocketManagement<Message[]>({
    endpoint: `/chat_messages/${id}`,
    setData: setMessages,
    wsEndpoint: `ws://localhost:8000/ws/rooms/${id}`,
    onMessage: handleOnMessage,
  });

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim() || !id) return;

    await apiFetch("/chat_messages/", "POST", {
      room_id: id,
      user_id: userId,
      content: message,
    });
    setMessage("");
  };

  return (
    <MainContainer>
      <Text fontSize="4xl" bold={true}>
        Chat Room
      </Text>

      <MessagePanel>
        <MessagePanel.List messages={messages} userId={userId} />
        <MessagePanel.Input
          value={message}
          onChange={setMessage}
          onSubmit={sendMessage}
        />
      </MessagePanel>
    </MainContainer>
  );
};

export default ChatRoom;
