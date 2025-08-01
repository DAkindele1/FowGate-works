import React, { useRef, useEffect, useState } from 'react';
import { FiSearch, FiChevronDown, FiMoreVertical } from 'react-icons/fi';
import { BsFolderFill } from 'react-icons/bs';
import MyDriveIcon from '../assets/mydrive.svg';
import SharedWithMeIcon from '../assets/shared.svg';
import RecentIcon from '../assets/recent.svg';
import MeetingNotesIcon from '../assets/meetingnotes.svg';
import PersonalNotesIcon from '../assets/personalnotes.svg';
import TrashIcon from '../assets/trash.svg';
import CreateFolderIcon from '../assets/folderadd.svg';
import UploadFolderIcon from '../assets/folderupload.svg';
import AddFolderIcon from '../assets/addfolder.svg';
import ShareFileIcon from '../assets/share.svg';
import RenameFolderIcon from '../assets/rename.svg'
import PriorityIcon from '../assets/priority.svg'
import ViewPropIcon from '../assets/viewprop.svg'
import TrashRedIcon from '../assets/trashred2.svg'
import TrashIcon2 from '../assets/delete2.svg';
import CancelIcon from '../assets/cancel.svg';

const folders = [
  { label: 'My Drive', count: '12 items • 10.6 MB', active: true, icon: MyDriveIcon },
  { label: 'Shared with me', count: '14 items • 8.5 MB', icon: SharedWithMeIcon },
  { label: 'Recent', count: '4 items • 830 KB', icon: RecentIcon },
  { label: 'Meeting Notes', count: '5 items • 1.6 MB', icon: MeetingNotesIcon },
  { label: 'Personal Notes', count: '8 items • 12.9 MB', icon: PersonalNotesIcon },
  { label: 'Trash', count: '3 items • 5.5 MB', icon: TrashIcon, active: false },
];


const initialFileData = [
  {
    id: 1,
    name: 'Letters',
    owner: 'Me',
    collaborators: ['A', 'B', 'C'],
    extraCollaborators: 2,
    attachments: 3,
    size: '176 KB',
    activityLog: [
      {
        user: 'Me',
        avatar: '/avatars/memoji.png',
        action: 'Created this folder',
        timestamp: 'Jul 28, 2025, 10:02 AM',
      },
      {
        user: 'Dave',
        avatar: '/avatars/memoji2.png',
        action: 'Shared with B and C',
        timestamp: 'Jul 29, 2025, 2:30 PM',
      },
    ],
  },
  {
    id: 2,
    name: 'Partnership Proposal',
    owner: 'Me',
    collaborators: ['A', 'B', 'C'],
    extraCollaborators: 3,
    attachments: 3,
    size: '176 KB',
    activityLog: [
      {
        user: 'Me',
        avatar: '../avatars/memoji.png',
        action: 'Created this file',
        timestamp: 'Jul 24, 2025, 8:47 AM',
      },
      {
        user: 'John Doe',
        avatar: '../avatars/memoji1.png',
        action: 'Renamed from "Proposal Draft"',
        timestamp: 'Jul 30, 2025, 12:20 PM',
      },
    ],
  },
  {
    id: 3,
    name: 'Momentum Roadmap',
    owner: 'Me',
    collaborators: ['D'],
    extraCollaborators: 0,
    attachments: 3,
    size: '176 KB',
    activityLog: [
      {
        user: 'Me',
        avatar: '../avatars/memoji.png',
        action: 'Created this file',
        timestamp: 'Jul 25, 2025, 9:15 AM',
      },
    ],
  },
];


