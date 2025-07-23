import { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import JpgIcon from '../assets/jpg.svg';
import Mp3Icon from '../assets/mp3.svg';
import Mp4Icon from '../assets/mp4.svg';
import PdfIcon from '../assets/pdf.svg';
import DocIcon from '../assets/doc.svg';

const TABS = ['All Files', 'Audio', 'Docs', 'Images', 'PDFs', 'Videos'];

const FILE_ICONS = {
  Images: JpgIcon,
  Audio: Mp3Icon,
  Videos: Mp4Icon,
  PDFs: PdfIcon,
  Docs: DocIcon,
};

export default function ChatInfoPanel({ chat, isOpen, onClose }) {
  const [showPanel, setShowPanel] = useState(false);
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState({
    Images: [],
    Videos: [],
    Docs: [],
    PDFs: [],
    Audio: [],
  });

  const members = chat?.members || [];

  useEffect(() => {
    if (isOpen) {
      setShowPanel(true);
    } else {
      const timer = setTimeout(() => setShowPanel(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !showPanel) return null;

  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      <div
        className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`relative h-full w-[608px] bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } flex flex-col`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4">
          <h2 className="text-lg font-semibold">Chat Info</h2>
          <button onClick={onClose}>
            <FiX size={24} className="text-gray-500 hover:text-red-500" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Group Header */}
          <div className="flex flex-col items-center text-center space-y-1">
            <div className="flex -space-x-2">
              <img src={chat?.avatar} className="w-12 h-12 rounded-full border-2 border-white" />
            </div>
            <h3 className="font-semibold text-lg mt-2">{chat?.name}</h3>
            <p className="text-sm text-gray-500">{members.length} Members</p>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-gray-700">Group Description</label>
            <input
              type="text"
              placeholder="Type here"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full border border-gray-100 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8EFF9]"
            />
          </div>

          {/* Shared Files */}
          <div>
         <div className="flex justify-between items-center mb-2">
        <p className="text-sm font-medium text-gray-700">Shared Files</p>
        <div className="flex items-center gap-2">
         <span className="text-xs text-gray-500">Filter by</span>
         <select
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value)}
          className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#E8EFF9]"
          >
        {TABS.map((tab) => (
          <option key={tab} value={tab}>
            {tab}
          </option>
        ))}
       </select>
     </div>
   </div>
<div className="h-40 overflow-y-auto rounded-md border border-gray-100 p-2 bg-gray-50 space-y-2">
  {activeTab === 'All Files' ? (
    Object.entries(files).every(([_, arr]) => arr.length === 0) ? (
      <p className="text-sm text-gray-400 text-center pt-15">No files yet.</p>
    ) : (
      Object.entries(files).flatMap(([type, arr]) =>
        arr.map((file, idx) => (
          <div
            key={`${type}-${idx}`}
            className="flex items-center space-x-2 text-sm text-gray-700"
          >
            <img
              src={FILE_ICONS[type]}
              alt={`${type} icon`}
              className="w-4 h-4"
            />
            <span>{file.name}</span>
          </div>
        ))
      )
    )
  ) : files[activeTab].length === 0 ? (
    <p className="text-sm text-gray-400 text-center pt-4">
      No {activeTab.toLowerCase()} yet.
    </p>
  ) : (
    files[activeTab].map((file, idx) => (
      <div
        key={idx}
        className="flex items-center space-x-2 text-sm text-gray-700"
      >
        <img
          src={FILE_ICONS[activeTab]}
          alt={`${activeTab} icon`}
          className="w-4 h-4"
        />
        <span>{file.name}</span>
      </div>
    ))
  )}
</div>
          </div>

          {/* Members */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Group Members ({members.length})</p>
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {members.map((member, idx) => (
                <div key={idx} className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mb-1" />
                  <span className="text-xs text-gray-600 w-16 truncate">{member}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className=" p-4">
          <button
            onClick={onClose}
            className="ml-auto px-4 py-2 bg-[#E8EFF9] text-[#1B5FC1] rounded-md hover:bg-[#E8EFF9] text-sm float-right"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
