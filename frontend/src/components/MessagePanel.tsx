import { type ReactNode } from "react";
import { Text, Button } from "./index";
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
}

const MessagePanelList = ({
  messages,
  emptyMessage = "메시지가 없습니다",
}: MessagePanelListProps) => {
  return (
    <div className="h-96 overflow-y-auto border border-gray-200 rounded-lg p-4">
      {messages.length === 0 ? (
        <Text fontSize="md" bold={false}>
          {emptyMessage}
        </Text>
      ) : (
        messages.map((msg) => <MessagePanelItem key={msg.id} message={msg} />)
      )}
    </div>
  );
};

interface MessagePanelItemProps {
  message: Message;
}

const MessagePanelItem = ({ message }: MessagePanelItemProps) => {
  return (
    <div className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
      <Text fontSize="sm" bold={true}>
        {message.user_id}
      </Text>
      <Text fontSize="md" bold={false}>
        {message.content}
      </Text>
      <div className="text-xs text-gray-400 mt-1">
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
