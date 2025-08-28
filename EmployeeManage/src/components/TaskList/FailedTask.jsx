import React from 'react'

function FailedTask({ data, taskIndex, updateTaskStatus }) {
  const handleRetry = () => {
    updateTaskStatus(taskIndex, 'active');
  };

  return (
    <div className='flex-shrink-0 h-full w-[300px] rounded-xl bg-yellow-100 border-2 border-yellow-300 shadow-lg'>
      <div className='flex justify-between items-center py-3 px-4 bg-yellow-500 rounded-t-xl'>
        <h3 className='bg-white text-yellow-600 rounded-md px-3 py-1 text-sm font-medium'>{data.category}</h3>
        <h4 className='text-white text-sm'>{data.taskDate}</h4>
      </div>
      <div className='p-4'>
        <h2 className='text-xl font-semibold text-gray-800 mb-3'>{data.taskTitle}</h2>
        <p className='text-sm text-gray-600 mb-4 leading-relaxed'>
          {data.taskDescription}
        </p>
        <div className='flex items-center justify-center'>
          <button 
            onClick={handleRetry}
            className='bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 text-sm rounded-lg font-medium transition-colors shadow-md'
          >
            Retry Task
          </button>
        </div>
      </div>
    </div> 
  )
}

export default FailedTask
