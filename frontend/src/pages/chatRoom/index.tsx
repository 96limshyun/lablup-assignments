import { MainContainer, Text, MessagePanel } from "@components/index";
import useChatManagement from "./hooks/useChatManagement";

const ChatRoom = () => {
  const { messages, sendMessage, message, setMessage } = useChatManagement();

  return (
    <MainContainer>
      <Text fontSize="4xl" bold={true}>
        Chat Room
      </Text>

      <MessagePanel>
        <MessagePanel.List messages={messages} />
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
