import React from 'react';

const DeleteModal = ({ isOpen, onClose, onConfirm , toBeDeleted}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <h2 className="text-lg font-semibold">Confirm Delete</h2>
        <p className="mt-4">Are you sure you want to delete this {toBeDeleted} ?</p>
        <div className="mt-6 flex justify-end space-x-4">
          <button 
            onClick={onClose} 
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">
            Cancel
          </button>
          <button 
            onClick={onConfirm} 
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
