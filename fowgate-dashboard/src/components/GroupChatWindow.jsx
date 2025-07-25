import React, { useState, useRef, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import ChatInput from './ChatInput';
import ChatInfoPanel from './ChatInfoPanel';
import CallIcon from '../assets/call.svg';
import MoreIcon from '../assets/more.svg';
import MoreOptionsModal from './MoreOptionsModal';
import PinIcon from '../assets/pin.svg';
import UnpinIcon from '../assets/unpin.svg';
import InfoIcon from '../assets/info.svg';
import TrashIcon from '../assets/trashred.svg';
import noMessageIcon from '../assets/nomessage.svg';
import Delete from '../assets/delete2.svg';
import {
  userChat,
  othersChat,
  userchatTimestamp,
  otherschatTimestamp,
  othersName
} from '../styles/fonts';

export default function GroupChatWindow({ chat, onClose, onSendMessage, togglePinChat, onDeleteChat  }) {
  const [showChatInfo, setShowChatInfo] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [chatToDelete, setChatToDelete] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const optionsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (optionsRef.current && !optionsRef.current.contains(e.target)) {
        setShowMoreOptions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
          className="flex flex-col h-[844px] relative overflow-hidden"
          style={{
            backgroundColor: '#F6F8FC',
            border: '0.5px solid #EAEAEA',
            borderRadius: '10px',
          }}
        >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => setShowChatInfo(true)}>
          <button
            title="Close Chat"
            className="text-gray-500 hover:text-red-500 transition"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            <FiX className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <img src={chat.avatar} alt={chat.name} className="w-10 h-10 rounded-full" />
            <div>
              <h2 className="font-semibold text-lg text-gray-800">{chat.name}</h2>
              <p className="text-sm text-gray-500">{chat.members.map(m => typeof m === 'string' ? m : m.name).join(', ')}</p>
            </div>
          </div>
        </div>

        {/* Right-side Icons */}
        <div className="relative flex items-center gap-4 text-gray-500">
          <img
            src={CallIcon}
            alt="Call"
            className="w-[24px] h-[24px] cursor-pointer hover:opacity-70 transition"
            onClick={() => alert('Call feature unavailable')}
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
                setChatToDelete(chat);
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
      <div className="flex-1 px-6 py-4 overflow-y-auto space-y-4 font-rubik text-[14px] relative">
        {chat.messages.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <img src={noMessageIcon} alt="No messages" className="w-60 h-60 opacity-50" />
          </div>
        ) : (
          chat.messages.map((msg, idx) => {
            const isUser = msg.sender === 'You';
            const avatarUrl = isUser
              ? 'https://i.pravatar.cc/100?u=you'
              : chat.avatar || `https://ui-avatars.com/api/?name=${msg.sender}`;

            return (
              <div key={idx} className={`flex items-start gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
                {!isUser && (
                  <img
                    src={avatarUrl}
                    alt={msg.sender}
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-gray-300 mt-1"
                  />
                )}
                <div
                  className={`max-w-xs min-w-[160px] p-3 rounded-lg text-sm relative group ${
                    isUser
                      ? 'bg-[#34A853] text-white rounded-br-none'
                      : 'bg-white text-gray-900 rounded-bl-none'
                  }`}
                >
                  {/* Replied message */}
                  {msg.replyTo && (
                    <div className="text-xs text-gray-600 italic mb-1 border-l-2 border-gray-100 pl-2">
                      Replying to <strong>{msg.replyTo.sender}</strong>: {msg.replyTo.text.slice(0, 40)}…
                    </div>
                  )}

                  {/* Header row with name and time */}
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

                  {/* Message Text */}
                  <p style={{ ...(isUser ? userChat : othersChat), whiteSpace: 'pre-wrap' }}>{msg.text}</p>

                  {/* Reply button on hover */}
                  <div
                    className="text-xs text-gray-700 cursor-pointer mt-1"
                    onClick={() => setReplyingTo(msg)}
                  >
                    Reply
                  </div>
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
          onSendMessage(chat.id, text, replyingTo);
          setReplyingTo(null);
        }}
        replyingTo={replyingTo}
        onCancelReply={() => setReplyingTo(null)}
      />
      </div>

      {/* Info Panel */}
      <ChatInfoPanel isOpen={showChatInfo} onClose={() => setShowChatInfo(false)} chat={chat} />
       
{chatToDelete && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="w-[400px] bg-white rounded-lg shadow-xl overflow-hidden">
      
      {/* Header */}
      <div className="bg-[#EB4335] text-white flex items-center gap-2 px-6 py-4">
        <img src={Delete} alt="Delete Icon" className="w-5 h-5" />
        <h2 className="text-base font-semibold">Delete</h2>
      </div>

      {/* Body */}
      <div className="px-6 py-5 text-center">
        <p className="text-gray-700 text-sm mb-4">
          Are you sure you want to delete this chat with{' '}
          <strong>{chatToDelete.name}</strong>? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => setChatToDelete(null)}
            className="px-4 py-2 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
          onClick={() => {
            onDeleteChat?.(chatToDelete.id);
            setChatToDelete(null);
          }}
          className="px-4 py-2 rounded-md"
          style={{ backgroundColor: '#FDECEB', color: '#EB4335' }}
          >
          Delete
          </button>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
}
