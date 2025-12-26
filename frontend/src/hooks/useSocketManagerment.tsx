import { useRef, useEffect } from "react";
import apiFetch from "@/services/fetch";
import { clearUserId } from "@/utils/generateUserId";

interface useSocketManagementProps<T> {
  endpoint: string;
  setData: React.Dispatch<React.SetStateAction<T>>;
  wsEndpoint: string;
  onMessage: (event: MessageEvent) => void;
}

const useSocketManagement = <T,>({
  endpoint,
  setData,
  wsEndpoint,
  onMessage,
}: useSocketManagementProps<T>) => {
  const socketRef = useRef<WebSocket | null>(null);
  const onMessageRef = useRef(onMessage);
  const setDataRef = useRef(setData);

  useEffect(() => {
    onMessageRef.current = onMessage;
    setDataRef.current = setData;
  });

  useEffect(() => {
    const loadData = async () => {
      const data = await apiFetch(endpoint, "GET");
      setDataRef.current(data);
    };
    loadData();

    const socket = new WebSocket(wsEndpoint);
    socketRef.current = socket;

    socket.onmessage = (event) => {
      onMessageRef.current(event);
    };

    return () => {
      socket.close();
      socketRef.current = null;
      clearUserId();
    };
  }, [endpoint, wsEndpoint]);

  return null;
};

export default useSocketManagement;
