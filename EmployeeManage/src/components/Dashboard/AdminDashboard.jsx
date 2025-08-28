// components/Dashboard/AdminDashboard.jsx
import React, { useState } from 'react';

function AdminDashboard({ changeuser, data, updateData, allEmployees }) {
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [showRequests, setShowRequests] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    changeuser('');
  };

  const createTaskRequest = (employeeId, title, description) => {
    const employee = allEmployees.find(emp => emp.id === employeeId);
    if (!employee) return;

    const newRequest = {
      id: Date.now().toString(),
      employeeId: employeeId,
      employeeName: employee.name,
      employeeEmail: employee.email,
      taskTitle: title,
      taskDescription: description,
      requestDate: new Date().toISOString().split('T')[0],
      status: 'pending', // pending, accepted, rejected
      category: "General"
    };

    // Add request to admin's requests array
    const updatedAdminData = {
      ...data,
      requests: [...(data.requests || []), newRequest]
    };

    // Update admin data in localStorage
    const adminData = JSON.parse(localStorage.getItem('admin'));
    adminData.requests = updatedAdminData.requests;
    localStorage.setItem('admin', JSON.stringify(adminData));

    // Update context
    updateData(updatedAdminData, data);
    
    // Reset form
    setSelectedEmployee('');
    setTaskTitle('');
    setTaskDescription('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedEmployee && taskTitle && taskDescription) {
      createTaskRequest(selectedEmployee, taskTitle, taskDescription);
    }
  };

  const handleRequestAction = (requestId, action) => {
    const updatedRequests = data.requests.map(request => {
      if (request.id === requestId) {
        return { ...request, status: action };
      }
      return request;
    });

    const updatedAdminData = {
      ...data,
      requests: updatedRequests
    };

    // Update admin data in localStorage
    const adminData = JSON.parse(localStorage.getItem('admin'));
    adminData.requests = updatedRequests;
    localStorage.setItem('admin', JSON.stringify(adminData));

    // Update context
    updateData(updatedAdminData, data);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'accepted': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const pendingRequestCount = data.requests ? data.requests.filter(request => request.status === 'pending').length : 0;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setShowRequests(!showRequests)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition-colors relative"
            >
              {showRequests ? 'Hide Requests' : 'View Requests'}
              {pendingRequestCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                  {pendingRequestCount}
                </span>
              )}
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {showRequests && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">Task Requests</h2>
            {data.requests && data.requests.length > 0 ? (
              <div className="space-y-4">
                {data.requests.map(request => (
                  <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-gray-900">{request.taskTitle}</h3>
                        <p className="text-sm text-gray-600">{request.taskDescription}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Requested for: {request.employeeName} ({request.employeeEmail})
                        </p>
                        <p className="text-xs text-gray-500">
                          Date: {request.requestDate}
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
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Task Assignment Form */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Create Task Request</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Employee
                </label>
                <select
                  value={selectedEmployee}
                  onChange={(e) => setSelectedEmployee(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Choose an employee...</option>
                  {allEmployees && Array.isArray(allEmployees) ? (
                    allEmployees.map(emp => (
                      <option key={emp.id} value={emp.id}>
                        {emp.name} ({emp.email})
                      </option>
                    ))
                  ) : null}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Task Title
                </label>
                <input
                  type="text"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter task title"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Task Description
                </label>
                <textarea
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter task description"
                  rows="3"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors"
              >
                Create Request
              </button>
            </form>
          </div>

          {/* Employee List */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Employee Overview</h2>
            {allEmployees && Array.isArray(allEmployees) ? (
              <div className="space-y-4">
                {allEmployees.map(emp => (
                  <div key={emp.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-gray-900">{emp.name}</h3>
                        <p className="text-sm text-gray-600">{emp.email}</p>
                      </div>
                      <button
                        onClick={() => createTaskRequest(emp.id, `Quick Task for ${emp.name}`, `Auto-generated task for ${emp.name}`)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        Quick Request
                      </button>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-xs">
                      <div className="text-center">
                        <div className="font-semibold text-blue-600">{emp.taskCount?.newTask || 0}</div>
                        <div className="text-gray-500">New</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-green-600">{emp.taskCount?.active || 0}</div>
                        <div className="text-gray-500">Active</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-purple-600">{emp.taskCount?.completed || 0}</div>
                        <div className="text-gray-500">Completed</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-red-600">{emp.taskCount?.failure || 0}</div>
                        <div className="text-gray-500">Failed</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No employees found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
