import React from 'react';

const smallSidebar = ({ folders }) => {
  return (
    <div className="w-72 bg-white border-r p-4 space-y-6">
      <h2 className="text-lg font-semibold">My Files</h2>
      <ul className="space-y-3">
        {folders.map((folder, index) => (
          <li
            key={index}
            className={`flex flex-col px-4 py-2 rounded-xl cursor-pointer ${
              folder.active
                ? 'bg-gray-100 text-blue-600 font-semibold'
                : 'hover:bg-gray-100'
            }`}
          >
            <span>{folder.label}</span>
            <span className="text-xs text-gray-500">{folder.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default smallSidebar;
