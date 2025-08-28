# Employee Management System

A React-based employee management system with task assignment and tracking capabilities.

## Features

- **Admin Dashboard**: Assign tasks to employees and view employee overview
- **Employee Dashboard**: View and manage assigned tasks
- **Task Management**: Track task status (New, Active, Completed, Failed)
- **Responsive Design**: Works on desktop and mobile devices
- **Local Storage**: Data persists between sessions

## Fixed Issues

### 1. App.jsx
- Added missing `updateData` and `allEmployees` props for AdminDashboard
- Implemented proper data management and state updates
- Fixed login logic and user session handling

### 2. AdminDashboard.jsx
- Added proper task assignment functionality
- Improved UI with form validation and better styling
- Added employee overview with task statistics
- Implemented proper data updates

### 3. TaskList.jsx
- Fixed property name inconsistencies (`NewTask` → `newTask`, `CompleteTask` → `completed`, `FailedTask` → `failure`)
- Added proper task status filtering
- Improved error handling for missing data

### 4. Header.jsx
- Fixed logout functionality (properly removes localStorage item)
- Added hover effects and better styling

### 5. Login.jsx
- Added email validation
- Improved form styling and user experience
- Added loading states and better error handling
- Added demo credentials display

### 6. TasklistNumber.jsx
- Fixed responsive layout issues
- Improved styling and added hover effects
- Added proper null checks for data

### 7. Task Components (NewTask, AcceptTask, CompleteTask, FailedTask)
- Added proper functionality for task status updates
- Improved styling and user experience
- Added proper event handlers

### 8. EmployeeDashboard.jsx
- Added task management functionality
- Implemented proper state updates
- Added context integration for data management

### 9. CSS and Styling
- Removed global color override that caused styling issues
- Improved responsive design
- Added proper scrollbar styling

## Demo Credentials

### Admin
- Email: `admin@example.com`
- Password: `admin@123`

### Employee
- Email: `john.doe@example.com`
- Password: `password123`

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to the local development URL

## Task Status Flow

1. **New Task**: Admin assigns a task → Employee sees it as "New"
2. **Active Task**: Employee accepts the task → Task becomes "Active"
3. **Completed Task**: Employee marks task as complete → Task becomes "Completed"
4. **Failed Task**: Employee marks task as failed → Task becomes "Failed"

Employees can reactivate completed or failed tasks to work on them again.

## Technologies Used

- React 19
- Vite
- Tailwind CSS
- Local Storage for data persistence
- Context API for state management
