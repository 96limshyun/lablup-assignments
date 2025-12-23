import useRoomManagement from "./hooks/useRoomManagement";
import { MainContainer, Text, Button, RoomListView } from "@components/index";

const Home = () => {
  const { rooms, handleCreateRoom, handleJoinRoom } = useRoomManagement();

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
