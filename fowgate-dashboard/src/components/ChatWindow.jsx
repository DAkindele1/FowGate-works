import React from 'react';
import { FiPhoneCall, FiVideo, FiMoreVertical, FiX } from 'react-icons/fi';
import ChatInput from './ChatInput';

export default function ChatWindow({ chat, onClose }) {
  if (!chat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white text-gray-400">
        Select a chat to begin
      </div>
    );
  }

  if (!chat) return null;
  return (
    <div className="flex flex-col flex-1 bg-gradient-to-br from-white to-gray-50">
  {/* Header */}
<div className="flex items-center justify-between px-6 py-4 border-b bg-white shadow-sm">
  {/* Left Side for exit and profile */}
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

  {/* Right Side for icons */}
  <div className="flex gap-4 text-gray-500">
    <FiPhoneCall className="w-5 h-5 cursor-pointer hover:text-green-500 transition" />
    <FiVideo className="w-5 h-5 cursor-pointer hover:text-green-500 transition" />
    <FiMoreVertical className="w-5 h-5 cursor-pointer hover:text-green-500 transition" />
  </div>
</div>

      {/* Messages */}
      <div className="flex-1 px-6 py-4 overflow-y-auto space-y-4">
        {chat.messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-xs p-3 rounded-lg text-sm shadow ${
                msg.sender === 'You'
                  ? 'bg-green-500 text-white rounded-br-none'
                  : 'bg-white text-gray-900 rounded-bl-none'
              }`}
            >
              <p>{msg.text}</p>
              <div className="text-[10px] mt-1 text-right text-gray-500">{msg.time}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <ChatInput />
    </div>
  );
}