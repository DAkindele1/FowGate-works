import DashboardIcon from './DashboardIcon';
import FowgateSymbol from '../assets/fowgate_symbol.png';
import userIcon from '../assets/user.svg';
import messageIcon from '../assets/message.svg';
import Line from '../assets/line.png';
import { handleUnavailableFeature } from '../utils/feature.js';
import { sidebarSections, sidebarMembers } from '../styles/fonts';

export default function Sidebar({ activeItem = "dashboard", setCurrentPage }) {
  return (
    <div className="w-[250px] h-[960px] overflow-hidden rounded-tl-[10px] rounded-bl-[10px] bg-gradient-to-br from-[#292929] to-[#111111]">
      <div className="flex flex-col h-full px-4">
        {/* Logo */}
        <div className="mt-8 mb-6 px-2.5">
          <img
            src={FowgateSymbol}
            alt="Fowgate Logo"
            className="w-24 h-8 object-contain"/>
        </div>

        <div className="mb-[24px]">
          <img src={Line} alt="Line Decoration" className="w-full h-auto object-contain" />
        </div>

        {/* GENERAL Section */}
        <div className="relative">
          <small style={sidebarSections} className="mb-2 block ml-[10px]">
            GENERAL
          </small>
          <ul className="space-y-2 mb-[16px]">
            {/* Dashboard */}
            <li onClick={() => setCurrentPage('dashboard')} className="relative cursor-pointer group w-full h-[40px]">
              {activeItem === "dashboard" && (
                <>
                  <div className="absolute inset-y-0 left-[-16px] right-[-16px] z-0 bg-[#2F2F2F] rounded-md" />
                  <div className="absolute top-0 left-[-16px] w-[4px] h-full z-10 bg-white" />
                </>
              )}
              <div className={`flex items-center gap-2 py-2 pl-[10px] pr-4 relative z-20 ${
                activeItem === "dashboard"
                  ? "text-[#9d9d9d]"
                  : "text-[#9d9d9d] hover:text-white"
              }`} style={sidebarMembers}>
                <DashboardIcon className={`w-[20px] h-[20px] ${activeItem === "dashboard" ? "text-normal" : "group-hover:text-white"}`} />
                <span className="text-sm font-normal">Dashboard</span>
              </div>
            </li>

            {/* My Account */}
            <li onClick={() => setCurrentPage('account')} className="relative cursor-pointer group w-full h-[40px]">
              {activeItem === "account" && (
                <>
                  <div className="absolute inset-y-0 left-[-16px] right-[-16px] z-0 bg-[#2F2F2F] rounded-md" />
                  <div className="absolute top-0 left-[-16px] w-[4px] h-full z-10 bg-white" />
                </>
              )}
              <div className={`flex items-center gap-2 py-2 pl-[10px] pr-4 relative z-20 ${
                activeItem === "account"
                  ? "text-[#9d9d9d]"
                  : "text-[#9d9d9d] hover:text-white"
              }`} style={sidebarMembers}>
                <img
                  src={userIcon}
                  alt="User"
                  className="w-[20px] h-[20px] object-contain"/>
                <span className="text-sm font-normal">My Account</span>
              </div>
            </li>
          </ul>
        </div>

        <div className="mb-[24px]">
          <img src={Line} alt="Line Decoration" className="w-full h-auto object-contain" />
        </div>

        {/* COLLABORATION Section */}
        <div className="relative">
          <small style={sidebarSections} className="mb-2 block ml-[10px]">
            COLLABORATION
          </small>
          <ul className="space-y-2 mb-[16px]">
            {/* CLO Collaboration */}
            <li onClick={() => setCurrentPage('CLO Collaboration')} className="relative cursor-pointer group w-full h-[40px]">
              {activeItem === "CLO Collaboration" && (
                <>
                  <div className="absolute inset-y-0 left-[-16px] right-[-16px] z-0 bg-[#2F2F2F] rounded-md" />
                  <div className="absolute top-0 left-[-16px] w-[4px] h-full z-10 bg-white" />
                </>
              )}
              <div className={`flex items-center gap-2 py-2 pl-[10px] pr-4 relative z-20 ${
                activeItem === "CLO Collaboration"
                  ? "text-[#9d9d9d]"
                  : "text-[#9d9d9d] hover:text-white"
              }`} style={sidebarMembers}>
                <img
                  src={messageIcon}
                  alt="CLO Collaboration"
                  className="w-[20px] h-[20px] object-contain"/>
                <span className="text-sm font-normal">CLO Collaboration</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
