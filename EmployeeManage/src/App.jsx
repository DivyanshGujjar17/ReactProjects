// App.jsx
import { useContext, useEffect, useState } from 'react';
import Login from './components/Auth/Login';
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import { AuthContext } from './context/AuthProvider';
import './App.css';
import { SetLocalStorage } from './utils/LocalStorage';
function App() {
  const [user, setUser] = useState('');
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const [userdata, setUserdata] = useContext(AuthContext);
  
  const handleLogin = (email, password) => {
    if (email === 'admin@example.com' && password === 'admin@123') {
      setUser('admin');
      setLoggedInUserData(userdata?.admindata || null);
      localStorage.setItem('loggedInUser', JSON.stringify({ role: 'admin' }));
    } else if (userdata && Array.isArray(userdata.employeedata)) {
      const employee = userdata.employeedata.find(
        (e) => e.email === email && e.password === password
      );
      if (employee) {
        setUser('employee');
        setLoggedInUserData(employee);
        localStorage.setItem(
          'loggedInUser',
          JSON.stringify({ role: 'employee', employee })
        );
      } else {
        alert('Invalid Credentials');
      }
    }
  };
  
  const updateData = (updatedEmployee, updatedAdmin) => {
    if (userdata && Array.isArray(userdata.employeedata)) {
      const updatedEmployees = userdata.employeedata.map(emp => 
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      );
      const newUserdata = {
        ...userdata,
        employeedata: updatedEmployees,
        admindata: updatedAdmin || userdata.admindata
      };
      setUserdata(newUserdata);
      
      // Update localStorage
      localStorage.setItem('employee', JSON.stringify(updatedEmployees));
      if (updatedAdmin) {
        localStorage.setItem('admin', JSON.stringify(updatedAdmin));
      }
      
      // Update logged in user data if it's the current user
      if (user === 'employee' && loggedInUserData && loggedInUserData.id === updatedEmployee.id) {
        setLoggedInUserData(updatedEmployee);
        localStorage.setItem(
          'loggedInUser',
          JSON.stringify({ role: 'employee', employee: updatedEmployee })
        );
      } else if (user === 'admin' && updatedAdmin) {
        setLoggedInUserData(updatedAdmin);
      }
    }
  };

  const updateAdminData = (updatedAdmin) => {
    if (userdata) {
      const newUserdata = {
        ...userdata,
        admindata: updatedAdmin
      };
      setUserdata(newUserdata);
      localStorage.setItem('admin', JSON.stringify(updatedAdmin));
      
      if (user === 'admin') {
        setLoggedInUserData(updatedAdmin);
      }
    }
  };
  
  useEffect(() => {
    SetLocalStorage();
  }, []);
  
  useEffect(() => {
    const stored = localStorage.getItem('loggedInUser');
    if (stored && userdata) {
      const parsedUser = JSON.parse(stored);
      setUser(parsedUser.role);
      if (parsedUser.role === 'employee') {
        setLoggedInUserData(parsedUser.employee || null);
      } else if (parsedUser.role === 'admin') {
        setLoggedInUserData(userdata.admindata || null);
      }
    }
  }, [userdata]);
  
  return (
    <>
      {!user && <Login handlelogin={handleLogin} />}
      {user === 'admin' && loggedInUserData ? (
        <AdminDashboard 
          changeuser={setUser} 
          data={loggedInUserData} 
          updateData={updateAdminData}
          allEmployees={userdata?.employeedata || []}
        />
      ) : user === 'employee' && loggedInUserData ? (
        <EmployeeDashboard changeuser={setUser} data={loggedInUserData} />
      ) : null}
    </>
  );
}
export default App;
