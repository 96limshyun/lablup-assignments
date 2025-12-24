import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import apiFetch from "@/services/fetch";
import { type Room } from "@/types";

const useRoomManagement = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<Room[]>([]);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      const rooms = await apiFetch("/rooms", "GET");
      setRooms(rooms);
    };

    fetchRooms();

    const socket = new WebSocket("ws://localhost:8000/ws/rooms");
    socketRef.current = socket;

    socket.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);
      setRooms(parsedData.data);
    };

    return () => {
      socket.close();
      socketRef.current = null;
    };
  }, []);

  const handleCreateRoom = async () => {
    const room = await apiFetch("/rooms", "POST");
    navigate(`/room/${room.id}`);
  };

  const handleJoinRoom = async (roomId: string) => {
    navigate(`/room/${roomId}`);
  };
  return {
    rooms,
    handleCreateRoom,
    handleJoinRoom,
  };
};

export default useRoomManagement;
