import { type ReactNode } from "react";
import { Button } from "./index";
import { type Message } from "@/types";

interface MessagePanelRootProps {
  children: ReactNode;
}

const MessagePanelRoot = ({ children }: MessagePanelRootProps) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4 flex flex-col gap-4">
      {children}
    </div>
  );
};

interface MessagePanelListProps {
  messages: Message[];
  emptyMessage?: string;
  userId: string;
}

const MessagePanelList = ({
  messages,
  emptyMessage = "메시지가 없습니다",
  userId,
}: MessagePanelListProps) => {
  return (
    <div className="h-96 overflow-y-auto border border-gray-200 rounded-lg p-4">
      {messages.length === 0 ? (
        <div className="text-md text-gray-500">{emptyMessage}</div>
      ) : (
        messages.map((msg) => (
          <MessagePanelItem key={msg.id} message={msg} userId={userId} />
        ))
      )}
    </div>
  );
};

interface MessagePanelItemProps {
  message: Message;
  userId: string;
}

const MessagePanelItem = ({ message, userId }: MessagePanelItemProps) => {
  const isMyMessage = message.user_id === userId;
  return (
    <div
      className={`mb-3 p-3 rounded-lg border flex flex-col max-w-md ${
        isMyMessage
          ? "ml-auto bg-blue-500 text-white border-blue-600"
          : "mr-auto bg-gray-50 text-gray-900 border-gray-100"
      }`}
    >
      <div className={`text-sm font-bold mb-1`}>
        {isMyMessage ? "You" : message.user_id}
      </div>
      <div className="text-md">{message.content}</div>
      <div
        className={`text-xs mt-1 ${
          isMyMessage ? "text-blue-100" : "text-gray-400"
        }`}
      >
        {new Date(message.created_at).toLocaleString()}
      </div>
    </div>
  );
};

interface MessagePanelInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  placeholder?: string;
  submitText?: string;
}

const MessagePanelInput = ({
  value,
  onChange,
  onSubmit,
  placeholder = "메시지를 입력하세요...",
  submitText = "Send",
}: MessagePanelInputProps) => {
  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <Button size="md" type="submit">
        {submitText}
      </Button>
    </form>
  );
};

export const MessagePanel = Object.assign(MessagePanelRoot, {
  List: MessagePanelList,
  Item: MessagePanelItem,
  Input: MessagePanelInput,
});
