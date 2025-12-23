import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/home/index";
import ChatRoom from "@/pages/chatRoom/index";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  { path: "/room/:id", element: <ChatRoom /> },
]);

export default routes;
