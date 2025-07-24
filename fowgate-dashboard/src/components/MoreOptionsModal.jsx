// components/MoreOptionsModal.jsx
import React from 'react';

export default function MoreOptionsModal({ isPinned, onClose, onPinToggle, onDelete }) {
  return (
    <div className="absolute right-6 top-16 z-50 bg-white shadow-md rounded-md w-48 border">
      <ul className="flex flex-col text-sm text-gray-700 font-medium">
        <li
          onClick={() => {
            onPinToggle();
            onClose();
          }}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
        >
          {isPinned ? 'Unpin Chat' : 'Pin Chat'}
        </li>
        <li
          onClick={() => {
            document.getElementById('chat-info-trigger').click();
            onClose();
          }}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
        >
          Chat Info
        </li>
        <li
          onClick={() => {
            if (confirm('Are you sure you want to delete this chat?')) {
              onDelete();
            }
            onClose();
          }}
          className="px-4 py-2 hover:bg-red-100 text-red-600 cursor-pointer"
        >
          Delete Chat
        </li>
      </ul>
    </div>
  );
}
