import React, { useState } from 'react';
import emojiIcon from '../assets/smile.svg';
import attachmentIcon from '../assets/attachments.svg';
import sendButtonIcon from '../assets/send_button.svg';


export default function ChatInput() {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim()) return;
    // send logic here
    setMessage('');
  };

  return (
    <div className="flex items-center px-4 py-3 bg-white border-t">
      {/* Message Bar (54px height) */}
      <div className="flex items-center h-[54px] flex-1 bg-gray-100 rounded-full px-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
        />

        {/* Emoji */}
        <button type="button" className="ml-2 w-5 h-5 hover:opacity-80 transition">
          <img src={emojiIcon} alt="Emoji" className="w-full h-full object-contain" />
        </button>

        {/* Attachment */}
        <button type="button" className="ml-2 w-5 h-5 hover:opacity-80 transition">
          <img src={attachmentIcon} alt="Attach" className="w-full h-full object-contain" />
        </button>
      </div>

      {/* Send Button (54x54 px) */}
      <button
        onClick={handleSend}
        className="ml-3 w-[54px] h-[54px] flex items-center justify-center hover:opacity-80 transition"
      >
        <img
          src={sendButtonIcon}
          alt="Send"
          className="w-full h-full object-contain"
        />
      </button>
    </div>
  );
}