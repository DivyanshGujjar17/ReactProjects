import React from 'react'

function AcceptTask({ data, taskIndex, updateTaskStatus }) {
  const handleComplete = () => {
    updateTaskStatus(taskIndex, 'completed');
  };

  const handleFail = () => {
    updateTaskStatus(taskIndex, 'failure');
  };

  return (
    <div className='flex-shrink-0 h-full w-[300px] rounded-xl bg-blue-100 border-2 border-blue-300 shadow-lg'>
      <div className='flex justify-between items-center py-3 px-4 bg-blue-500 rounded-t-xl'>
        <h3 className='bg-white text-blue-600 rounded-md px-3 py-1 text-sm font-medium'>{data.category}</h3>
        <h4 className='text-white text-sm'>{data.taskDate}</h4>
      </div>
      <div className='p-4'>
        <h2 className='text-xl font-semibold text-gray-800 mb-3'>{data.taskTitle}</h2>
        <p className='text-sm text-gray-600 mb-6 leading-relaxed'>
          {data.taskDescription}
        </p>
        
        <div className='flex justify-between gap-2'>
          <button 
            onClick={handleComplete}
            className='bg-green-500 hover:bg-green-600 text-white px-4 py-3 text-sm rounded-lg font-medium transition-colors shadow-md flex-1'
          >
            Mark Complete
          </button>
          <button 
            onClick={handleFail}
            className='bg-red-500 hover:bg-red-600 text-white px-4 py-3 text-sm rounded-lg font-medium transition-colors shadow-md flex-1'
          >
            Mark Failed
          </button>
        </div>
      </div>
    </div> 
  )
}

export default AcceptTask
