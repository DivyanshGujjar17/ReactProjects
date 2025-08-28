import React from 'react';

function TasklistNumber({ data }) {
  return (
    <div className='flex flex-wrap justify-center gap-4 px-6 mt-10'>
      <div className='rounded-xl w-full sm:w-[200px] bg-red-400 px-4 py-6 shadow-lg hover:shadow-xl transition-shadow'>
        <h2 className='text-3xl font-bold text-white text-center'>{data.taskCount?.newTask || 0}</h2>
        <h3 className='text-lg font-medium text-white text-center'>New Tasks</h3>
      </div>
      <div className='rounded-xl w-full sm:w-[200px] bg-blue-400 px-4 py-6 shadow-lg hover:shadow-xl transition-shadow'>
        <h2 className='text-3xl font-bold text-white text-center'>{data.taskCount?.completed || 0}</h2>
        <h3 className='text-lg font-medium text-white text-center'>Completed</h3>
      </div>
      <div className='rounded-xl w-full sm:w-[200px] bg-green-400 px-4 py-6 shadow-lg hover:shadow-xl transition-shadow'>
        <h2 className='text-3xl font-bold text-white text-center'>{data.taskCount?.active || 0}</h2>
        <h3 className='text-lg font-medium text-white text-center'>Active Tasks</h3>
      </div>
      <div className='rounded-xl w-full sm:w-[200px] bg-yellow-400 px-4 py-6 shadow-lg hover:shadow-xl transition-shadow'>
        <h2 className='text-3xl font-bold text-white text-center'>{data.taskCount?.failure || 0}</h2>
        <h3 className='text-lg font-medium text-white text-center'>Failed Tasks</h3>
      </div>
    </div>
  );
}

export default TasklistNumber;