const employees = [
    {
      id: "E001",
      name: "Rajesh Kumar",
      email: "john.doe@example.com",
      password: "password123",
      taskCount: {
        active: 1,
        newTask: 1,
        completed: 1,
        failure:1
      },    
      tasks:[
        {
          taskTitle: "Prepare Q3 Report",
          taskDescription: "Compile and analyze Q3 financial data.",
          taskDate: "2025-07-28",
          category: "Finance",
          active: true,
          newTask: true,
          completed: false,
          failure: false
        },
        {
          taskTitle: "Update Client Records",
          taskDescription: "Ensure all client information is current in the CRM.",
          taskDate: "2025-07-25",
          category: "CRM",
          active: false,
          newTask: false,
          completed: true,
          failure: true,
  
        },
        {
          taskTitle: "Team Standup",
          taskDescription: "Attend daily team sync meeting.",
          taskDate: "2025-07-26",
          category: "Meetings",
          active: false,
          newTask: false,
          completed: false,
          failure: true
        }
      ],
      Request:[]
    },
    {
      id: "E002",
      name: "Priya Sharma",
      email: "jane.smith@example.com",
      password: "secure456",
      taskCount: {
        active: 2,
        newTask: 2,
        completed: 1,
        failure: 1
      },
      tasks: [
        {
          taskTitle: "Design Landing Page",
          taskDescription: "Create responsive design for the marketing page.",
          taskDate: "2025-07-29",
          category: "Design",
          active: true,
          newTask: true,
          completed: false,
          failure: false
        },
        {
          taskTitle: "Review UX Feedback",
          taskDescription: "Analyze feedback from user testing session.",
          taskDate: "2025-07-25",
          category: "UX",
          active: false,
          newTask: false,
          completed: true,
          failure: false
        },
        {
          taskTitle: "Bug Fix - Navbar",
          taskDescription: "Fix responsive issue in the navbar for tablet view.",
          taskDate: "2025-07-24",
          category: "Development",
          active: false,
          newTask: false,
          completed: false,
          failure: true
        },
        {
          taskTitle: "Prototype Review",
          taskDescription: "Present updated prototype to stakeholders.",
          taskDate: "2025-07-27",
          category: "Design",
          active: true,
          newTask: true,
          completed: false,
          failure: false
        }
      ]
    },
    {
      id: "E003",
      name: "Amit Verma",
      email: "mike.brown@example.com",
      password: "mikepass789",
      taskCount: {
        active: 1,
        newTask: 0,
        completed: 1,
        failure: 1
      },
      tasks: [
        {
          taskTitle: "Server Maintenance",
          taskDescription: "Perform routine maintenance on production server.",
          taskDate: "2025-07-26",
          category: "IT",
          active: true,
          newTask: false,
          completed: false,
          failure: false
        },
        {
          taskTitle: "Security Audit",
          taskDescription: "Complete Q2 security checklist.",
          taskDate: "2025-07-23",
          category: "Security",
          active: false,
          newTask: false,
          completed: true,
          failure: false
        },
        {
          taskTitle: "Network Troubleshooting",
          taskDescription: "Resolve internal network slowdowns.",
          taskDate: "2025-07-22",
          category: "IT",
          active: false,
          newTask: false,
          completed: false,
          failure: true
        }
      ]
    },
    {
      id: "E004",
      name: "Neha Desai",
      email: "lisa.white@example.com",
      password: "lisa2024",
      taskCount: {
        active: 2,
        newTask: 2,
        completed: 2,
        failure: 0
      },
      tasks: [
        {
          taskTitle: "Content Calendar",
          taskDescription: "Plan social media posts for next month.",
          taskDate: "2025-07-30",
          category: "Marketing",
          active: true,
          newTask: true,
          completed: false,
          failure: false
        },
        {
          taskTitle: "Campaign Launch",
          taskDescription: "Launch summer promo campaign.",
          taskDate: "2025-07-25",
          category: "Marketing",
          active: false,
          newTask: false,
          completed: true,
          failure: false
        },
        {
          taskTitle: "Newsletter Design",
          taskDescription: "Design layout for August newsletter.",
          taskDate: "2025-07-26",
          category: "Design",
          active: true,
          newTask: true,
          completed: false,
          failure: false
        },
        {
          taskTitle: "Social Metrics Review",
          taskDescription: "Review performance of last week’s posts.",
          taskDate: "2025-07-24",
          category: "Analytics",
          active: false,
          newTask: false,
          completed: true,
          failure: false
        }
      ]
    },
    {
      id: "E005",
      name: "Ravi Mehta",
      email: "kevin.jones@example.com",
      password: "kevin1234",
      taskCount: {
        active: 2,
        newTask: 1,
        completed: 1,
        failure: 0
      },
      tasks: [
        {
          taskTitle: "Client Onboarding",
          taskDescription: "Assist new clients in onboarding process.",
          taskDate: "2025-07-28",
          category: "Support",
          active: true,
          newTask: true,
          completed: false,
          failure: false
        },
        {
          taskTitle: "Ticket Resolution",
          taskDescription: "Resolve customer support tickets.",
          taskDate: "2025-07-25",
          category: "Support",
          active: false,
          newTask: false,
          completed: true,
          failure: false
        },
        {
          taskTitle: "Training Session",
          taskDescription: "Conduct training for new support team members.",
          taskDate: "2025-07-27",
          category: "Training",
          active: true,
          newTask: false,
          completed: false,
          failure: false
        }
      ]
    }
  ];
  const admin = {
    id: "A001",
    name: "Anjali Kapoor",
    email: "admin@example.com",
    password: "admin@123",
    requests: [] // Array to store task requests
  };
  
  export const SetLocalStorage = () => {
    if (!localStorage.getItem('employee')) {
      localStorage.setItem('employee', JSON.stringify(employees));
    }
    if (!localStorage.getItem('admin')) {
      localStorage.setItem('admin', JSON.stringify(admin));
    }
  };
  export const GetLocalStorage = () => {
    const employeedata = JSON.parse(localStorage.getItem('employee'));
    const admindata = JSON.parse(localStorage.getItem('admin'));
    return { employeedata, admindata };
  };
  