import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Select from "react-select";
import { studentUpdation } from '../../actions/student.actions';
import { toast } from 'react-toastify';

const genderOptions = [
  { value: 'Boy', label: 'Boy' },
  { value: 'Girl', label: 'Girl' }
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

const EditStudentModal = ({ showModal, closeModal, studentData }) => {

  const dispatch = useDispatch();

  const [formData, setFormData] = useState(studentData);

  const handleInputChange = (e) => {
    const name = e.target ? e.target.name : e.name;
    const value = e.target ? e.target.value : e.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleEditStudent = (e) => {
    e.preventDefault();
    
    dispatch(studentUpdation(formData._id, formData)) 
      .then(() => {
        
        toast.success('Student updated successfully!', {
          onClose: () => {
            
            window.location.reload();
          }
        });
      })}
  if (!showModal) return null;

  return (
    <dialog className="modal" open>
      <div className="modal-box overflow-auto h-auto">
        <h3 className="font-bold text-lg">Edit Student</h3>
        <form className="py-4" onSubmit={handleEditStudent}>
        <label className="block text-gray-700">Student ID</label>
          <input
            required
            type="number"
            placeholder="Student ID"
            className="input input-bordered w-full mb-2"
            onChange={handleInputChange}
            name='studentId'
            value={formData.studentId}
          />
        <label className="block text-gray-700">Name</label>
          <input
            required
            type="text"
            placeholder="Name"
            className="input input-bordered w-full mb-2"
            onChange={handleInputChange}
            name='studentName'
            value={formData.studentName}
          />
        <label className="block text-gray-700">Age</label>  
          <input
            required
            type="number"
            placeholder="age"
            className="input input-bordered w-full mb-2"
            onChange={handleInputChange}
            name='age'
            value={formData.age}
          />
        <label className="block text-gray-700">Name</label>
          <input
            required
            type="date"
            placeholder="Date of Birth"
            className="input input-bordered w-full mb-2"
            onChange={handleInputChange}
            name='dob'
            value={formData.dob}
          />
        <label className="block text-gray-700">Place</label>
          <input
            required
            type="text"
            placeholder="Place"
            className="input input-bordered w-full mb-2"
            onChange={handleInputChange}
            name='place'
            value={formData.place}
          />
        <label className="block text-gray-700">Contact Number</label>
          <input
            required
            type="number"
            placeholder="Contact Number"
            className="input input-bordered w-full mb-2"
            onChange={handleInputChange}
            name='contactNumber'
            value={formData.contactNumber}
          />
        <label className="block text-gray-700">Gender</label>
          <Select
            required
            options={genderOptions}
            placeholder="Select Gender"
            className="input w-full p-[1px] h-[42px]"
            onChange={(selectedOption) => handleInputChange({ name: 'gender', value: selectedOption.value })}
            value={genderOptions.find(option => option.value === formData.gender)}
          />
        <label className="block text-gray-700">Standard</label>  
          <Select
            required
            options={stdOptions}
            placeholder="Select Standard"
            className="input w-full p-[1px] h-[42px]"
            onChange={(selectedOption) => handleInputChange({ name: 'standard', value: selectedOption.value })}
            value={stdOptions.find(option => option.value === formData.standard)}
          />
          <div className="modal-action">
            <button type='submit' className="btn bg-indigo-950 text-white hover:bg-indigo-50 hover:text-black">
              Save
            </button>
            <button type='button' className="btn bg-gray-300 text-black hover:bg-gray-400" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default EditStudentModal;
