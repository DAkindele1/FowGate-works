import React from 'react';
import { FiPlus, FiSearch } from 'react-icons/fi';
import OnlineIcon from '../assets/online.svg';
import OfflineIcon from '../assets/offline.svg';
import DeliveredIcon from '../assets/delivered.svg';
import ReadIcon from '../assets/read.svg';
import PinnedIcon from '../assets/pinned.svg';
import AllIcon from '../assets/all.svg';
import { handleUnavailableFeature } from '../utils/feature.js';

export default function ChatList({ chats, onSelect, selectedId }) {
  const pinnedChats = chats.filter(chat => chat.pinned);
  const unpinnedChats = chats.filter(chat => !chat.pinned);

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
        className={`relative flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
          chat.id === selectedId ? 'bg-[#E8EFF9]' : 'hover:bg-gray-100'
        }`}
        onClick={() => onSelect(chat)}
      >
        {/* Avatar */}
        <div className="relative w-10 h-10 shrink-0">
          <img
            src={chat.avatar}
            alt={chat.name}
            className="w-full h-full rounded-full object-cover"
          />
          <img
            src={chat.isOnline ? OnlineIcon : OfflineIcon}
            alt={chat.isOnline ? 'Online' : 'Offline'}
            className="absolute bottom-0 right-0 w-3 h-3"
          />
        </div>

        {/* Info Section */}
        <div className="flex-1 flex justify-between items-start">
          <div className="flex flex-col w-[calc(100%-3rem)]">
            <p className="font-rubik font-medium text-[16px] leading-[140%] text-[#292929] truncate w-[150px]">
              {chat.name}
            </p>
            <p className="text-xs text-gray-500 truncate w-[180px]">
              {chat.lastMessage || 'No message yet'}
            </p>
          </div>
          <span className="text-xs text-gray-400 whitespace-nowrap pl-2 self-start mt-0.5">
            {chat.time}
          </span>
        </div>

        {/* Status icon */}
        {statusIcon && (
          <img
            src={statusIcon}
            alt={lastUserMsg.status}
            className="absolute bottom-2 right-[2px] w-4 h-4"
          />
        )}
      </div>
    );
  };

  return (
    <div className="w-[321px] h-[812px] border border-[#EAEAEA] rounded-[10px] p-4 bg-white overflow-y-auto shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Chats</h2>
        <button
          onClick={handleUnavailableFeature}
          title="Start new chat"
          className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-blue-100 text-blue-800 text-sm font-medium hover:bg-blue-200 transition">
          <FiPlus className="w-4 h-4" />
          New Chat
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <FiSearch className="absolute top-2.5 right-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search name, group..."
          className="w-full pl-4 pr-3 py-2 border border-gray-300 rounded-md text-[14px] leading-[160%] text-[#9D9D9D] focus:outline-none focus:ring-2 focus:ring-blue-400 font-light font-[Rubik]"
          style={{ letterSpacing: '0%', fontWeight: 300 }}
        />
      </div>

      {/* Pinned Section */}
{pinnedChats.length > 0 && (
  <div className="mb-[40px]">
    <img
      src={PinnedIcon}
      alt="Pinned"
      className="w-full h-[20px] object-contain mb-2"
    />
    <div className="space-y-2">{pinnedChats.map(renderChat)}</div>
  </div>
)}

      {/* All Messages Section */}
      <div>
        <div className="flex items-center gap-2 mb-2 mt-4">
          <img src={AllIcon} alt="All" className="w-[340px] h-[20px] object-contain mb-2"/>
        </div>
        <div className="space-y-2">{unpinnedChats.map(renderChat)}</div>
      </div>
    </div>
  );
}
