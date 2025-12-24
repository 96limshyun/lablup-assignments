import { MainContainer, Text, Button } from "@components/index";
import useChatManagement from "./hooks/useChatManagement";

const ChatRoom = () => {
  const { messages, sendMessage, message, setMessage } = useChatManagement();

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
