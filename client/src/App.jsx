import { useEffect, useState } from "react";
import { io } from 'socket.io-client';
import Chat from "./pages/Chat/Index";
import SideBar from "./commons/Side/Index"

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:8888')
    setSocket(newSocket)
  }, []);

  return (
    <div className='p-5 h-screen bg-black relative w-full flex'>
      <SideBar />
      {socket && <Chat newSocket={socket} />}
    </div>
  );
}

export default App;