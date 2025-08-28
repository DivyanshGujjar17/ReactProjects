import React from 'react';

function Header({ data, changeuser, onShowRequests, requestCount = 0 }) {
  const logoutUser = () => {
    localStorage.removeItem('loggedInUser');
    changeuser('');
  };
  
  return (
    <div className='flex items-end justify-between p-6'>
      <h1 className='text-2xl font-bold text-white'>Hello <br /> {data.name},👋 </h1>
      <div className=' flex gap-5'>
      <button 
        onClick={onShowRequests} 
        className='bg-emerald-600 hover:bg-emerald-700 text-lg rounded-full px-4 py-2 font-semibold transition-colors relative'
      >
        Requested Tasks
        {requestCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
            {requestCount}
          </span>
        )}
      </button>
      <button onClick={logoutUser} className='bg-red-600 hover:bg-red-700 text-lg font-medium text-white px-4 py-2 rounded-full transition-colors'>Log Out</button>
      </div>
    </div>
  );
}

export default Header;
