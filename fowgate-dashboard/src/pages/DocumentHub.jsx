import React, { useState } from 'react';
import { FiSearch, FiChevronDown, FiMoreVertical } from 'react-icons/fi';
import { BsFolderFill } from 'react-icons/bs';

const folders = [
  { label: 'My Drive', count: '12 items • 10.6 MB', active: true },
  { label: 'Shared with me', count: '14 items • 8.5 MB' },
  { label: 'Recent', count: '4 items • 830 KB' },
  { label: 'Meeting Notes', count: '5 items • 1.6 MB' },
  { label: 'Personal Notes', count: '8 items • 12.9 MB' },
  { label: 'Trash', count: '3 items • 5.5 MB' },
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
      <div className="w-64 bg-white border rounded-lg border-gray-200 p-5">
        <h2 className="text-lg font-semibold mb-6">My Files</h2>
        <ul className="space-y-3">
          {folders.map((folder, index) => (
            <li
              key={index}
              className={`px-4 py-2 rounded-xl cursor-pointer ${
                folder.active ? 'bg-[#F3F4F6] font-semibold' : 'hover:bg-[#F3F4F6]'
              }`}
            >
              <div className="flex justify-between items-center">
                <span>{folder.label}</span>
              </div>
              <div className="text-xs text-gray-500">{folder.count}</div>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 ml-7 p-6 border rounded-lg border-gray-200 overflow-y-auto">
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
          <span className="text-sm text-gray-400">Sort by:</span>
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
          <div className="overflow-y-auto">
            <table className="w-full text-left border-separate border-spacing-y-3 rounded overflow-hidden">
              <thead className="sticky top-0 z-10">
                <tr className="bg-[#E8EFF9] h-10 text-xs text-black px-4">
                  <th className="pl-5 pr-4 text-[14px] font-medium text-[#292929] leading-[1.6] font-[Rubik]">File name</th>
                  <th className="px-4 text-[14px] font-medium text-[#292929] leading-[1.6] font-[Rubik]">Owner</th>
                  <th className="px-4 text-[14px] font-medium text-[#292929] leading-[1.6] font-[Rubik]">Collaborators</th>
                  <th className="px-4 text-[14px] font-medium text-[#292929] leading-[1.6] font-[Rubik]">Attachment</th>
                  <th className="pl-4 pr-5 text-[14px] font-medium text-[#292929] leading-[1.6] font-[Rubik]">File Size</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {fileData.map((file) => (
                  <tr key={file.id} className="bg-white hover:bg-[#F3F4F6] border-b border-gray-200">
                    <td className="py-3 px-4 flex items-center gap-2 font-medium"><BsFolderFill className="text-yellow-500" />{file.name}</td>
                    <td className="py-3 px-4">{file.owner}</td>
                    <td className="py-3 px-4 flex items-center gap-1">
                      {file.collaborators.map((c, i) => (
                        <div
                          key={i}
                          className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs font-bold"
                        >
                          {c}
                        </div>
                      ))}
                      {file.extraCollaborators > 0 && (
                        <span className="text-xs text-gray-500 pl-1">
                          +{file.extraCollaborators} more
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-sm">{file.attachments} files</td>
                    <td className="py-3 px-4 text-sm">{file.size}</td>
                    <td className="py-3 px-4 text-right">
                      <FiMoreVertical className="cursor-pointer text-gray-500 hover:text-gray-700" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-end mt-6 gap-2">
            <button className="px-4 py-2 rounded-lg bg-white border hover:bg-gray-100">1</button>
            <button className="px-4 py-2 rounded-lg bg-white border hover:bg-gray-100">2</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentHub;



