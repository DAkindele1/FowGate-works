import React from 'react';
import { FiSearch, FiChevronDown } from 'react-icons/fi';

const Toolbar = ({ search, setSearch }) => {
  return (
    <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
      <div className="relative w-full max-w-sm">
        <input
          type="text"
          placeholder="Search here..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
      </div>

      <div className="flex items-center gap-4">
        <select className="border px-3 py-2 rounded-lg">
          <option>Old to New</option>
          <option>New to Old</option>
        </select>

        <div className="relative group">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-1">
            Create New <FiChevronDown />
          </button>
          <div className="absolute hidden group-hover:block top-full mt-2 right-0 bg-white border rounded-lg shadow-md w-40 z-10">
            <button className="w-full px-4 py-2 hover:bg-gray-100 text-left">Create Folder</button>
            <button className="w-full px-4 py-2 hover:bg-gray-100 text-left">Upload Folder</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
