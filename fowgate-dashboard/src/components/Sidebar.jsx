import React from 'react';
import { FiUser, FiMessageSquare } from 'react-icons/fi';
import DashboardIcon from './DashboardIcon';
const sidebarItemClass = "flex items-center gap-2 py-2 text-[13px] font-normal font-rubik leading-[140%] tracking-normal text-gray-300 hover:text-white transition cursor-pointer";

export default function Sidebar() {
  return (
    <div className="w-64 text-white flex flex-col py-6 px-4"
    style={{
    background: 'linear-gradient(176.18deg, #292929 -0.15%, #111111 100.43%)',
  }}>
      <h1 className="text-2xl font-bold mb-10 tracking-tight">Fowgate</h1>
      <div className="w-54 h-px bg-white/30 my-4" />

      <div className="flex-1">
        {/* GENERAL Section */}
        <div className="mb-6">
          <p className="font-rubik font-medium text-[14px] leading-[140%] tracking-wide-5 mb-2 text-gray-400">GENERAL</p>
          <ul className="space-y-2">
           <li className={sidebarItemClass}>
              <DashboardIcon className="w-[20px] h-[20px] align-middle" /> Dashboard
            </li>
             <li className={sidebarItemClass}>
              <FiUser className="w-[20px] h-[20px] align-middle" /> My Account
            </li>
          </ul>
          <div className="w-54 h-px bg-white/30 my-4" />
        </div>

        {/* COLLABORATION Section */}
        <div>
          <p className="font-rubik font-medium text-[14px] leading-[140%] tracking-wide-5 mb-2 text-gray-400">COLLABORATION</p>
          <ul className="space-y-2">
            <li className={sidebarItemClass}>
              <FiMessageSquare /> Messages
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
