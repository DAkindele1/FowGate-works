import React, { useState } from 'react';
import { FiSearch, FiChevronDown, FiMoreVertical } from 'react-icons/fi';
import { BsFolderFill } from 'react-icons/bs';
import MyDriveIcon from '../assets/mydrive.svg';
import SharedWithMeIcon from '../assets/shared.svg';
import RecentIcon from '../assets/recent.svg';
import MeetingNotesIcon from '../assets/meetingnotes.svg';
import PersonalNotesIcon from '../assets/personalnotes.svg';
import TrashIcon from '../assets/trash.svg';

const folders = [
  { label: 'My Drive', count: '12 items • 10.6 MB', active: true, icon: MyDriveIcon },
  { label: 'Shared with me', count: '14 items • 8.5 MB', icon: SharedWithMeIcon },
  { label: 'Recent', count: '4 items • 830 KB', icon: RecentIcon },
  { label: 'Meeting Notes', count: '5 items • 1.6 MB', icon: MeetingNotesIcon },
  { label: 'Personal Notes', count: '8 items • 12.9 MB', icon: PersonalNotesIcon },
  { label: 'Trash', count: '3 items • 5.5 MB', icon: TrashIcon, active: false },
];

const fileData = [
  {
    id: 1,
    name: 'Letters',
    owner: 'Me',
    collaborators: ['A', 'B', 'C'],
    extraCollaborators: 2,
    attachments: 3,
    size: '176 KB',
  },
  {
    id: 2,
    name: 'Partnership Proposal',
    owner: 'Me',
    collaborators: ['A', 'B', 'C'],
    extraCollaborators: 3,
    attachments: 3,
    size: '176 KB',
  },
  {
    id: 3,
    name: 'Momentum Roadmap',
    owner: 'Me',
    collaborators: ['D'],
    extraCollaborators: 0,
    attachments: 3,
    size: '176 KB',
  },
];

const DocumentHub = () => {
  const [search, setSearch] = useState('');

  return (
<div className="flex h-[844px] text-sm text-gray-800 font-medium">
  {/* My Files Sidebar */}
  <div className="w-64 bg-white border rounded-lg border-gray-200">
    <div className="p-5">
      <h2 className="text-[20px] font-medium leading-[140%] font-['Rubik']">My Files</h2>
    </div>
    <ul className="space-y-0">
      {folders.map((folder, index) => (
        <li
        key={index}
        className={`cursor-pointer px-5 py-3 border ${
          folder.active
            ? "bg-[#E8EFF9] border-[#E8EFF9] text-[15px] font-medium leading-[140%] font-['Rubik']"
            : "border-gray-100 text-[15px] font-medium leading-[140%] font-['Rubik'] hover:bg-[#F3F4F6']"
        }`}
      >
        <div className="flex items-start gap-3">
          {/* Icon */}
          <img src={folder.icon} alt="" className="w-7 h-7 mt-0.5" />

          {/* Label + Count */}
          <div className="flex flex-col">
            <span>{folder.label}</span>
            <span className="text-[12px] leading-[150%] font-light font-['Rubik'] text-gray-500">{folder.count}</span>
          </div>
        </div>
      </li>
      ))}
    </ul>
  </div>

      {/* Main Content */}
      <div className="flex-1 ml-7 p-6 border rounded-lg border-gray-200 overflow-y-auto">
      {/* Top Bar with Title and Toolbar */}
      <div className="flex justify-between items-center mb-6 flex-nowrap gap-4 border-b pb-4 border-gray-200">
        {/* Left: Title and Search */}
        <div className="flex items-center gap-4 flex-nowrap">
          <h1 className="text-2xl font-semibold whitespace-nowrap">My Drive</h1>

          <div className="relative w-56">
            <input
              type="text"
              placeholder="Search here..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-gray-500 border border-gray-200 px-4 py-2 rounded-lg pl-3 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
            <FiSearch className="absolute right-3 top-2.5 text-gray-400" />
          </div>
        </div>

        {/* Right: Sort and Create */}
        <div className="flex items-center gap-4 flex-nowrap">
          <span className="text-[12px] leading-[150%] font-light font-['Rubik'] text-gray-500">Sort by:</span>
          <select className="border px-3 py-2 rounded-lg text-sm">
            <option>Old to New</option>
            <option>New to Old</option>
          </select>

          <div className="relative group">
            <button className="bg-[#1B5FC1] hover:bg-[#1B5FC1] text-white px-4 py-2 rounded-lg flex items-center gap-1">
              Create New <FiChevronDown />
            </button>
            <div className="absolute hidden group-hover:block top-full mt-2 right-0 bg-white border rounded-lg shadow-md w-40 z-10">
              <button className="w-full px-4 py-2 hover:bg-gray-100 text-left">Create Folder</button>
              <button className="w-full px-4 py-2 hover:bg-gray-100 text-left">Upload Folder</button>
            </div>
          </div>
        </div>
      </div>

        {/* Table Container */}
        <div className="bg-white h-[640px]">
          <div className="w-full text-sm font-[Rubik]">
            {/* Header Row */}
            <div className="grid grid-cols-[220px_110px_170px_110px_1fr_69px] bg-[#E8EFF9] text-[#292929] text-[14px] font-medium leading-[1.6] sticky top-0 z-10 rounded-t-xl">
              <div className="pl-5 pr-4 py-3 rounded-tl-xl">File name</div>
              <div className="px-4 py-3">Owner</div>
              <div className="px-4 py-3">Collaborators</div>
              <div className="px-4 py-3">Attachment</div>
              <div className="pl-4 pr-5 py-3">File Size</div>
              <div className="pr-5 py-3 text-right rounded-tr-xl">Action</div>
            </div>

            {/* Data Rows */}
            {fileData.map((file) => (
              <div
              key={file.id}
              className="grid grid-cols-[220px_110px_170px_110px_1fr_69px] bg-white hover:bg-[#F3F4F6] border-b border-gray-200"
            >
              <div className="flex items-center gap-2 px-4 py-3 font-medium text-[14px] leading-[1.6] font-[Rubik]">
                <BsFolderFill className="text-yellow-500" />
                {file.name}
              </div>
              <div className="px-7 py-3 flex items-center text-[14px] font-medium leading-[1.6] font-[Rubik]">
                {file.owner}
              </div>
              <div className="px-4 py-3 flex items-center gap-1 text-[14px] font-medium leading-[1.6] font-[Rubik]">
                <div className="flex -space-x-2">
                  {file.collaborators.map((c, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs font-bold border border-white"
                    >
                      {c}
                    </div>
                  ))}
                </div>
                {file.extraCollaborators > 0 && (
                  <span className="text-xs text-gray-500 pl-2">
                    +{file.extraCollaborators} more
                  </span>
                )}
              </div>
              <div className="px-7 py-3 text-sm flex items-center text-[14px] font-medium leading-[1.6] font-[Rubik]">
                {file.attachments} files
              </div>
              <div className="px-5 py-3 text-sm flex items-center text-[14px] font-medium leading-[1.6] font-[Rubik]">
                {file.size}
              </div>
              <div className="flex justify-center items-center pr-5 text-[14px] font-medium leading-[1.6] font-[Rubik]">
                <FiMoreVertical className="cursor-pointer text-gray-500 hover:text-gray-700" />
              </div>
            </div>
            ))}
          </div>
        </div>
        {/* Pagination */}
        <div className="flex justify-end items-center mt-4 px-4">
         <div className="flex space-x-2">
           <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-100 font-[Rubik]">
              &lt;
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-100 font-[Rubik]">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-100 font-[Rubik]">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-100 font-[Rubik]">
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentHub;



