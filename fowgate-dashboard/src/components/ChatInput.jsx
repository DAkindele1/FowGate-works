import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi';

export default function ChatInput() {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim()) return;

    console.log('Sending message:', message);
    setMessage('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="border-t bg-white px-6 py-4 flex items-center gap-2">
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
      />
      <button
        onClick={handleSend}
        className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition"
      >
        <FiSend className="w-4 h-4" />
      </button>
    </div>
  );
}