const DocumentHub = () => {
  const [search, setSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [fileData, setFileData] = useState(initialFileData);
  const [openActionId, setOpenActionId] = useState(null);
  const [isRenameFolderOpen, setIsRenameFolderOpen] = useState(false);
  const [renameFolderName, setRenameFolderName] = useState('');
  const [folderToRename, setFolderToRename] = useState(null);
  const [isMoveToTrashOpen, setIsMoveToTrashOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const visibleFiles = fileData.filter(file => file.status !== 'trashed');
  const [showTrashSuccess, setShowTrashSuccess] = useState(false);
  const [isViewPropertiesOpen, setIsViewPropertiesOpen] = useState(false);
  const [propertiesItem, setPropertiesItem] = useState(null);
  const dropdownRef = useRef(null);
  

  const handleCreateFolder = () => {
  if (!newFolderName.trim()) return;

  const newFolder = {
    id: Date.now(),
    name: newFolderName,
    owner: 'Me',
    collaborators: [],
    extraCollaborators: 0,
    attachments: 0,
    size: '0 KB',
    activityLog: [
    { action: 'Created', timestamp: new Date().toLocaleString() }
  ]
  };

  setFileData([newFolder, ...initialFileData]);
  setNewFolderName('');
  setIsCreateFolderOpen(false);
};

const handleRenameFolder = () => {
  if (!renameFolderName.trim()) return;

  setFileData((prev) =>
    prev.map((f) =>
      f.id === folderToRename.id ? { ...f, name: renameFolderName.trim() } : f
    )
  );

  setIsRenameFolderOpen(false);
  setFolderToRename(null);
  setRenameFolderName('');
};

const handleMoveToTrash = () => {
  if (!selectedItem) return;

  setFileData((prev) =>
    prev.map((f) =>
      f.id === selectedItem.id ? { ...f, status: 'trashed' } : f
    )
  );

  setIsMoveToTrashOpen(false);
  setSelectedItem(null);
};

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
                <img src={folder.icon} alt="" className="w-7 h-7 mt-0.5" />
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
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6 flex-nowrap gap-4 border-b pb-4 border-gray-200">
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

          <div className="flex items-center gap-4 flex-nowrap relative z-50">
            <span className="text-[12px] leading-[150%] font-light font-['Rubik'] text-gray-500">Sort by:</span>
            <select className="border border-gray-100 px-3 py-2 rounded text-sm">
              <option>Old to New</option>
              <option>New to Old</option>
            </select>

            <div className="relative">
              <button
                className="bg-[#1B5FC1] hover:bg-[#1B5FC1] text-white px-4 py-2 rounded flex items-center gap-1"
                onClick={() => setShowDropdown((prev) => !prev)}
              >
                Create New <FiChevronDown />
              </button>
              {showDropdown && (
                <div 
                ref={dropdownRef}
                className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded shadow-md z-50">
                  <button
                  onClick={() => setIsCreateFolderOpen(true)}
                  className="w-full px-4 py-2 hover:bg-gray-100 text-left flex items-center gap-2 font-[Rubik] font-normal text-[14px] leading-[1.4] capitalize">
                    <img src={CreateFolderIcon} alt="Create" className="w-4 h-4" />
                    Create Folder
                  </button>
                  <button
                  className="w-full px-4 py-2 hover:bg-gray-100 text-left flex items-center gap-2 font-[Rubik] font-normal text-[14px] leading-[1.4] capitalize">
                    <img src={UploadFolderIcon} alt="Upload" className="w-4 h-4" />
                    Upload Folder
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white h-[640px]">
          <div className="w-full text-sm font-[Rubik]">
            <div className="grid grid-cols-[220px_110px_170px_110px_1fr_69px] bg-[#E8EFF9] text-[#292929] text-[14px] font-medium leading-[1.6] sticky top-0 z-10 rounded-t-xl">
              <div className="pl-5 pr-4 py-3 rounded-tl-xl">File name</div>
              <div className="px-4 py-3 text-center">Owner</div>
              <div className="px-4 py-3 text-center">Collaborators</div>
              <div className="px-4 py-3 text-center">Attachment</div>
              <div className="pl-4 pr-5 py-3 text-center">File Size</div>
              <div className="pr-5 py-3 text-right rounded-tr-xl">Action</div>
            </div>

            {fileData
              .filter((file) =>
                file.status !== 'trashed' &&
                file.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((file) => (
              <div
                key={file.id}
                className="grid grid-cols-[220px_110px_170px_110px_1fr_69px] bg-white hover:bg-[#F3F4F6] border-b border-gray-200"
              >
                <div className="flex items-center gap-2 px-4 py-3 font-light text-[14px] leading-[1.6] font-[Rubik] truncate overflow-hidden whitespace-nowrap">
                  <BsFolderFill className="text-yellow-500" />
                  {file.name}
                </div>
                <div className="px-7 py-3 flex items-center justify-center text-[14px] font-light leading-[1.6] font-[Rubik] truncate overflow-hidden whitespace-nowrap">
                  {file.owner}
                </div>
                <div className="px-4 py-3 flex items-center gap-1 justify-center text-[14px] font-light leading-[1.6] font-[Rubik] truncate overflow-hidden whitespace-nowrap">
                  <div className="flex -space-x-2">
                    {file.collaborators.map((c, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs font-light border border-white"
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
                <div className="px-7 py-3 text-sm flex justify-center items-center text-[14px] font-light leading-[1.6] font-[Rubik] truncate overflow-hidden whitespace-nowrap">
                  {file.attachments} files
                </div>
                <div className="px-5 py-3 text-sm flex justify-center items-center text-[14px] font-light leading-[1.6] font-[Rubik] truncate overflow-hidden whitespace-nowrap">
                  {file.size}
                </div>
                <div className="relative flex justify-center items-center pr-5 text-[14px] font-light leading-[1.6] font-[Rubik]">
                  <FiMoreVertical
                    className="cursor-pointer text-gray-500 hover:text-gray-700"
                    onClick={() =>
                      setOpenActionId((prevId) => (prevId === file.id ? null : file.id))
                    }
                  />
                  {openActionId === file.id && (
                  <div className="absolute right-0 top-6 w-42 bg-white border border-gray-200 rounded-md shadow-md z-50 animate-fade-in action-dropdown font-[Rubik] text-[14px] font-normal leading-[1.4] capitalize">
                    <button className="w-full flex items-center px-4 py-2 text-sm hover:bg-gray-100 text-left gap-2">
                      <img src={ShareFileIcon} alt="Share" className="w-4 h-4" />
                      Share File
                    </button>
                    <button
                      className="w-full flex items-center px-4 py-2 text-sm hover:bg-gray-100 text-left gap-2"
                      onClick={() => {
                        setFolderToRename(file);
                        setRenameFolderName(file.name);
                        setIsRenameFolderOpen(true);
                      }}
                    >
                      <img src={RenameFolderIcon} alt="Rename" className="w-4 h-4" />
                      Rename Folder
                    </button>
                    <button className="w-full flex items-center px-4 py-2 text-sm hover:bg-gray-100 text-left gap-2">
                      <img src={PriorityIcon} alt="Share" className="w-4 h-4" />
                      Move to Priority
                    </button>
                    <button className="w-full flex items-center px-4 py-2 text-sm hover:bg-gray-100 text-left gap-2"
                      onClick={() => {
                        setPropertiesItem(file);
                        setIsViewPropertiesOpen(true);
                      }}>
                      <img src={ViewPropIcon} alt="Share" className="w-4 h-4" />
                      View Properties
                    </button>
                    <button 
                    className="w-full flex items-center px-4 py-2 text-sm text-[#EB4335] hover:bg-gray-100 text-left gap-2"
                      onClick={() => {
                        setSelectedItem(file);
                        setIsMoveToTrashOpen(true);
                      }}>
                      <img src={TrashRedIcon} alt="Share" className="w-4 h-4" />
                      Move to Trash
                    </button>
                  </div>
                )}
                </div>
              </div>
            ))}
              {isCreateFolderOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                <div className="w-[450px] bg-white rounded-xl shadow-xl overflow-hidden font-[Rubik] animate-fade-in-up">
                  
                  {/* Header */}
                  <div className="bg-[#1B5FC1] px-6 py-4">
                    <div className="flex items-center gap-2">
                      <img src={AddFolderIcon} alt="Add" className="w-5 h-5" />
                      <h2 className="text-white text-lg font-semibold">Create Folder</h2>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    <label className="block text-sm text-gray-700 mb-1">Folder name</label>
                    <input
                      type="text"
                      value={newFolderName}
                      onChange={(e) => setNewFolderName(e.target.value)}
                      placeholder="Enter folder name"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />

                    <div className="mt-6 flex justify-end gap-3">
                      <button
                        onClick={() => setIsCreateFolderOpen(false)}
                        className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleCreateFolder}
                        className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                      >
                        Create Folder
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isRenameFolderOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                <div className="w-[460px] bg-white rounded shadow-xl overflow-hidden font-[Rubik] animate-fade-in-up">

                  {/* Header */}
                  <div className="bg-[#1B5FC1] px-6 py-4 flex items-center gap-2">
                    <img src={AddFolderIcon} alt="Add" className="w-5 h-5" />
                    <h2 className="text-white text-lg font-semibold">Rename Folder</h2>
                  </div>

                  {/* Body */}
                  <div className="p-4">
                    <label className="block text-sm text-gray-700 mb-1">Folder name</label>
                    <input
                      type="text"
                      value={renameFolderName}
                      onChange={(e) => setRenameFolderName(e.target.value)}
                      placeholder="Enter new name"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />

                    <div className="mt-6 flex justify-end gap-3">
                      <button
                        onClick={() => setIsRenameFolderOpen(false)}
                        className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleRenameFolder}
                        className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                      >
                        Rename Folder
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isMoveToTrashOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">
                <div className="w-[400px] bg-white rounded shadow-xl overflow-hidden">
                  
                  {/* Header */}
                  <div className="bg-[#EB4335] text-white flex items-center justify-between gap-2 px-6 py-4">
                    <div className="flex items-center gap-2">
                      <img src={TrashIcon2} alt="Trash Icon" className="w-5 h-5" />
                      <h2 className="text-base font-semibold">Move to Trash</h2>
                    </div>
                    <button
                      onClick={() => setIsMoveToTrashOpen(false)}
                      className="transition hover:opacity-80"
                      title="Close"
                    >
                      <img src={CancelIcon} alt="Cancel" className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Body */}
                  <div className="px-6 py-5 text-center">
                    <p className="text-gray-700 text-sm mb-4 text-left">
                      Are you sure you want to move <strong>{selectedItem.name}</strong> to trash? This action can be undone in the bin.
                    </p>
                    <div className="flex justify-end gap-3 mt-6">
                      <button
                        onClick={() => setIsMoveToTrashOpen(false)}
                        className="px-4 py-2 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          handleMoveToTrash(selectedItem.id);
                          setSelectedItem(null);
                          setShowTrashSuccess(true);
                        }}
                        className="px-4 py-2 rounded-md"
                        style={{ backgroundColor: '#FDECEB', color: '#EB4335' }}
                      >
                        Yes, I'm sure
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {showTrashSuccess && (
              <div className="fixed inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center z-50">
                <div className="bg-white rounded shadow-xl p-10 w-[440px] text-center animate-fade-in-up">
                  
                  {/* Success Icon */}
                  <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                    <svg
                      className="w-10 h-10 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>

                  {/* Modal Content */}
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Moved to Trash!</h2>
                  <p className="text-base text-gray-500">
                    This file has been successfully moved to trash. You can restore it anytime from the Trash folder.
                  </p>

                  {/* OK Button */}
                  <button
                    className="mt-8 bg-[#1B5FC1] text-white w-full py-3 rounded-md hover:bg-blue-700 transition"
                    onClick={() => setShowTrashSuccess(false)}
                  >
                    Okay
                  </button>
                </div>
              </div>
            )}
            {isViewPropertiesOpen && propertiesItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
              <div className="w-[460px] bg-white rounded shadow-xl overflow-hidden font-[Rubik] animate-fade-in-up">

                {/* Header */}
                <div className="bg-[#1B5FC1] px-6 py-4 flex items-center justify-between text-white">
                  <div className="flex items-center gap-2">
                    <img src={ViewPropIcon} alt="View" className="w-5 h-5" />
                    <h2 className="text-lg font-semibold">Folder Properties</h2>
                  </div>
                  <button
                    onClick={() => setIsViewPropertiesOpen(false)}
                    className="transition hover:opacity-80"
                    title="Close"
                  >
                    <img src={CancelIcon} alt="Close" className="w-5 h-5" />
                  </button>
                </div>

                {/* Body */}
                <div className="p-5 text-sm text-gray-700 space-y-3">
                    <h2 className="text-lg font-semibold text-gray-900 mb-1">
                      {selectedItem?.name}
                    </h2>
                    <p className="text-sm text-gray-600 mb-2">
                      Created by {selectedItem?.owner}
                    </p>
                    <div className="grid grid-cols-2 gap-y-1 text-sm text-gray-700">
                      <div>Size:</div>
                      <div>{selectedItem?.size}</div>
                      <div>Attachments:</div>
                      <div>{selectedItem?.attachments}</div>
                    </div>
                  <div className="mt-6 border-t pt-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-4">Activity Log</h3>
                    {propertiesItem.activityLog && propertiesItem.activityLog.length > 0 ? (
                      <div className="space-y-4 max-h-56 overflow-y-auto pr-2">
                        {propertiesItem.activityLog
                          .slice()
                          .reverse()
                          .map((log, index) => (
                            <div key={index} className="flex items-start justify-between gap-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={log.avatar}
                                  alt={log.user}
                                  className="w-9 h-9 rounded-full object-cover"
                                />
                                <div>
                                  <p className="text-sm font-medium text-gray-800">{log.user}</p>
                                  <p className="text-sm text-gray-500">{log.action}</p>
                                </div>
                              </div>
                              <p className="text-sm text-gray-500 whitespace-nowrap">{log.timestamp}</p>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400">No activity yet.</p>
                    )}
                  </div>

                  <div className="pt-4 text-right">
                    <button
                      className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                      onClick={() => setIsViewPropertiesOpen(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
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




