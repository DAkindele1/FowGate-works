import { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatList from './components/ChatList';
import mockChats from './data/mockChats';
import ChatWindow from './components/ChatWindow';
import GroupChatWindow from './components/GroupChatWindow';

function App() {
  const [selectedChat, setSelectedChat] = useState(mockChats[0]);

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <Sidebar activeItem="messages" />

      {/* Chat List */}
      <ChatList
        chats={mockChats}
        selectedId={selectedChat?.id}
        onSelect={setSelectedChat}
      />

{selectedChat ? (
  selectedChat.members.length > 2 ? (
    <GroupChatWindow chat={selectedChat} onClose={() => setSelectedChat(null)} />
  ) : (
    <ChatWindow chat={selectedChat} onClose={() => setSelectedChat(null)} />
  )
) : (
  <div className="flex-1 flex items-center justify-center bg-white text-gray-400">
    Select a chat to begin
  </div>
)}

    </div>
  );
}

export default App;
