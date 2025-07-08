import React from 'react';
import { FiVideo, FiPhoneCall, FiMoreVertical, FiX } from 'react-icons/fi';
import ChatInput from './ChatInput';

export default function GroupChatWindow({ chat, onClose }) {
  return (
    <div className="flex flex-col flex-1 bg-gradient-to-br from-white to-gray-50">
      {/* Header */}
<div className="flex items-center justify-between px-6 py-4 border-b bg-white shadow-sm">
  {/* Left Side: Exit + Profile + Name */}
  <div className="flex items-center gap-4">
    {/* Exit button */}
    <button
      onClick={onClose}
      title="Close Chat"
      className="text-gray-500 hover:text-red-500 transition"
    >
      <FiX className="w-5 h-5" />
    </button>

    {/* Profile & Name */}
    <div className="flex items-center gap-3">
      <img
        src={chat.avatar}
        alt={chat.name}
        className="w-10 h-10 rounded-full object-cover ring-2 ring-green-400"
      />
      <div>
        <h2 className="font-semibold text-lg text-gray-800">{chat.name}</h2>
        <p className="text-sm text-gray-500">{chat.members.join(', ')}</p>
      </div>
    </div>
  </div>
        <div className="flex gap-4 text-gray-500">
          <FiPhoneCall className="w-5 h-5 cursor-pointer hover:text-green-500 transition" />
          <FiVideo className="w-5 h-5 cursor-pointer hover:text-green-500 transition" />
          <FiMoreVertical className="w-5 h-5 cursor-pointer hover:text-green-500 transition" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 px-6 py-4 overflow-y-auto space-y-4">
        {chat.messages.map((msg, idx) => {
  const isUser = msg.sender === 'You';
  const senderInfo = chat.members.find((name) => name === msg.sender);
  const avatarUrl = senderInfo === 'You'
    ? 'https://i.pravatar.cc/100?u=you'
    : chat.avatarMap?.[msg.sender] || `https://ui-avatars.com/api/?name=${msg.sender}`;

  return (
    <div key={idx} className={`flex items-start ${isUser ? 'justify-end' : 'justify-start'} gap-2`}>
      {!isUser && (
        <img
          src={avatarUrl}
          alt={msg.sender}
          className="w-7 h-7 rounded-full object-cover ring-1 ring-gray-300 mt-1"
        />
      )}
      <div
        className={`max-w-xs p-3 rounded-lg text-sm shadow ${
          isUser
            ? 'bg-green-500 text-white rounded-br-none'
            : 'bg-white text-gray-900 rounded-bl-none'
        }`}
      >
        {!isUser && (
          <p className="text-xs font-semibold mb-1 text-gray-600">{msg.sender}</p>
        )}
        <p>{msg.text}</p>
        <div className="text-[10px] mt-1 text-right text-gray-500">{msg.time}</div>
      </div>
    </div>
  );
})}
      </div>

      {/* Input */}
      <ChatInput />
    </div>
  );
}
