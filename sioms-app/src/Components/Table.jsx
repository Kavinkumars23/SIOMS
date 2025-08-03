import React from 'react';

const Table = ({ headers, data, actions = false, onEdit, onDelete }) => {
  return (
    <table className="w-full table-auto border border-gray-200 mb-4 text-sm">
      <thead className="bg-gray-100">
        <tr>
          {headers.map((header, index) => (
            <th key={index} className="border px-4 py-2 text-left text-gray-700">
              {header}
            </th>
          ))}
          {actions && (
            <th className="border px-4 py-2 text-left text-gray-700">Actions</th>
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx} className="hover:bg-gray-50">
            {headers.map((header, i) => {
              const key = header.toLowerCase(); // 'Name' => 'name'
              const value = row[key];
              return (
                <td key={i} className="border px-4 py-2">
                  {key === 'image' ? (
                    <img
                      src={value}
                      alt="product"
                      className="w-14 h-14 object-cover rounded"
                    />
                  ) : (
                    value
                  )}
                </td>
              );
            })}
            {actions && (
              <td className="border px-4 py-2 space-x-2">
                <button
                  onClick={() => onEdit?.(row.raw || row)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete?.(row)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
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
