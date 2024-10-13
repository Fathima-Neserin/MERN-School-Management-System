import React, { useEffect, useState } from 'react';
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const [role, setRole] = useState('');

  useEffect(()=>{
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    if(userInfo && userInfo.data && userInfo.data.role){
      setRole(userInfo.data.role[0]);
    }
  },[])
  return (
    <div className="bg-base-300 shadow-lg mr-[8px] h-15">
      <header className="w-screen max-w-6xl mx-5 flex justify-between items-center px-4 py-2">
        <h1 className="text-2xl font-bold text-indigo-600">
        {role === 'Admin' ? 'Admin Dashboard' :
         role === 'Staff' ? 'Staff Dashboard' :
         role === 'Librarian' ? 'Librarian Dashboard' : null }
          </h1>
        
       <button className='mr-10 text-2xl text-indigo-600'><FaUserCircle/></button>
      
    
      </header>
    </div>
  );
}

export default Header;
