import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';

function AllTasks() {
  const [userdata] = useContext(AuthContext);

  return (
    <div id="Alltask" className="bg-[#1c1c1c] p-5 rounded mt-5">
      <div className="bg-red-400 mb-2 py-2 px-4 flex justify-between rounded-md">
        <h2 className="w-1/5">Employee</h2>
        <h3 className="w-1/5">NewTask</h3>
        <h5 className="w-1/5">ActiveTask</h5>
        <h5 className="w-1/5">CompleteTask</h5>
        <h5 className="w-1/5">FailedTask</h5>
      </div>
      <div id="employeetask">
        {userdata?.employeedata?.map((elem, idx) => (
          <div
            key={idx}
            className="bg-emerald-400 mb-2 py-2 px-4 flex justify-between rounded-md"
          >
            <h2 className="text-xl font-semibold w-1/5 text-blue-900">{elem.name}</h2>
            <h3 className="text-xl font-semibold w-1/5 text-yellow-900">{elem.taskCount.newTask}</h3>
            <h5 className="text-xl font-semibold w-1/5 text-green-900">{elem.taskCount.active}</h5>
            <h5 className="text-xl font-semibold w-1/5 text-purple-900">{elem.taskCount.completed}</h5>
            <h5 className="text-xl font-semibold w-1/5 text-red-600">{elem.taskCount.failure}</h5>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllTasks;
