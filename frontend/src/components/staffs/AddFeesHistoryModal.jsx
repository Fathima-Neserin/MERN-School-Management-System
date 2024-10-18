import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from "react-select";
import { toast } from 'react-toastify';
import { addNewFeesHistory } from '../../actions/fees.actions';


const sectionOptions = [
  { value: "LP", label: "LP" },
  { value: "UP", label: "UP" },
  { value: "HS", label: "HS" },
  { value: "HSS", label: "HSS" },
];

const AddFeesHistoryModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    feeName: '',
    amount: '',
    studentName: '',
    studentID: '',
    section: '',
    paidDate: ''
  });

  const dispatch = useDispatch();
  const feesHistoryCreate = useSelector((state) => state.feesHistoryCreate);

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
    dispatch(addNewFeesHistory(formData))
      .then(() => {
        
        toast.success('New Fee history added successfully!'); 
  
        
        setTimeout(() => {
          window.location.reload();
        }, 1000); 
      })
      .catch((error) => {
        
        toast.error('Failed to add fee history.');
      });
  
    onClose(); // Close the modal after submission
  };
  




  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">New Fee History</h2>
        </div>
        <form onSubmit={handleAddNewHistory} className="mt-4 overflow-auto">
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="bookId">Fee Name</label>
            <input
              type="text"
              required
              className="border border-gray-300 p-2 w-full rounded"
              onChange={handleChange}
              name='feeName'
              value={formData.feeName}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="bookName">Amount</label>
            <input
              type="number"
              required
              className="border border-gray-300 p-2 w-full rounded"
              onChange={handleChange}
              name='amount'
              value={formData.amount}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="borrowedStudent">Student Name</label>
            <input
              type="text"
              required
              className="border border-gray-300 p-2 w-full rounded"
              onChange={handleChange}
              name='studentName'
              value={formData.studentName}
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
              options={sectionOptions}
              placeholder="Select Standard"
              className="input w-full p-[1px] h-[42px]" 
               onChange={(selectedOption) => handleSelectChange('section', selectedOption)}
              value={sectionOptions.find(option => option.value === formData.section)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="borrowedDate">Paid Date</label>
            <input
              type="date"
              required
              className="border border-gray-300 p-2 w-full rounded"
              onChange={handleChange}
              name='paidDate'
              value={formData.paidDate}
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

export default AddFeesHistoryModal;
