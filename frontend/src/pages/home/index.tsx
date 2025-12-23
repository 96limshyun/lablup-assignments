import useRoomManagement from "./hooks/useRoomManagement"

const Home = () => {
  const { rooms, handleCreateRoom, handleJoinRoom } = useRoomManagement()

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Home</h1>
      <button onClick={() => handleCreateRoom('test123')}>Create Room</button>
      <div className="flex flex-col items-center justify-center">
        {rooms.map((room) => (
          <div key={room.id} onClick={() => handleJoinRoom(room.id)}>{room.name}</div>
        ))}
      </div>
    </div>
  )
}

export default Home