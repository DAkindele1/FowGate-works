import React from 'react';
import { FiPlus, FiSearch } from 'react-icons/fi';

export default function ChatList({ chats, onSelect, selectedId }) {
  return (
    <div className="w-[340px] border-r border-gray-200 p-4 overflow-y-auto bg-white shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Messages</h2>
         <button title="Start new chat"
           className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-blue-100 text-blue-800 text-sm font-medium hover:bg-blue-200 transition">
          <FiPlus className="w-4 h-4" />
          New Chat
        </button>
      </div>

      {/* Search Input */}
      <div className="relative mb-4">
        <FiSearch className="absolute top-2.5 left-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search name, group..."
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      {/* Chat Preview */}
      
      <div className="space-y-2">
        {chats.map((chat) => (
  <div
    key={chat.id}
    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
      chat.id === selectedId
        ? 'bg-[#E8EFF9] text-white'
        : 'hover:bg-gray-100'
    }`}
    onClick={() => onSelect(chat)}
  >
    {/* Profile picture */}
    <img
      src={chat.avatar}
      alt={chat.name}
      className="w-10 h-10 rounded-full object-cover ring-2 ring-green-400"
    />

    {/* Info section with timestamp aligned to right */}
    <div className="flex-1 flex justify-between items-start">
      {/* Left for name and message */}
      <div className="flex flex-col w-[calc(100%-3rem)]">
        <p className="font-medium text-sm text-gray-800 truncate w-[150px]">{chat.name}</p>
        <p className="text-xs text-gray-500 truncate w-[180px]">{chat.lastMessage || 'No message yet'}</p>
      </div>

      {/* Right for the time */}
      <span className="text-xs text-gray-400 whitespace-nowrap pl-2 self-start mt-0.5">
  {chat.time}
</span>

    </div>
  </div>
))}
      </div>
    </div>
  );
}
