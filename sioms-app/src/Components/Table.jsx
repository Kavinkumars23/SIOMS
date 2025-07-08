import React from 'react';

const Table = ({ headers, data, actions = false, onEdit, onDelete }) => {
  return (
    <table className="w-full table-auto border border-gray-300 mb-4">
      <thead className="bg-gray-100">
        <tr>
          {headers.map((header, index) => (
            <th key={index} className="border px-4 py-2">{header}</th>
          ))}
          {actions && <th className="border px-4 py-2">Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            {Object.values(row).map((cell, i) => (
              <td key={i} className="border px-4 py-2">{cell}</td>
            ))}
            {actions && (
              <td className="border px-4 py-2 space-x-2 text-center">
                <button
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                  onClick={() => onEdit?.(row)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  onClick={() => onDelete?.(row)}
                >
                  Delete
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
