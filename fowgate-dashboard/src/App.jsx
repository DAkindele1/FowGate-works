import { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatList from './components/ChatList';
import mockChats from './data/mockChats';
import ChatWindow from './components/ChatWindow';
import GroupChatWindow from './components/GroupChatWindow';
import BellIcon from './assets/bell.svg';
import NotificationIcon from './assets/notification.svg';
import AccountIcon from './assets/acc.svg';
import BlankPage from './components/BlankPage';
import NewChatModal from './components/NewChatModal';

const handleUnavailableFeature = () => {
  alert('Sorry, this feature is currently unavailable');
};

function App() {
  const [selectedChat, setSelectedChat] = useState(mockChats[0]);
  const [chats, setChats] = useState(mockChats);
  const [currentPage, setCurrentPage] = useState('messages');
  const [showModal, setShowModal] = useState(false);


  const handleStartChat = (chatData) => {
  const { type, contacts, groupName, description, groupAvatar } = chatData;
  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const newChat = {
  id: Date.now().toString(),
  name: type === 'group' ? groupName : contacts[0].name,
  avatar: type === 'group'
    ? groupAvatar || '/default-group-avatar.jpg'
    : contacts[0].avatar,
  isOnline: type === 'individual' ? contacts[0].isOnline : true,
  pinned: false,
  messages: [],
  time: timestamp,
  lastMessage: '',
  members: contacts,
  ...(type === 'group' && { description: description }), // ✅ Only for groups
};

  

  setChats(prev => [newChat, ...prev]);
  setSelectedChat(newChat);
};

const handleSendMessage = (chatId, messageText) => {
  const newMessage = {
    id: Date.now().toString(),
    sender: 'You',
    text: messageText,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    status: 'delivered', // or 'sent', 'read'
  };

  setChats(prevChats =>
    prevChats.map(chat =>
      chat.id === chatId
        ? {
            ...chat,
            messages: [...chat.messages, newMessage],
            lastMessage: messageText,
            time: newMessage.time,
          }
        : chat
    )
  );
};

const handleTogglePin = (chatId) => {
  setChats(prevChats =>
    prevChats.map(chat =>
      chat.id === chatId ? { ...chat, pinned: !chat.pinned } : chat
    )
  );

  // Update selected chat if it's the one being pinned/unpinned
  if (selectedChat?.id === chatId) {
    setSelectedChat(prev => ({ ...prev, pinned: !prev.pinned }));
  }
};

const handleDeleteChat = (chatId) => {
  setChats(prevChats => prevChats.filter(chat => chat.id !== chatId));
  if (selectedChat?.id === chatId) {
    setSelectedChat(null);
  }
};

  return (
    <div className="bg-white p-[32px_30px] min-h-screen w-full box-border">
      <div className="flex gap-[32px] w-full h-full rounded-[12px]">
        {/* Sidebar */}
        <Sidebar activeItem={currentPage} setCurrentPage={setCurrentPage} />
        {/* Main Content */}
        <div className="flex flex-col gap-4 flex-1">
          {/* Top Feature Bar */}
          <div className="flex justify-between items-center h-[100px] border-b border-radius-[0.5px] border-gray-200">
            <h1
              className="text-[28px]"
              style={{
                fontFamily: 'Rubik',
                fontWeight: 500,
                fontStyle: 'normal',
                lineHeight: '130%',
                letterSpacing: '0px',
                color: '#292929',
              }}>
              {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}
            </h1>
            <div className="flex gap-6 items-center">
              <img src={BellIcon} alt="Bell" onClick={handleUnavailableFeature} className="w-[42px] h-[42px] cursor-pointer" />
              <img src={NotificationIcon} alt="Notification" onClick={handleUnavailableFeature} className="w-[42px] h-[42px] cursor-pointer" />
              <img src={AccountIcon} alt="Account" onClick={handleUnavailableFeature} className="w-[70px] h-[42px] cursor-pointer rounded-full" />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex gap-[32px] flex-1">
            {currentPage === 'messages' ? (
              <>
                <ChatList
                chats={chats}
                selectedId={selectedChat?.id}
                onSelect={setSelectedChat}
                onStartChat={handleStartChat} />
                <div className="flex-1 h-[872px]">
                  {selectedChat ? (
                    selectedChat.members.length > 2 ? (
                      <GroupChatWindow
                        chat={selectedChat}
                        onSendMessage={handleSendMessage}
                        onClose={() => setSelectedChat(null)}
                        togglePinChat={handleTogglePin}
                        onDeleteChat={handleDeleteChat}/>
                        
                    ) : (
                      <ChatWindow
                        chat={selectedChat}
                        onSendMessage={handleSendMessage}
                        onClose={() => setSelectedChat(null)}
                        togglePinChat={handleTogglePin}
                        onDeleteChat={handleDeleteChat}/>
                    )
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      Select a chat to begin
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex-1 h-[872px]">
                <BlankPage />
              </div>
            )}
          </div>
        </div>
      </div>
      {showModal && (
  <NewChatModal
    onClose={() => setShowModal(false)}
    onStartChat={handleStartChat}
  />
)}
    </div>
  );
}

export default App;
