import React from 'react'
import AcceptTask from './AcceptTask'
import NewTask from './NewTask';
import CompleteTask from './CompleteTask'
import FailedTask from './FailedTask';

function TaskList({ data, updateTaskStatus }) {
  return (
    <div id="tasklist" className='flex overflow-x-auto items-center justify-start h-[52%] mt-8 py-2 gap-5 rounded-xl w-screen flex-nowrap'>
      {data.tasks && data.tasks.map((elem, idx) => {
        if (elem.active) {
          return <AcceptTask key={idx} data={elem} taskIndex={idx} updateTaskStatus={updateTaskStatus} />
        }
        if (elem.newTask) {
          return <NewTask key={idx} data={elem} taskIndex={idx} updateTaskStatus={updateTaskStatus} />
        }
        if (elem.completed) {
          return <CompleteTask key={idx} data={elem} taskIndex={idx} updateTaskStatus={updateTaskStatus} />
        } 
        if (elem.failure) {
          return <FailedTask key={idx} data={elem} taskIndex={idx} updateTaskStatus={updateTaskStatus} />
        }
        return null;
      })}
    </div>
  )
}

export default TaskList
