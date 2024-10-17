import React from 'react';

const Card = ({ title, count, Icon, onClick, redirect}) => {
  return (
    <div className="max-w-lg mx-auto">
      <div className="card card-side bg-gray-50 shadow-lg p-4 flex items-center ml-14" onClick={redirect}>
        <Icon className="h-16 w-16 text-indigo-950" />
        <div className="card-body">
          <h2 className="card-title text-2xl font-semibold">{title}</h2>
          <p className="text-lg font-medium">{count}</p>
          <div className="mr-[25px] mt-10 card-actions justify-center">
            <button
              className="btn bg-indigo-950 text-white hover:bg-indigo-50 hover:text-black"
              onClick={onClick} // Call the function passed via props
            >
              + New {title}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
