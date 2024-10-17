import React, { useEffect, useState } from 'react';

const Header = () => {
  const [role, setRole] = useState('');

  useEffect(()=>{
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    if(userInfo && userInfo.data && userInfo.data.role){
      setRole(userInfo.data.role[0]);
    }
  },[])
  return (
    <div className="bg-indigo-950 shadow-lg mr-[8px] h-15">
      <header className="w-screen max-w-6xl mx-5 flex justify-between items-center px-4 py-2">
        <h1 className="text-2xl font-bold text-white">
        {role === 'Admin' ? 'Admin Dashboard' :
         role === 'Staff' ? 'Staff Dashboard' :
         role === 'Librarian' ? 'Librarian Dashboard' : null }
          </h1>      
    
      </header>
    </div>
  );
}

export default Header;
