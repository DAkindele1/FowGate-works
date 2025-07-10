import React from 'react';
import { FiMessageSquare } from 'react-icons/fi';
import DashboardIcon from './DashboardIcon';
import FowgateSymbol from '../assets/fowgate_symbol.png';
import UserIcon from '../assets/user.png';

export default function Sidebar({ activeItem = "dashboard" }) {
  return (
    <div className="w-[250px] h-[960px] overflow-hidden rounded-tl-[10px] rounded-bl-[10px] bg-gradient-to-br from-[#292929] to-[#111111]">
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
            <li className="relative cursor-pointer group w-full">
              {activeItem === "dashboard" && (
                <>
                  <div className="absolute inset-0 bg-[#BDBDBD] z-0" />
                  <div className="absolute top-0 left-0 h-full w-1 bg-white z-10" />
                </>
              )}
              <div className={`flex items-center gap-2 py-2 px-4 relative z-20 ${
                activeItem === "dashboard"
                  ? "text-black"
                  : "text-[#9d9d9d] hover:text-white"
              }`}>
                <DashboardIcon className={`w-[20px] h-[20px] ${activeItem === "dashboard" ? "text-black" : "group-hover:text-white"}`} />
                <span className="text-sm font-normal">Dashboard</span>
              </div>
            </li>

            {/* My Account */}
            <li className="relative cursor-pointer group w-full">
              {activeItem === "account" && (
                <>
                  <div className="absolute inset-0 bg-[#BDBDBD] z-0" />
                  <div className="absolute top-0 left-0 h-full w-1 bg-white z-10" />
                </>
              )}
              <div className={`flex items-center gap-2 py-2 px-4 relative z-20 ${
                activeItem === "account"
                  ? "text-black"
                  : "text-gray-300 hover:text-white"
              }`}>
                <img
                  src={UserIcon}
                  alt="User"
                  className="w-[20px] h-[20px] object-contain"
                />
                <span className="text-sm font-normal">My Account</span>
              </div>
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
            <li className="relative cursor-pointer group w-full">
              {activeItem === "messages" && (
                <>
                  <div className="absolute inset-0 bg-[#BDBDBD] z-0" />
                  <div className="absolute top-0 left-0 h-full w-1 bg-white z-10" />
                </>
              )}
              <div className={`flex items-center gap-2 py-2 px-4 relative z-20 ${
                activeItem === "messages"
                  ? "text-black"
                  : "text-gray-300 hover:text-white"
              }`}>
                <FiMessageSquare className={`w-[20px] h-[20px] ${activeItem === "messages" ? "text-black" : "group-hover:text-white"}`} />
                <span className="text-sm font-normal">Messages</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}