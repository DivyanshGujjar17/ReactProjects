import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';

function CreateTask() {
  const [userdata, setUserdata] = useContext(AuthContext);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [assignto, setAssignto] = useState('');
  const [category, setCategory] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const SubmitHandler = (e) => {
    e.preventDefault();
    if (!taskTitle || !taskDate || !assignto || !category || !taskDescription) {
      alert('Please fill out all fields.');
      return;
    }
    const task = {
      taskTitle,
      taskDate,
      taskDescription,
      category,
      active: false,
      newTask: true,
      completed: false,
      failure: false,
    };
    const data = JSON.parse(localStorage.getItem('employee')) || [];

    data.forEach((elem) => {
      if (assignto === elem.name) {
        if (!Array.isArray(elem.tasks)) elem.tasks = [];
        elem.tasks.push(task);
        elem.taskCount.active += 1;
        elem.taskCount.newTask += 1;
      }
    });
    localStorage.setItem('employee', JSON.stringify(data));
    if (userdata?.admindata) setUserdata({ employeedata: data, admindata: userdata.admindata });

    setTaskTitle('');
    setTaskDate('');
    setAssignto('');
    setCategory('');
    setTaskDescription('');
  };

  return (
    <div>
      <form
        onSubmit={SubmitHandler}
        className="flex flex-wrap bg-[#1c1c1c] items-start justify-between rounded-md w-full px-4 py-4"
      >
        <div className="w-[50%]">
          <div>
            <h3 className="text-sm text-gray-300 mb-0.5">Task Title</h3>
            <input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              type="text"
              placeholder="Enter the Task"
              className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border border-gray-400 mb-4"
            />
          </div>
          <div>
            <h3 className="text-sm text-gray-300 mb-0.5">Date</h3>
            <input
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              type="date"
              className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border border-gray-400 mb-4"
            />
          </div>
          <div>
            <h3 className="text-sm text-gray-300 mb-0.5">Assign to</h3>
            <input
              value={assignto}
              onChange={(e) => setAssignto(e.target.value)}
              type="text"
              placeholder="Employee Name"
              className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border border-gray-400 mb-4"
            />
          </div>
          <div>
            <h3 className="text-sm text-gray-300 mb-0.5">Category</h3>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              type="text"
              placeholder="design,dev,etc"
              className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border border-gray-400 mb-4"
            />
          </div>
        </div>
        <div className="w-[50%] flex flex-col gap-2">
          <h3 className="text-sm text-gray-300 mb-0.5">Description</h3>
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            cols={30}
            rows={8}
            placeholder="Enter the Description"
            className="bg-[#1c1c1c] border border-gray-400 rounded-md text-sm p-2 text-white"
          ></textarea>
          <button className="w-full bg-emerald-600 rounded-md text-white py-1">Create Task</button>
        </div>
      </form>
    </div>
  );
}

export default CreateTask;
