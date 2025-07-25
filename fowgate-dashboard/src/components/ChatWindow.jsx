import React, { useState, useRef, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import ChatInput from './ChatInput';
import CallIcon from '../assets/call.svg';
import MoreIcon from '../assets/more.svg';
import { handleUnavailableFeature } from '../utils/feature.js';
import { userChat, othersChat, otherschatTimestamp, userchatTimestamp } from '../styles/fonts';
import ChatInfoPanel from './ChatInfoPanel';
import MoreOptionsModal from './MoreOptionsModal';
import PinIcon from '../assets/pin.svg';
import UnpinIcon from '../assets/unpin.svg';
import InfoIcon from '../assets/info.svg';
import TrashIcon from '../assets/trashred.svg';
import noMessageIcon from '../assets/nomessage.svg';

export default function ChatWindow({ chat, onClose, onSendMessage, togglePinChat, onDeleteChat }) {
  const [showChatInfo, setShowChatInfo] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [chatToDelete, setChatToDelete] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const optionsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (optionsRef.current && !optionsRef.current.contains(e.target)) {
        setShowOptions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    <>
      {/* Main Chat Window */}
      <div className="flex flex-col h-[844px] bg-[#F6F8FC] rounded-md relative">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white relative">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              title="Close Chat"
              className="text-gray-500 hover:text-red-500 transition">
              <FiX className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setShowChatInfo(true)}>
              <img src={chat.avatar} alt={chat.name} className="w-10 h-10 rounded-full" />
              <div>
                <h2 className="font-semibold text-lg text-gray-800">{chat.name}</h2>
                <p className="text-sm text-gray-500">{chat.members.map(m => typeof m === 'string' ? m : m.name).join(', ')}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 text-gray-500 relative">
            <img
              src={CallIcon}
              alt="Call"
              onClick={handleUnavailableFeature}
              className="w-[24px] h-[24px] cursor-pointer hover:opacity-70 transition"
            />
            <img
              src={MoreIcon}
              alt="More"
              onClick={() => setShowOptions(!showOptions)}
              className="w-[24px] h-[24px] cursor-pointer hover:opacity-70 transition"
            />

            {/* Options Modal */}
           {showOptions && (
          <div
            ref={optionsRef}
            className="font-rubik absolute top-10 right-0 w-[136px] h-[136px] bg-white border border-gray-200 rounded-md z-50 flex flex-col items-start justify-start gap-1.5 px-2 py-2"
          >
            {/* Pin/Unpin */}
            <button
              onClick={() => {
                setShowOptions(false);
                togglePinChat?.(chat.id);
              }}
              className="h-[36px] w-full hover:bg-gray-100 rounded-md font-rubik font-normal text-[14px] leading-[1.4] text-[#292929] flex items-center justify-start gap-2 px-2"
            >
              <img src={chat.pinned ? UnpinIcon : PinIcon} alt="pin" className="w-4 h-4" />
              {chat.pinned ? 'Unpin Chat' : 'Pin Chat'}
            </button>

            {/* Show Chat or Group Info */}
            <button
              onClick={() => {
                setShowOptions(false);
                setShowChatInfo(true);
              }}
              className="h-[36px] w-full hover:bg-gray-100 rounded-md font-rubik font-normal text-[14px] leading-[1.4] text-[#292929] flex items-center justify-start gap-2 px-2"
            >
              <img src={InfoIcon} alt="info" className="w-4 h-4" />
              {chat.members.length > 2 ? 'Group Info' : 'Chat Info'}
            </button>

            {/* Delete Chat */}
            <button
              onClick={() => {
              setShowOptions(false);
              setChatToDelete(chat); // instead of deleting immediately
            }}
              className="h-[36px] w-full hover:bg-red-100 rounded-md font-rubik font-normal text-[14px] leading-[1.4] text-red-500 flex items-center justify-start gap-2 px-2"
            >
              <img src={TrashIcon} alt="trash" className="w-4 h-4" />
              Delete Chat
            </button>
          </div>
        )}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 px-6 py-4 overflow-y-auto space-y-4 relative">
  {chat.messages.length === 0 ? (
    <div className="absolute inset-0 flex items-center justify-center">
      <img src={noMessageIcon} alt="No messages" className="w-40 h-40 opacity-50" />
    </div>
  ) : (
    chat.messages.map((msg, idx) => {
      const isUser = msg.sender === 'You';
      return (
        <div key={idx} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
          <div
            className={`max-w-xs min-w-[160px] p-3 rounded-lg ${
              isUser
                ? 'bg-[#34A853] text-white rounded-br-none'
                : 'bg-white text-gray-900 rounded-bl-none'
            }`}
          >
            {msg.replyTo && (
              <div className="text-xs text-gray-600 italic mb-1 border-l-2 border-gray-100 pl-2">
                Replying to <strong>{msg.replyTo.sender}</strong>: {msg.replyTo.text.slice(0, 40)}…
              </div>
            )}
            <p style={{ ...(isUser ? userChat : othersChat), whiteSpace: 'pre-wrap' }}>{msg.text}</p>
            <div className="mt-1 text-right" style={isUser ? userchatTimestamp : otherschatTimestamp}>
              {msg.time}
            </div>
            <div
              className="text-xs text-gray-100 cursor-pointer mt-1"
              onClick={() => setReplyingTo(msg)}
            >
              Reply
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>

        {replyingTo && (
  <div className="px-6 py-2 bg-gray-100 border-t border-b border-gray-300">
    <div className="flex justify-between items-center">
      <div className="text-sm text-gray-700">
        Replying to <strong>{replyingTo.sender}</strong>: {replyingTo.text.slice(0, 50)}
      </div>
      <button onClick={() => setReplyingTo(null)} className="text-gray-500 hover:text-red-500">
        <FiX className="w-4 h-4" />
      </button>
    </div>
  </div>
)}

        {/* Chat Input */}
        <div className="px-6 py-4 bg-white">
          <ChatInput
          onSend={(text) => {
            onSendMessage(chat.id, text, replyingTo); // pass reply metadata
            setReplyingTo(null); // clear reply after sending
          }}
          replyingTo={replyingTo}
        />
        </div>
      </div>

      {/* Info Panel */}
      <ChatInfoPanel isOpen={showChatInfo} onClose={() => setShowChatInfo(false)} chat={chat} key={chat?.id} />
      
      {chatToDelete && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white rounded-lg p-6 w-[320px] shadow-xl text-center">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Delete Chat</h2>
      <p className="text-sm text-gray-600 mb-4">
        Are you sure you want to delete this chat with <strong>{chatToDelete.name}</strong>?
      </p>
      <div className="flex justify-end gap-3">
        <button
          onClick={() => setChatToDelete(null)}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            onDeleteChat?.(chatToDelete.id); // confirm deletion
            setChatToDelete(null);           // close modal
          }}
          className="px-4 py-2 bg-[#1B5FC1] text-white rounded hover:bg-[#1B5FC1]"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}
    </>
    
  );
}

