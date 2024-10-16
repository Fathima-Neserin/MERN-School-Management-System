import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RiSchoolFill } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { TbLogout } from "react-icons/tb";
import { IoPeopleOutline, IoPersonOutline } from "react-icons/io5";
import { FaChildren } from "react-icons/fa6";
import { useDispatch, useSelector} from "react-redux";
import { LOGOUT } from '../../actions/auth.actions';

const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.auth);
  const { userInfo } = userLogin;
  
  const handleUserLogout = () => {
    dispatch(LOGOUT(navigate)); // Dispatch the logout action
  };
  

  // List of menu items
  const menuItems = [
    { label: "Dashboard", icon: <RxDashboard className="text-lg" />, link: "/admin/dashboard" },
    { label: "Staffs", icon: <IoPeopleOutline className="text-lg" />, link: "/admin/staffs" },
    { label: "Librarians", icon: <IoPersonOutline className="text-lg" />, link: "/admin/librarians" },
    { label: "Students", icon: <FaChildren className="text-lg" />, link: "/admin/students" },
    { label: "Logout", icon: <TbLogout className="text-lg" />, link: "/" }
  ];

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Main content can go here */}
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <div className="p-6 bg-gray-50 w-80 h-[100%]">
          {/* Header Section */}
          <div className="flex items-center space-x-8 mb-6">
            <RiSchoolFill className="text-6xl text-indigo-950" />
            <div>
              <span className="text-xl font-bold block text-indigo-950">Teressa Memorial</span>
              <span className="text-xl font-bold block text-indigo-950">Higher Secondary School</span>
            </div>
          </div>

          {/* Menu Items */}
          <ul className="menu text-base-content space-y-4">
  {menuItems.map((item, index) => (
    <li key={index}>
      {item.label === "Logout" ? (
        <button
          onClick={handleUserLogout}
          className="flex items-center space-x-9 p-2 rounded-lg hover:bg-indigo-100 hover:text-black"
        >
          {item.icon}
          <span>{item.label}</span>
        </button>
      ) : (
        <a
          href={item.link}
          className="flex items-center space-x-9 p-2 rounded-lg hover:bg-indigo-100 hover:text-black"
        >
          {item.icon}
          <span>{item.label}</span>
        </a>
      )}
    </li>
  ))}
</ul>

        </div>
      </div>
    </div>
  );
}

export default SideBar;
