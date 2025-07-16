import React, { useState } from 'react';
import { FiPlus, FiSearch } from 'react-icons/fi';
import OnlineIcon from '../assets/online.svg';
import OfflineIcon from '../assets/offline.svg';
import DeliveredIcon from '../assets/delivered.svg';
import ReadIcon from '../assets/read.svg';
import PinnedIcon from '../assets/pinned.svg';
import AllIcon from '../assets/all.svg';
import NewChatModal from './NewChatModal';
import { chatName, chatPreview, chatListTimestamp,chatsHeader } from '../styles/fonts';

export default function ChatList({ chats, onSelect, selectedId, onStartChat }) {
  const pinnedChats = chats.filter(chat => chat.pinned);
  const unpinnedChats = chats.filter(chat => !chat.pinned);

const [showModal, setShowModal] = useState(false);

const handleStartChat = (chatData) => {
  onStartChat(chatData); // calls App's handler
  setShowModal(false);
};;


  const renderChat = (chat) => {
    const lastUserMsg = [...chat.messages].reverse().find(m => m.sender === 'You');
    const statusIcon =
      lastUserMsg?.status === 'read'
        ? ReadIcon
        : lastUserMsg?.status === 'delivered'
        ? DeliveredIcon
        : null;

    return (
      <div
        key={chat.id}
        onClick={() => onSelect(chat)}
        className={`relative cursor-pointer transition-all ${
          chat.id === selectedId ? 'bg-[#E8EFF9]' : 'hover:bg-gray-100'}`}>
        <div className="flex items-center gap-3 px-4 py-3 relative">
          {/* Avatar */}
          <div className="relative w-10 h-10 shrink-0">
            <img
              src={chat.avatar}
              alt={chat.name}
              className="w-full h-full rounded-full object-cover"/>
            <img
              src={chat.isOnline ? OnlineIcon : OfflineIcon}
              alt={chat.isOnline ? 'Online' : 'Offline'}
              className="absolute bottom-0 right-0 w-3 h-3"/>
          </div>

          {/* Name and Message */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex justify-between items-center w-full">
              <p className="truncate" style={chatName}>
                {chat.name}
              </p>
              <span className="whitespace-nowrap pl-2 shrink-0" style={chatListTimestamp}>
                {chat.time}
              </span>
            </div>
            <div className="flex justify-between items-center w-full mt-1">
              <p className="truncate" style={chatPreview}>
                {chat.lastMessage || 'No message yet'}
              </p>
              {statusIcon && (
                <img
                  src={statusIcon}
                  alt={lastUserMsg.status}
                  className="w-4 h-4 ml-2 shrink-0"/>)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="w-[350px] max-h-[844px] pt-4 pb-4 bg-white overflow-y-auto"
      style={{
        border: '0.5px solid #EAEAEA',
        borderRadius: '10px',}}>
      {/* Header */}
      <div className="mb-4 pb-5 border-b border-gray-200 px-4">
        <div className="flex justify-between items-center h-[40px]">
          <h2 style={chatsHeader}>Chats</h2>
          <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-[#E8EFF9] text-[#1B5FC1] text-sm font-medium hover:bg-blue-200 transition"
      >
        <FiPlus className="w-4 h-4" />
        New Chat
      </button>

      {/* Modal */}
      {showModal && (
        <NewChatModal
          onClose={() => setShowModal(false)}
          onStartChat={handleStartChat}
        />
      )}
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4 px-4">
        <FiSearch className="absolute top-2.5 right-6 text-gray-400 " />
        <input
          type="text"
          placeholder="Search name, group..."
          className="w-full pl-4 pr-3 py-2 border border-gray-300 rounded-md text-[14px] leading-[160%] text-[#9D9D9D] focus:outline-none focus:ring-2 focus:ring-blue-400 font-light font-[Rubik]"
          style={{ letterSpacing: '0%', fontWeight: 300 }}/>
      </div>

      {/* Pinned Section */}
      {pinnedChats.length > 0 && (
        <div className="mb-[24px]">
          <img
            src={PinnedIcon}
            alt="Pinned"
            className="w-full h-[20px] object-contain mb-2 "/>
          <div className="space-y-2 mb-4">{pinnedChats.map(renderChat)}</div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-4 w-full px-4"/>
        </div>)}

      {/* All Messages Section */}
      <div>
        <div className="flex items-center gap-2 mb-2 mt-4">
          <img src={AllIcon} alt="All" className="w-[340px] h-[20px] object-contain mb-2" />
        </div>
        <div className="space-y-2">{unpinnedChats.map(renderChat)}</div>
      </div>
    </div>
  );
}
