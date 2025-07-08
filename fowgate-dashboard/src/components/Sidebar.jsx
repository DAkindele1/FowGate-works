import React from 'react';
import { FiUser, FiMessageSquare, FiGrid } from 'react-icons/fi';

export default function Sidebar() {
  return (
    <div className="w-64 bg-black text-white flex flex-col py-6 px-4">
      <h1 className="text-2xl font-bold mb-10 tracking-tight">Fowgate</h1>
      <div className="w-54 h-px bg-white/30 my-4" />

      <div className="flex-1">
        {/* GENERAL Section */}
        <div className="mb-6">
          <p className="text-gray-400 text-xs mb-2">GENERAL</p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 py-2 text-sm text-gray-300 hover:text-white transition cursor-pointer">
              <FiGrid /> Dashboard
            </li>
            <li className="flex items-center gap-2 py-2 text-sm text-gray-300 hover:text-white transition cursor-pointer">
              <FiUser /> My Account
            </li>
          </ul>
          <div className="w-54 h-px bg-white/30 my-4" />
        </div>

        {/* COLLABORATION Section */}
        <div>
          <p className="text-gray-400 text-xs mb-2">COLLABORATION</p>
          <ul>
            <li className="flex items-center gap-2 py-2 text-sm font-semibold text-white bg-green-600/80 rounded px-2 shadow">
              <FiMessageSquare /> Messages
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
