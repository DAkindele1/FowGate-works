import { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import jpgIcon from '../assets/jpg.svg';
import mp3Icon from '../assets/mp3.svg';
import mp4Icon from '../assets/mp4.svg';
import pdfIcon from '../assets/pdf.svg';
import docIcon from '../assets/doc.svg';
import editGroupIcon from '../assets/editgroup.svg';
import downloadButtonIcon from '../assets/download.svg';
import NoAvatarIcon from '../assets/noavatar.svg';
import NoFilesIcon from '../assets/nofiles.svg';

const TABS = ['All Files', 'Audio', 'Docs', 'Images', 'PDFs', 'Videos'];
const currentUserAvatar = 'https://i.pravatar.cc/100?img=9';

const FILE_ICONS = {
  jpg: jpgIcon,
  mp3: mp3Icon,
  mp4: mp4Icon,
  pdf: pdfIcon,
  doc: docIcon,
};

export default function ChatInfoPanel({ chat, isOpen, onClose, onUpdateChat }) {
  const isGroupChat = Array.isArray(chat?.members) && chat.members.length > 2;
  const [showPanel, setShowPanel] = useState(false);
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [description, setDescription] = useState('');
  const [groupAvatar, setGroupAvatar] = useState(NoAvatarIcon);
  const [members, setMembers] = useState(isGroupChat ? chat.members : []);
  const [animateIn, setAnimateIn] = useState(false);
  const [confirmingMember, setConfirmingMember] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setShowPanel(true);
      setTimeout(() => setAnimateIn(true), 10);
    } else {
      setAnimateIn(false);
      const timer = setTimeout(() => setShowPanel(false), 300);
      return () => clearTimeout(timer);
    }

    if (isGroupChat) {
      setMembers(chat.members || []);
      setDescription(chat.description || '');
      setGroupAvatar(chat.avatar || NoAvatarIcon);
    }
  }, [isOpen, chat, isGroupChat]);

  const handleRemoveMember = (memberToRemove) => {
    const updatedMembers = members.filter((m) => {
      const nameA = typeof m === 'string' ? m : m.name;
      const nameB = typeof memberToRemove === 'string' ? memberToRemove : memberToRemove.name;
      return nameA !== nameB;
    });

    setMembers(updatedMembers);

    if (onUpdateChat) {
      onUpdateChat({ ...chat, members: updatedMembers });
    }
  };

  if (!showPanel) return null;

  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-700 ease-in-out ${
          animateIn ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Sliding panel */}
      <div
        className={`relative h-full w-[608px] bg-white shadow-xl z-50 transform transition-transform duration-700 ease-in-out ${
          animateIn ? 'translate-x-0' : 'translate-x-full'
        } flex flex-col`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="font-[Rubik] font-medium text-2xl text-[#292929]">Chat Info</h2>
          <button onClick={onClose}>
            <FiX size={24} className="text-gray-500 hover:text-red-500" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Avatar and name */}
          <div className="flex flex-col items-center text-center space-y-1">
            <div className="flex -space-x-2">
              <div className="relative w-20 h-20">
                <img
                  src={chat.avatar || NoAvatarIcon}
                  alt="Group Avatar"
                  className="w-20 h-20 rounded-full object-cover"
                />
                {isGroupChat && (
                  <label className="absolute bottom-0 right-1 bg-white rounded-full cursor-pointer">
                    <img src={editGroupIcon} alt="Edit" className="w-5 h-5" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file?.type.startsWith('image/')) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            const newAvatar = reader.result;
                            setGroupAvatar(newAvatar);
                            onUpdateChat?.({ ...chat, avatar: newAvatar });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>
            <h3 className="font-rubik font-medium text-base text-[#292929]">{chat?.name}</h3>
            {isGroupChat && (
              <p className="font-rubik text-sm text-[#707070]">{members.length} Members</p>
            )}
          </div>

          {/* Group Description */}
          {isGroupChat && (
            <div>
              <label className="font-rubik text-sm text-[#292929]">Group Description</label>
              <input
                type="text"
                placeholder="Type here"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 w-full border border-gray-200 rounded-md px-3 py-5 text-sm focus:ring-[#E8EFF9]"
              />
            </div>
          )}

          {/* Group Members */}
          {isGroupChat && (
            <div>
              <p className="font-rubik text-[#292929] mb-2">Group Members ({members.length})</p>
              <div className="relative flex space-x-4 overflow-x-auto pb-2">
                {members.map((member, idx) => {
                  const displayName = typeof member === 'string' ? member : member.name;
                  const avatarUrl =
                    (typeof member === 'object' && member.avatar) ||
                    chat.avatarMap?.[displayName] ||
                    (displayName === 'You' ? currentUserAvatar : 'https://via.placeholder.com/48');

                  const isConfirming = confirmingMember === member;

                  return (
                    <div key={idx} className="relative flex flex-col items-center text-center group">
                      {isConfirming && (
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-50 bg-white px-4 py-3 rounded shadow-md border border-gray-300">
                          <p className="text-sm text-gray-800 mb-3 text-center">
                            Remove <span className="font-semibold">{displayName}</span> from the group?
                          </p>
                          <div className="flex justify-center gap-4">
                            <button
                              onClick={() => setConfirmingMember(null)}
                              className="text-gray-500 hover:underline text-sm"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => {
                                handleRemoveMember(member);
                                setConfirmingMember(null);
                              }}
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      )}

                      <div className="relative">
                        <img
                          src={avatarUrl}
                          alt={displayName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        {displayName !== 'You' && (
                          <button
                            onClick={() => setConfirmingMember(member)}
                            className="absolute top-0 right-0 w-3 h-3 bg-[#EB4335] text-white rounded-full flex items-center justify-center text-[7px]"
                            title={`Remove ${displayName}`}
                          >
                            ✕
                          </button>
                        )}
                      </div>

                      <span className="text-xs font-rubik text-[#292929] w-16 truncate mt-1">
                        {displayName}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4">
          <button
            onClick={onClose}
            className="font-rubik text-sm ml-auto px-4 py-2 bg-[#E8EFF9] text-[#1B5FC1] rounded-md float-right"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

