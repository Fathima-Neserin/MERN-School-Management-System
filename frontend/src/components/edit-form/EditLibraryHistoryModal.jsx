import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Select from "react-select";
import { toast } from 'react-toastify';
import { libraryHistoryUpdation } from '../../actions/library.actions';


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
]


const statusOptions = [
    { value: 'Available', label: 'Available' },
    { value: 'Not Available', label: 'Not Available' }
  ];

const EditLibraryHistoryModal = ({ isOpen, onClose, historyData }) => {
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


  const handleEditLibraryHistory = (e) => {
    e.preventDefault();

    dispatch(libraryHistoryUpdation(formData._id, formData)) 
      .then(() => {
        toast.success('Library history updated successfully!', {
          onClose: () => {
            window.location.reload();
          }
        });
      })
      .catch(error => {
        toast.error('Failed to update library history!', error);
      });
  };

if (!isOpen) return null; 

  return (
    <dialog className="modal" open>
      <div className="modal-box overflow-auto h-auto">
        <h3 className="font-bold text-lg">Edit Library History</h3>
        <form className="py-4" onSubmit={handleEditLibraryHistory}>
          <label className="block text-gray-700">Book ID</label>
          <input
            required
            type="text"
            placeholder="Book ID"
            className="input input-bordered w-full mb-2"
            onChange={handleInputChange}
            name='bookId'
            value={formData.bookId}
          />
          <label className="block text-gray-700">Book Name</label>
          <input
            required
            type="text"
            placeholder="Book Name"
            className="input input-bordered w-full mb-2"
            onChange={handleInputChange}
            name='bookName'
            value={formData.bookName}
          />
          <label className="block text-gray-700">Borrowed By</label>
          <input
            required
            type="text"
            placeholder="Borrowed By"
            className="input input-bordered w-full mb-2"
            onChange={handleInputChange}
            name='borrowedStudent'
            value={formData.borrowedStudent}
          />
          <label className="block text-gray-700">Student ID</label>
          <input
            required
            type="text"
            placeholder="Student ID"
            className="input input-bordered w-full mb-2"
            onChange={handleInputChange}
            name='studentID'
            value={formData.studentID}
          />
          <label className="block text-gray-700">Standard</label>
          <Select
            options={stdOptions}
            placeholder="Select Standard"
            className="input w-full p-[1px] h-[42px]"
            onChange={(selectedOption) => handleInputChange({ name: 'standard', value: selectedOption.value })}
            value={stdOptions.find(option => option.value === formData.standard)}
          />
          <label className="block text-gray-700">Borrowed Date</label>
          <input
            required
            type="date"
            className="input input-bordered w-full mb-2"
            onChange={handleInputChange}
            name='borrowedDate'
            value={formData.borrowedDate}
          />
          <label className="block text-gray-700">Return Date</label>
          <input
            required
            type="date"
            className="input input-bordered w-full mb-2"
            onChange={handleInputChange}
            name='returnDate'
            value={formData.returnDate}
          />
            <label className="block text-gray-700">Available Count</label>
          <input
            required
            type="number"
            className="input input-bordered w-full mb-2"
            onChange={handleInputChange}
            name='availableCount'
            value={formData.availableCount}
          />
            <label className="block text-gray-700">Total Count</label>
          <input
            required
            type="number"
            className="input input-bordered w-full mb-2"
            onChange={handleInputChange}
            name='totalCount'
            value={formData.totalCount}
          />
          <label className="block text-gray-700">Status</label>
          <Select
            required
            options={statusOptions}
            placeholder="Select Status"
            className="input w-full p-[1px] h-[42px] mb-2"
            onChange={(selectedOption) => handleSelectChange('status', selectedOption)} // Correct the key for status
            value={statusOptions.find(option => option.value === formData.status)}
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

export default EditLibraryHistoryModal;
