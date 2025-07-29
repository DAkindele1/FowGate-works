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

const currentUser = { name: 'You', avatar: 'https://i.pravatar.cc/100?img=9', isOnline: true };

const handleUnavailableFeature = () => {
  alert('Sorry, this feature is currently unavailable');
};

function App() {
  const [selectedChat, setSelectedChat] = useState(mockChats[0]);
  const [chats, setChats] = useState(mockChats);
  const [currentPage, setCurrentPage] = useState('CLO Collaboration');
  const [showModal, setShowModal] = useState(false);
  const [showDeletedModal, setShowDeletedModal] = useState(false);

  const handleStartChat = (chatData) => {
    const { type, contacts, groupName, description, groupAvatar } = chatData;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newChat = {
      id: Date.now().toString(),
      name: type === 'group' ? groupName : contacts[0].name,
      avatar: type === 'group' ? groupAvatar || '/default-group-avatar.jpg' : contacts[0].avatar,
      isOnline: type === 'individual' ? contacts[0].isOnline : true,
      pinned: false,
      messages: [],
      time: timestamp,
      lastMessage: '',
      members: [currentUser, ...contacts],
      ...(type === 'group' && { description }),
    };

    setChats(prev => [newChat, ...prev]);
    setSelectedChat(newChat);
  };

  const handleSendMessage = (chatId, messageText, replyingTo) => {
    const newMessage = {
      id: Date.now().toString(),
      sender: 'You',
      text: messageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      replyTo: replyingTo ? {
      sender: replyingTo.sender,
      text: replyingTo.text,
    } : null,
      status: 'delivered',
    };

    setChats(prevChats => {
      const updatedChats = prevChats.map(chat =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [...chat.messages, newMessage],
              lastMessage: messageText,
              time: newMessage.time,
            }
          : chat
      );

      const updatedSelected = updatedChats.find(chat => chat.id === chatId);
      if (selectedChat?.id === chatId) {
        setSelectedChat(updatedSelected);
      }

      return updatedChats;
    });
  };

  const handleTogglePin = (chatId) => {
    setChats(prevChats => {
      const updatedChats = prevChats.map(chat =>
        chat.id === chatId ? { ...chat, pinned: !chat.pinned } : chat
      );

      if (selectedChat?.id === chatId) {
        const updatedSelectedChat = updatedChats.find(c => c.id === chatId);
        setSelectedChat(updatedSelectedChat);
      }

      return updatedChats;
    });
  };

const handleDeleteChat = (chatId) => {
  setChats(prevChats => prevChats.filter(chat => chat.id !== chatId));
  if (selectedChat?.id === chatId) {
    setSelectedChat(null);
  }
  setShowDeletedModal(true);
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
            {currentPage === 'CLO Collaboration' ? (
              <>
                <ChatList
                  chats={chats}
                  selectedId={selectedChat?.id}
                  onSelect={setSelectedChat}
                  onStartChat={handleStartChat}
                />
                <div className="flex-1 h-[872px]">
                  {selectedChat ? (
                    selectedChat.members.length > 2 ? (
                      <GroupChatWindow
                        chat={selectedChat}
                        onSendMessage={handleSendMessage}
                        onClose={() => setSelectedChat(null)}
                        togglePinChat={handleTogglePin}
                        onDeleteChat={handleDeleteChat}
                      />
                    ) : (
                      <ChatWindow
                        chat={selectedChat}
                        onSendMessage={handleSendMessage}
                        onClose={() => setSelectedChat(null)}
                        togglePinChat={handleTogglePin}
                        onDeleteChat={handleDeleteChat}
                      />
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
{showDeletedModal && (
  <div className="fixed inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded shadow-xl p-10 w-[440px] text-center animate-fade-in-up">
      {/* Success Icon */}
      <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      {/* Modal Content */}
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Chat Deleted!</h2>
      <p className="text-base text-gray-500">This chat has been permanently removed and can no longer be accessed by any participants.</p>

      {/* OK Button */}
      <button
        className="mt-8 bg-[#1B5FC1] text-white w-full py-3 rounded-md hover:bg-blue-700 transition"
        onClick={() => setShowDeletedModal(false)}
      >
        Okay
      </button>
    </div>
  </div>
)}
    </div>
  );
}

export default App;

