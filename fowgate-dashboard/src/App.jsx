import { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatList from './components/ChatList';
import mockChats from './data/mockChats';
import ChatWindow from './components/ChatWindow';
import GroupChatWindow from './components/GroupChatWindow';
import BellIcon from './assets/bell.svg';
import NotificationIcon from './assets/notification.svg';
import AccountIcon from './assets/acc.svg';

const handleUnavailableFeature = () => {
  alert('Sorry, this feature is currently unavailable');
};


function App() {
  const [selectedChat, setSelectedChat] = useState(mockChats[0]);

  return (
 <div className="bg-white p-[32px_30px] min-h-screen w-full box-border">
  <div className="flex gap-[32px] w-full h-full rounded-[12px]">
    {/* Sidebar */}
    <Sidebar activeItem="messages" />

    {/* Wrapper for ChatList + ChatWindow */}
    <div className="flex flex-col gap-4 flex-1">
      
      {/* 🔼 Top Feature Bar */}
<div className="flex justify-between items-center h-[100px] px-6 border-b border-radius-[0.5px] border-gray-200">
  {/* Left: Title */}
  <h1
    className="text-[28px]"
    style={{
      fontFamily: 'Rubik',
      fontWeight: 500,
      fontStyle: 'normal',
      lineHeight: '130%',
      letterSpacing: '0px',
      color: '#292929',
    }}
  >
    Messages
  </h1>

  {/* Right: SVG Icons */}
  <div className="flex gap-6 items-center">
    <img src={BellIcon} alt="Bell" onClick={handleUnavailableFeature} className="w-[42px] h-[42px] cursor-pointer" />
    <img src={NotificationIcon} alt="Notification" onClick={handleUnavailableFeature} className="w-[42px] h-[42px] cursor-pointer" />
    <img src={AccountIcon} alt="Account" onClick={handleUnavailableFeature} className="w-[70px] h-[42px] cursor-pointer rounded-full" />
  </div>
</div>

      {/* 💬 Main Chat Area */}
      <div className="flex gap-[32px] flex-1">
        {/* ChatList */}
        <div
          className="w-[350px] max-h-[844px] p-4 bg-white"
          style={{
            border: '0.5px solid #EAEAEA',
            borderRadius: '10px',
          }}
        >
          <ChatList
            chats={mockChats}
            selectedId={selectedChat?.id}
            onSelect={setSelectedChat}
          />
        </div>

        {/* ChatWindow */}
        <div className="flex-1 h-[872px]">
          {selectedChat ? (
            selectedChat.members.length > 2 ? (
              <GroupChatWindow
                chat={selectedChat}
                onClose={() => setSelectedChat(null)}
              />
            ) : (
              <ChatWindow
                chat={selectedChat}
                onClose={() => setSelectedChat(null)}
              />
            )
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              Select a chat to begin
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
</div>
  );
}

export default App;
