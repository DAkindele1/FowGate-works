import React from 'react';
import { FiX } from 'react-icons/fi';
import ChatInput from './ChatInput';
import CallIcon from '../assets/call.svg';
import MoreIcon from '../assets/more.svg';
import { handleUnavailableFeature } from '../utils/feature.js';
import { userChat, othersChat, otherschatTimestamp, userchatTimestamp } from '../styles/fonts';

export default function ChatWindow({ chat, onClose, onSendMessage }) {
  if (!chat) {
    return (
      <div className="flex flex-col justify-end h-[512px] bg-gray-100">
        <div className="flex-1 flex items-center justify-center bg-white text-gray-400">
          Select a chat to begin
        </div>
      </div>
);
  }

  return (
    <div className="flex flex-col h-[844px] bg-[#F6F8FC] rounded-md shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            title="Close Chat"
            className="text-gray-500 hover:text-red-500 transition">
            <FiX className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <img src={chat.avatar} alt={chat.name} className="w-10 h-10 rounded-full" />
            <div>
              <h2 className="font-semibold text-lg text-gray-800">{chat.name}</h2>
              <p className="text-sm text-gray-500">{chat.members.join(', ')}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 text-gray-500">
          <img
            src={CallIcon}
            alt="Call"
            onClick={handleUnavailableFeature}
            className="w-[24px] h-[24px] cursor-pointer hover:opacity-70 transition"/>
          <img
            src={MoreIcon}
            alt="More"
            onClick={handleUnavailableFeature}
            className="w-[24px] h-[24px] cursor-pointer hover:opacity-70 transition"/>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 px-6 py-4 overflow-y-auto space-y-4">
        {chat.messages.map((msg, idx) => {
          const isUser = msg.sender === 'You';
          return (
            <div key={idx} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-xs p-3 rounded-lg ${
                  isUser
                    ? 'bg-[#34A853] text-white rounded-br-none'
                    : 'bg-white text-gray-900 rounded-bl-none'
                }`}>
                <p style={isUser ? userChat : othersChat}>{msg.text}</p>
                <div className="mt-1 text-right" style={isUser ? userchatTimestamp : otherschatTimestamp}>{msg.time}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chat Input */}
      <div className="px-6 py-4 bg-white">
        <ChatInput onSend={(text) => onSendMessage(chat.id, text)} />
      </div>
    </div>
  );
}
