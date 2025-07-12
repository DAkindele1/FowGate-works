import React from 'react';
import { FiX } from 'react-icons/fi';
import ChatInput from './ChatInput';
import CallIcon from '../assets/call.svg';
import MoreIcon from '../assets/more.svg';
import { handleUnavailableFeature } from '../utils/feature.js';
import { userChat, othersChat, userchatTimestamp, otherschatTimestamp, othersName } from '../styles/fonts';

export default function GroupChatWindow({ chat, onClose }) {
  return (
    <div className="flex flex-col h-[844px] bg-[#F6F8FC] rounded-md shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            title="Close Chat"
            className="text-gray-500 hover:text-red-500 transition"
          >
            <FiX className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <img
              src={chat.avatar}
              alt={chat.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h2 className="font-semibold text-lg text-gray-800">{chat.name}</h2>
              <p className="text-sm text-gray-500">{chat.members.join(', ')}</p>
            </div>
          </div>
        </div>

        {/* Right: Group Avatars + Icons */}
        <div className="flex items-center gap-4 text-gray-500">
          {/* Overlapping member avatars */}
          <div className="flex -space-x-2">
            {chat.members
              .filter((name) => name !== 'You')
              .map((member, idx) => {
                const avatar = chat.avatarMap?.[member];
                return (
                  <img
                    key={idx}
                    src={avatar || `https://ui-avatars.com/api/?name=${member}`}
                    alt={member}
                    title={member}
                    className="w-6 h-6 rounded-full border-2 border-white object-cover"
                  />
                );
              })}
          </div>

          {/* Action icons */}
          <img
            src={CallIcon}
            alt="Call"
            onClick={handleUnavailableFeature}
            className="w-[24px] h-[24px] cursor-pointer hover:opacity-70 transition"
          />
          <img
            src={MoreIcon}
            alt="More"
            onClick={handleUnavailableFeature}
            className="w-[24px] h-[24px] cursor-pointer hover:opacity-70 transition"
          />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 px-6 py-4 overflow-y-auto space-y-4 font-rubik text-[14px]">
        {chat.messages.map((msg, idx) => {
          const isUser = msg.sender === 'You';
          const avatarUrl = isUser
            ? 'https://i.pravatar.cc/100?u=you'
            : chat.avatar || `https://ui-avatars.com/api/?name=${msg.sender}`;

          return (
            <div
              key={idx}
              className={`flex items-start gap-2 ${
                isUser ? 'justify-end' : 'justify-start'
              }`}
            >
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
                    ? 'bg-[#34A853] text-white rounded-br-none'
                    : 'bg-white text-gray-900 rounded-bl-none'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  {!isUser ? (
                    <>
                      <span style={othersName}>{msg.sender}</span>
                      <span style={otherschatTimestamp}>{msg.time}</span>
                    </>
                  ) : (
                    <span className="ml-auto" style={userchatTimestamp}>
                    {msg.time}
                    </span>
                  )}
                </div>
                <p style={isUser ? userChat : othersChat}>{msg.text}</p>
              </div>

              {isUser && (
                <img
                  src={avatarUrl}
                  alt={msg.sender}
                  className="w-7 h-7 rounded-full object-cover ring-1 ring-gray-300 mt-1"
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Chat Input anchored at bottom */}
      <div className="px-6 py-4 bg-white">
        <ChatInput />
      </div>
    </div>
  );
}