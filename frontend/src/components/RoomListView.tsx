import { type Room } from "@/types";

interface RoomListViewProps {
  rooms: Room[];
  handleJoinRoom: (roomId: string) => void;
  userId: string;
  handleDeleteRoom: (roomId: string) => void;
}
const RoomListView = ({
  rooms,
  handleJoinRoom,
  userId,
  handleDeleteRoom,
}: RoomListViewProps) => {
  return (
    <div className="w-full flex flex-col gap-3 mt-4 max-h-[60vh] overflow-y-auto">
      {rooms.length === 0 ? (
        <div className="text-gray-500 text-center py-8">채팅방이 없습니다</div>
      ) : (
        rooms.map((room) => (
          <div
            key={room.id}
            onClick={() => handleJoinRoom(room.id)}
            className="flex justify-between items-center px-6 py-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-300 cursor-pointer transition-all shadow-sm"
          >
            <div>
              <div className="font-medium text-gray-800">{room.name}</div>
              <div className="text-gray-500 text-sm">
                {new Date(room.created_at).toLocaleString()}
              </div>
            </div>
            {userId === room.name && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteRoom(room.id);
                }}
                className="text-red-500 hover:text-red-700 cursor-pointer border border-red-500 rounded-md px-2 py-1"
              >
                delete
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default RoomListView;
