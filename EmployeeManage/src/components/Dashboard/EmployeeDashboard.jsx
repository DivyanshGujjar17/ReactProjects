import React, { useContext, useState, useEffect } from 'react';
import Header from '../other/Header';
import TasklistNumber from '../other/TasklistNumber';
import TaskList from '../TaskList/TaskList';
import { AuthContext } from '../../context/AuthProvider';

function EmployeeDashboard({ data, changeuser }) {
  const [userdata, setUserdata] = useContext(AuthContext);
  const [showRequests, setShowRequests] = useState(false);
  const [taskRequests, setTaskRequests] = useState([]);

  useEffect(() => {
    // Load task requests for this employee from admin data
    const adminData = JSON.parse(localStorage.getItem('admin'));
    if (adminData && adminData.requests) {
      const employeeRequests = adminData.requests.filter(
        request => request.employeeId === data.id
      );
      setTaskRequests(employeeRequests);
    }
  }, [data.id]);

  const updateTaskStatus = (taskIndex, newStatus) => {
    if (!data.tasks || !Array.isArray(data.tasks)) return;

    const updatedTasks = [...data.tasks];
    const task = updatedTasks[taskIndex];

    // Find current status
    let currentStatus = null;
    if (task.active) currentStatus = 'active';
    else if (task.newTask) currentStatus = 'newTask';
    else if (task.completed) currentStatus = 'completed';
    else if (task.failure) currentStatus = 'failure';

    // Reset all status flags
    task.active = false;
    task.newTask = false;
    task.completed = false;
    task.failure = false;

    // Set new status
    switch (newStatus) {
      case 'active':
        task.active = true;
        break;
      case 'newTask':
        task.newTask = true;
        break;
      case 'completed':
        task.completed = true;
        break;
      case 'failure':
        task.failure = true;
        break;
      default:
        break;
    }

    // Update task count
    const updatedTaskCount = { ...data.taskCount };
    if (currentStatus) {
      updatedTaskCount[currentStatus] = Math.max(0, (updatedTaskCount[currentStatus] || 0) - 1);
    }
    updatedTaskCount[newStatus] = (updatedTaskCount[newStatus] || 0) + 1;

    const updatedData = {
      ...data,
      tasks: updatedTasks,
      taskCount: updatedTaskCount,
    };

    // Update localStorage
    const employees = JSON.parse(localStorage.getItem('employee'));
    const updatedEmployees = employees.map(emp => 
      emp.id === data.id ? updatedData : emp
    );
    localStorage.setItem('employee', JSON.stringify(updatedEmployees));

    // Update context
    setUserdata(prev => ({
      ...prev,
      employeedata: updatedEmployees
    }));
  };

  const handleRequestAction = (requestId, action) => {
    // Update the request status in admin data
    const adminData = JSON.parse(localStorage.getItem('admin'));
    const updatedRequests = adminData.requests.map(request => {
      if (request.id === requestId) {
        return { ...request, status: action };
      }
      return request;
    });

    adminData.requests = updatedRequests;
    localStorage.setItem('admin', JSON.stringify(adminData));

    // Update local state
    setTaskRequests(updatedRequests.filter(request => request.employeeId === data.id));

    // If accepted, add the task to employee's task list
    if (action === 'accepted') {
      const request = adminData.requests.find(req => req.id === requestId);
      if (request) {
        const newTask = {
          taskTitle: request.taskTitle,
          taskDescription: request.taskDescription,
          taskDate: request.requestDate,
          category: request.category,
          active: false,
          newTask: true,
          completed: false,
          failure: false
        };

        const updatedTasks = [...data.tasks, newTask];
        const updatedTaskCount = {
          ...data.taskCount,
          newTask: (data.taskCount.newTask || 0) + 1,
        };

        const updatedData = {
          ...data,
          tasks: updatedTasks,
          taskCount: updatedTaskCount,
        };

        // Update localStorage
        const employees = JSON.parse(localStorage.getItem('employee'));
        const updatedEmployees = employees.map(emp => 
          emp.id === data.id ? updatedData : emp
        );
        localStorage.setItem('employee', JSON.stringify(updatedEmployees));

        // Update context
        setUserdata(prev => ({
          ...prev,
          employeedata: updatedEmployees
        }));
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'accepted': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const pendingRequestCount = taskRequests.filter(request => request.status === 'pending').length;

  return (
    <div className="min-h-screen bg-gray-900">
      <Header 
        data={data} 
        changeuser={changeuser} 
        onShowRequests={() => setShowRequests(!showRequests)}
        requestCount={pendingRequestCount}
      />
      
      {showRequests && (
        <div className="bg-white mx-6 rounded-lg shadow-md mb-6">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Task Requests</h2>
            {taskRequests.length > 0 ? (
              <div className="space-y-4">
                {taskRequests.map(request => (
                  <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-gray-900">{request.taskTitle}</h3>
                        <p className="text-sm text-gray-600">{request.taskDescription}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Request Date: {request.requestDate}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </span>
                        {request.status === 'pending' && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleRequestAction(request.id, 'accepted')}
                              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs transition-colors"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleRequestAction(request.id, 'rejected')}
                              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs transition-colors"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No task requests found.</p>
            )}
          </div>
        </div>
      )}

      <TasklistNumber data={data} />
      <TaskList data={data} updateTaskStatus={updateTaskStatus} />
    </div>
  );
}

export default EmployeeDashboard;
