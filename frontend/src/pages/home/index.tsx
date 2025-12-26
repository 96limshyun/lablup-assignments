import { MainContainer, Text, Button, RoomListView } from "@components/index";
import { useState } from "react";
import { type Room } from "@/types";
import useSocketManagement from "@/hooks/useSocketManagerment";
import apiFetch from "@/services/fetch";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<Room[]>([]);

  useSocketManagement<Room[]>({
    endpoint: "/rooms",
    setData: setRooms,
    wsEndpoint: "ws://localhost:8000/ws/rooms",
    onMessage: (event) => {
      handleOnMessage(event);
    },
  });

  const handleOnMessage = (event: MessageEvent) => {
    const parsedData = JSON.parse(event.data);
    setRooms(parsedData.data);
  };

  const handleCreateRoom = async () => {
    const room = await apiFetch("/rooms", "POST");
    navigate(`/room/${room.id}`);
  };

  const handleJoinRoom = async (roomId: string) => {
    navigate(`/room/${roomId}`);
  };

  return (
    <MainContainer>
      <Text fontSize="4xl" bold={true}>
        Chat Room
      </Text>
      <Button size="md" onClick={handleCreateRoom}>
        Create Room
      </Button>

      <RoomListView rooms={rooms} handleJoinRoom={handleJoinRoom} />
    </MainContainer>
  );
};

export default Home;
