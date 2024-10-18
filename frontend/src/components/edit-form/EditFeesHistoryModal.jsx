import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Select from "react-select";
import { toast } from 'react-toastify';
import { feesHistoryUpdation } from '../../actions/fees.actions';

const sectionOptions = [
    { value: "LP", label: "LP" },
    { value: "UP", label: "UP" },
    { value: "HS", label: "HS" },
    { value: "HSS", label: "HSS" },
  ];

const EditFeesHistoryModal = ({ isOpen, onClose, historyData }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState([]);

  const handleInputChange = (e) => {
    const name = e.target ? e.target.name : e.name;
    const value = e.target ? e.target.value : e.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    setFormData(historyData); 
  }, [historyData]);


  const handleEditFeeHistory = (e) => {
    e.preventDefault();

    dispatch(feesHistoryUpdation(formData._id, formData)) 
      .then(() => {
        toast.success('fee history updated successfully!', {
          onClose: () => {
            window.location.reload();
          }
        });
      })
      .catch(error => {
        toast.error('Failed to update fee history!', error);
      });
  };

if (!isOpen) return null; 

  return (
    <dialog className="modal" open>
      <div className="modal-box overflow-auto h-auto">
        <h3 className="font-bold text-lg">Edit Fees History</h3>
        <form className="py-4" onSubmit={handleEditFeeHistory}>
          <label className="block text-gray-700">Fee Name</label>
          <input
            required
            type="text"
            placeholder="Fee Name"
            className="input input-bordered w-full mb-2"
            onChange={handleInputChange}
            name='feeName'
            value={formData.feeName}
          />
          <label className="block text-gray-700">Amount</label>
          <input
            required
            type="number"
            placeholder="Amount"
            className="input input-bordered w-full mb-2"
            onChange={handleInputChange}
            name='amount'
            value={formData.amount}
          />
          <label className="block text-gray-700">Student Name</label>
          <input
            required
            type="text"
            placeholder="Student Name"
            className="input input-bordered w-full mb-2"
            onChange={handleInputChange}
            name='studentName'
            value={formData.studentName}
          />
          <label className="block text-gray-700">Student ID</label>
          <input
            required
            type="number"
            placeholder="Student ID"
            className="input input-bordered w-full mb-2"
            onChange={handleInputChange}
            name='studentID'
            value={formData.studentID}
          />
          <label className="block text-gray-700">Section</label>
          <Select
            options={sectionOptions}
            placeholder="Select Standard"
            className="input w-full p-[1px] h-[42px]"
            onChange={(selectedOption) => handleSelectChange({ name: 'section', value: selectedOption.value })}
            value={sectionOptions.find(option => option.value === formData.section)}
          />
          <label className="block text-gray-700">Paid Date</label>
          <input
            required
            type="date"
            className="input input-bordered w-full mb-2"
            onChange={handleInputChange}
            name='paidDate'
            value={formData.paidDate}
          />
          <div className="modal-action">
            <button type='submit' className="btn bg-indigo-950 text-white hover:bg-indigo-50 hover:text-black">
              Save
            </button>
            <button type='button' className="btn bg-gray-300 text-black hover:bg-gray-400" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default EditFeesHistoryModal;
