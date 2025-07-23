import React, { useState, useEffect, useRef } from 'react';
import { FiX } from 'react-icons/fi';
import contacts from '../data/contacts';
import MessageIcon from '../assets/message2.svg'
import IndividualIcon from '../assets/individual.svg';
import IndividualIconOn from '../assets/individual_on.svg';
import GroupIcon from '../assets/group.svg';
import GroupIconOn from '../assets/group_on.svg';
import CameraIcon from '../assets/camera.svg';
import NoAvatarIcon from '../assets/noavatar.svg';

export default function NewChatModal({ onClose, onStartChat }) {
  const [tab, setTab] = useState('individual');
  const [selected, setSelected] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [groupDesc, setGroupDesc] = useState('');
  const [groupAvatar, setGroupAvatar] = useState(null);


  const switchTab = (newTab) => {
  setTab(newTab);
  setSelected([]);
};

  const handleSelect = (id) => {
  if (tab === 'individual') {
    setSelected(prev => (
      prev.includes(id) ? [] : [id]
    ));
  } else {
    setSelected(prev => (
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    ));
  }
};

  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

const handleStart = () => {
  const selectedContacts = contacts.filter(c => selected.includes(c.id));
  onStartChat({
    type: tab,
    contacts: selectedContacts,
    groupName,
    groupDesc,
    groupAvatar: groupAvatar || NoAvatarIcon,
  });
  onClose();
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/10">
      <div
        ref={modalRef}
        className="bg-white shadow-lg overflow-hidden flex flex-col"
        style={{ width: '28.67%', height: '75.656%', borderRadius: '4px', opacity: 1 }}
      >
        {/* Header */}
        <div className="text-white px-5 py-4 flex justify-between items-center rounded-t-[4px]" style={{ background: '#1B5FC1' }}>
          <h2 className="flex items-center gap-2 font-[Rubik] font-medium text-[20px] leading-[140%] tracking-[0%]">
            <img src={MessageIcon} alt="Message" className="w-5 h-5" />
            New Chat
          </h2>
          <button onClick={onClose}><FiX className="text-2xl" /></button>
        </div>

        {/* Tabs */}
        <div className="p-2 flex bg-[#E8EFF9] p-2 m-4 justify-between rounded-md">
          <button
            onClick={() => switchTab('individual')}
            className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-1 text-sm transition ${tab === 'individual' ? 'bg-white shadow-sm text-blue-600 font-semibold' : 'text-gray-500 hover:bg-white'}`}
          >
            <img src={tab === 'individual' ? IndividualIconOn : IndividualIcon} alt="Individual" className="w-4 h-4" />
            <span className="font-[Rubik] font-normal text-[14px] leading-[140%] tracking-[0px] align-middle">Individual Chat</span>
          </button>
          <button
            onClick={() => switchTab('group')}
            className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-1 text-sm transition ${tab === 'group' ? 'bg-white shadow-sm text-blue-600 font-semibold' : 'text-gray-500 hover:bg-white'}`}
          >
            <img src={tab === 'group' ? GroupIconOn : GroupIcon} alt="Group" className="w-4 h-4" />
            <span className="font-[Rubik] font-normal text-[14px] leading-[140%] tracking-[0px] align-middle">Group Chat</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 overflow-y-auto flex-1">
          {tab === 'group' && (
            <>
    <label className="block text-[14px] leading-[140%] font-[Rubik] font-normal text-[#292929] mb-1">Group Name</label>
    <div className="relative mb-3">
      <input
        type="text"
        value={groupName}
        onChange={e => setGroupName(e.target.value)}
        className="w-full border border-gray-200 rounded px-3 py-2 text-[14px] leading-[140%] font-[Rubik] font-normal pr-10"
      />

      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer bg-transparent">
        {groupAvatar ? (
          <div className="relative w-7 h-7 rounded-full overflow-hidden group">
            <img src={groupAvatar} alt="Group Avatar" className="w-full h-full object-cover" />
            <button
  onClick={() => setGroupAvatar(null)}
  className="absolute -top-0 -right-0 bg-red-500 text-white rounded-full p-[2px] shadow hover:bg-red-600"
>
  <svg
    className="w-2 h-2"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
</button>
          </div>
        ) : (
          <label className="cursor-pointer w-6 h-6 flex items-center justify-center">
            <img src={CameraIcon} alt="Upload group photo" className="w-8 h-8" />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const imageUrl = URL.createObjectURL(file);
                  setGroupAvatar(imageUrl);
                }
              }}
              className="hidden"
            />
          </label>
        )}
      </div>
    </div>

    <label className="block text-[14px] leading-[140%] font-[Rubik] font-normal text-[#292929] mb-1">Description</label>
    <input
      type="text"
      value={groupDesc}
      onChange={e => setGroupDesc(e.target.value)}
      className="w-full border border-gray-200 rounded px-3 py-2 text-[14px] leading-[140%] font-[Rubik] font-normal mb-4"
    />
  </>
)}

          <p className="text-sm font-medium text-gray-700 mb-2">{tab === 'individual' ? 'Select one individual' : 'Select Members'}</p>

          <div className="bg-[#F7F7F7] p-4 rounded-md">
          <div className="grid grid-cols-3 gap-4">
  {contacts.map(contact => {
    const isSelected = selected.includes(contact.id);
    return (
      <div
        key={contact.id}
        onClick={() => handleSelect(contact.id)}
        className="flex flex-col items-center text-center p-2 rounded cursor-pointer"
      >
        {/* Avatar Wrapper */}
        <div className="relative w-12 h-12 mb-2 rounded-full overflow-hidden">
          <img
            src={contact.avatar}
            alt={contact.name}
            className="w-full h-full object-cover"
          />

          {/* Dark overlay when selected */}
          {isSelected && (
  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
    <svg
      className="w-5 h-5 text-white"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  </div>
)}
        </div>
        

        {/* Name */}
        <p className="font-[Rubik] font-normal text-[14px] leading-[140%] tracking-[0px] text-center">
          {contact.name}
        </p>
      </div>
    );
  })}
  </div>
</div>
        </div>

        {/* Sticky Footer */}
        <div className="flex justify-end p-4 gap-2 border-t border-gray-100 shrink-0 bg-white">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border border-gray-100 text-gray-700 hover:bg-gray-100 font-[Rubik] font-normal text-[14px] leading-[140%] tracking-[0px] text-center align-middle"
          >
            Close
          </button>
          <button
            onClick={handleStart}
            className="px-4 py-2 rounded font-[Rubik] font-normal text-[14px] leading-[140%] tracking-[0px] text-[#1B5FC1] bg-[#E8EFF9] text-center align-middle hover:bg-blue-100"
            disabled={selected.length === 0 || (tab === 'group' && groupName.trim() === '')}
          >
            Start Chat
          </button>
        </div>
      </div>
    </div>
  );
}
