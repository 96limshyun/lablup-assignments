import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import apiFetch from "@/services/fetch";
import { type Room } from "@/types";

const useRoomManagement = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<Room[]>([]);
  useEffect(() => {
    const fetchRooms = async () => {
      const rooms = await apiFetch("/rooms", "GET");
      setRooms(rooms);
    };
    fetchRooms();
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
