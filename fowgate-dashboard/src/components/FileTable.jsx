import React from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import { FaFolder } from 'react-icons/fa';
import AvatarGroup from './AvatarGroup';

const FileTable = ({ files }) => {
  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full text-left border-separate border-spacing-y-2">
        <thead>
          <tr className="text-gray-500 text-xs uppercase">
            <th className="py-2 px-4">File name</th>
            <th className="py-2 px-4">Owner</th>
            <th className="py-2 px-4">Collaborators</th>
            <th className="py-2 px-4">Attachment</th>
            <th className="py-2 px-4">Size</th>
            <th className="py-2 px-4"></th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr key={file.id} className="bg-gray-50 hover:bg-gray-100 text-sm">
              <td className="py-3 px-4 flex items-center gap-2">
                <FaFolder className="text-yellow-500" />
                <span className="truncate max-w-[160px]">{file.name}</span>
              </td>
              <td className="py-3 px-4">{file.owner}</td>
              <td className="py-3 px-4">
                <AvatarGroup avatars={file.collaborators} extra={file.extraCollaborators} />
              </td>
              <td className="py-3 px-4">{`(${file.attachments} files)`}</td>
              <td className="py-3 px-4">{file.size}</td>
              <td className="py-3 px-4">
                <button className="text-gray-400 hover:text-gray-600">
                  <FiMoreVertical size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileTable;
