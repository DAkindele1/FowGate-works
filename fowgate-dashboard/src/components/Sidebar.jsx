import React from 'react';
import { FiUser, FiMessageSquare } from 'react-icons/fi';
import DashboardIcon from './DashboardIcon';
import FowgateSymbol from '../assets/fowgate_symbol.png';
import UserIcon from '../assets/user.png';

export default function Sidebar() {
  return (
    <div className="overflow-hidden rounded-tl-[10px] rounded-bl-[10px] relative w-[250px] h-[960px] bg-gradient-to-br from-[#292929] to-[#111111] bg-[linear-gradient(86.17707255448016deg, #292929 0.00%, #111111 99.99%)]">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="mt-8 ml-8 mb-6">
          <img
            src={FowgateSymbol}
            alt="Fowgate Logo"
            className="w-24 h-8 object-contain"
          />
        </div>

        {/* Divider */}
        <div className="w-[80%] h-px bg-white/30 ml-8 mb-4" />

        {/* GENERAL Section */}
        <div className="ml-8 relative">
          <small className="font-rubik font-medium text-[14px] leading-[140%] tracking-[0.05em] text-gray-400 mb-2 block">
            GENERAL
          </small>
          <ul className="space-y-2">
            {/* Dashboard */}
            <li className="flex items-center gap-2 py-2 cursor-pointer group relative">
              <DashboardIcon className="w-[20px] h-[20px] text-[#9d9d9d] group-hover:text-white" />
              <span className="text-[#9d9d9d] text-sm font-normal group-hover:text-white">
                Dashboard
              </span>
            </li>
            {/* My Account */}
            <li className="flex items-center gap-2 py-2 cursor-pointer group relative">
              <img
                src={UserIcon}
                alt="User"
                className="w-[20px] h-[20px] object-contain"
              />
              <span className="text-gray-300 text-sm font-normal group-hover:text-white">
                My Account
              </span>
            </li>
          </ul>
        </div>

        {/* Divider */}
        <div className="w-[80%] h-px bg-white/30 ml-8 my-4" />

        {/* COLLABORATION Section */}
        <div className="ml-8 relative">
          <small className="font-rubik font-medium text-[14px] leading-[140%] tracking-[0.05em] text-gray-400 mb-2 block">
            COLLABORATION
          </small>
          <ul className="space-y-2">
            {/* Messages */}
            <li className="flex items-center gap-2 py-2 cursor-pointer group relative">
              <FiMessageSquare className="w-[20px] h-[20px] text-gray-300 group-hover:text-white" />
              <span className="text-gray-300 text-sm font-normal group-hover:text-white">
                Messages
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}