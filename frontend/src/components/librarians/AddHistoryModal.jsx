import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from "react-select";
import { addNewLibraryHistory } from '../../actions/library.actions';
import { toast } from 'react-toastify';

const statusOptions = [
  { value: 'Available', label: 'Available' },
  { value: 'Not Available', label: 'Not Available' }
];

const stdOptions = [
  { value: 1, label: 1 },
  { value: 2, label: 2 },
  { value: 3, label: 3 },
  { value: 4, label: 4 },
  { value: 5, label: 5 },
  { value: 6, label: 6 },
  { value: 7, label: 7 },
  { value: 8, label: 8 },
  { value: 9, label: 9 },
  { value: 10, label: 10 },
  { value: 11, label: 11 },
  { value: 12, label: 12 },
];

const AddHistoryModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    bookId: '',
    bookName: '',
    borrowedStudent: '',
    studentID: '',
    standard: '',
    borrowedDate: '',
    returnDate: '',
    availableCount: '',
    totalCount: '',
    status: ''
  });

  const dispatch = useDispatch();
  const libraryHistoryCreate = useSelector((state) => state.libraryHistoryCreate);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSelectChange = (name, selectedOption) => {
    setFormData({
      ...formData,
      [name]: selectedOption ? selectedOption.value : '', // Handle case when nothing is selected
    });
  };

  const handleAddNewHistory = (e) => {
    e.preventDefault();
    
    // Dispatch action and handle promise
    dispatch(addNewLibraryHistory(formData))
      .then(() => {
        
        toast.success('Library history added successfully!'); 
  
        
        setTimeout(() => {
          window.location.reload();
        }, 1000); 
      })
      .catch((error) => {
        
        toast.error('Failed to add library history.');
      });
  
    onClose(); // Close the modal after submission
  };
  


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">New History</h2>
        </div>
        <form onSubmit={handleAddNewHistory} className="mt-4 overflow-auto">
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="bookId">Book ID</label>
            <input
              type="text"
              required
              className="border border-gray-300 p-2 w-full rounded"
              onChange={handleChange}
              name='bookId'
              value={formData.bookId}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="bookName">Book Name</label>
            <input
              type="text"
              required
              className="border border-gray-300 p-2 w-full rounded"
              onChange={handleChange}
              name='bookName'
              value={formData.bookName}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="borrowedStudent">Borrowed By</label>
            <input
              type="text"
              required
              className="border border-gray-300 p-2 w-full rounded"
              onChange={handleChange}
              name='borrowedStudent'
              value={formData.borrowedStudent}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="studentID">Student ID</label>
            <input
              type="number"
              required
              className="border border-gray-300 p-2 w-full rounded"
              onChange={handleChange}
              name='studentID'
              value={formData.studentID}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="standard">Select Standard</label>
            <Select
              required
              options={stdOptions}
              placeholder="Select Standard"
              className="input w-full p-[1px] h-[42px]" 
               onChange={(selectedOption) => handleSelectChange('standard', selectedOption)}
              value={stdOptions.find(option => option.value === formData.standard)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="borrowedDate">Borrowed Date</label>
            <input
              type="date"
              required
              className="border border-gray-300 p-2 w-full rounded"
              onChange={handleChange}
              name='borrowedDate'
              value={formData.borrowedDate}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="returnDate">Return Date</label>
            <input
              type="date"
              required
              className="border border-gray-300 p-2 w-full rounded"
              onChange={handleChange}
              name='returnDate'
              value={formData.returnDate}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="availableCount">Available Count</label>
            <input
              type="number"
              required
              className="border border-gray-300 p-2 w-full rounded"
              onChange={handleChange}
              name='availableCount'
              value={formData.availableCount}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="totalCount">Total Count</label>
            <input
              type="number"
              required
              className="border border-gray-300 p-2 w-full rounded"
              onChange={handleChange}
              name='totalCount'
              value={formData.totalCount}
            />
          </div>
          <div className='mb-4'>
            <label className="block text-gray-700" htmlFor="status">Select Status</label>
            <Select
              required
              options={statusOptions}
              placeholder="Select Status"
              className="input w-full p-[1px] h-[42px]" 
              onChange={(selectedOption) => handleSelectChange('status', selectedOption)}
              value={statusOptions.find(option => option.value === formData.status)}
            />
          </div>
          <div className="modal-action">
            <button 
              type='submit'
              className="btn bg-indigo-950 text-white hover:bg-indigo-50 hover:text-black">
              Add
            </button>
            <button 
              type='button'
              className="btn bg-gray-300 text-black hover:bg-gray-400"
              onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHistoryModal;
