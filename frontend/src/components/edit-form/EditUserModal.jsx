import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from "react-select";
import { existingUserUpdation } from '../../actions/user.actions';


const roleOptions = [
  { value: 'Staff', label: 'Staff' },
  { value: 'Librarian', label: 'Librarian' }
];

const genderOptions = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' }
];

const EditUserModal = ({ user, isOpen, onClose, onSuccess }) => {

  const dispatch = useDispatch();

  const userUpdate = useSelector((state) => state.userUpdate);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    phoneNumber: '',
    gender: '',
    role: '',
    password:''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        username: user.username,
        phoneNumber: user.phoneNumber,
        gender: user.gender,
        role: user.role[0],
        
      });
    }
  }, [user]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (selectedOption, field) => {
    setFormData({ ...formData, [field.name]: selectedOption.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(existingUserUpdation(user._id, formData))
    console.log("Updated user data:", formData);
    onClose(); // Close the modal after submission
    onSuccess();
  };

  return (
    <div className={`fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center ${isOpen ? 'block' : 'hidden'}`}>
      <div className="bg-white p-5 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl mb-4">Edit User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">New Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-2">
          <Select
            options={roleOptions}
            placeholder="Select Role"
            className="input w-full p-[1px] h-[42px]" 
            onChange={(option) => handleSelectChange(option, { name: 'role' })}
            value={roleOptions.find(option => option.value === formData.role)}
          />
          </div>
          <div className="mb-2">
          <Select
            options={genderOptions}
            placeholder="Select Gender"
            className="input w-full p-[1px] h-[42px]" 
            onChange={(option) => handleSelectChange(option, { name: 'gender' })}
            value={genderOptions.find(option => option.value === formData.gender)}
          />
          </div>
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-indigo-50 text-black rounded">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-indigo-950 text-white rounded">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
