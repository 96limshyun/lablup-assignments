import { useParams } from "react-router-dom"

const ChatRoom = () => {
  const { id } = useParams()
  console.log(id)
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Chat Room</h1>
    </div>
  )
}

export default ChatRoom