import React from 'react';
import { Link } from 'react-router-dom';
// ----------------------------------
// --- 1. MOCK DATA ---
// ----------------------------------
// This data simulates what you'd get from a backend API.
const classStats = {
  totalStudents: 12,
  averageScore: 82,
  completionRate: 67, // as a percentage
};

const studentData = [
  { id: 1, name: 'Anika Sharma', avatar: 'AS', progress: 100, score: 95, status: 'Completed' },
  { id: 2, name: 'Rohan Mehta', avatar: 'RM', progress: 100, score: 88, status: 'Completed' },
  { id: 3, name: 'Priya Patel', avatar: 'PP', progress: 75, score: 78, status: 'In Progress' },
  { id: 4, name: 'Vikram Singh', avatar: 'VS', progress: 45, score: 60, status: 'Needs Help' },
  { id: 5, name: 'Sana Khan', avatar: 'SK', progress: 90, score: 92, status: 'In Progress' },
  { id: 6, name: 'Arjun Reddy', avatar: 'AR', progress: 20, score: 55, status: 'Needs Help' },
  { id: 7, name: 'Mira Desai', avatar: 'MD', progress: 0, score: null, status: 'Not Started' },
  { id: 8, name: 'Karan Johar', avatar: 'KJ', progress: 100, score: 98, status: 'Completed' },
];


// ----------------------------------
// --- 2. SUB-COMPONENTS ---
// ----------------------------------

// ProgressBar Component
const ProgressBar = ({ progress }) => {
  const progressColor = progress < 50 ? 'bg-yellow-500' : 'bg-green-500';
  return (
    <div className="w-full bg-gray-700 rounded-full h-2.5">
      <div
        className={`${progressColor} h-2.5 rounded-full`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

// DashboardCard Component
const DashboardCard = ({ title, value, icon }) => (
  <div className="bg-slate-800 p-6 rounded-lg shadow-lg flex items-center space-x-4">
    <div className="text-3xl">{icon}</div>
    <div>
      <div className="text-sm text-gray-400">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  </div>
);

// StudentProgressRow Component
const StudentProgressRow = ({ student }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-500/20 text-green-400';
      case 'In Progress': return 'bg-blue-500/20 text-blue-400';
      case 'Needs Help': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <tr className="border-b border-gray-700 hover:bg-slate-800">
      <td className="p-4 flex items-center">
        <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center font-bold mr-4">
          {student.avatar}
        </div>
        <span className="font-medium">{student.name}</span>
      </td>
      <td className="p-4 w-1/3"><ProgressBar progress={student.progress} /></td>
      <td className="p-4 text-center font-semibold">{student.score !== null ? `${student.score}%` : 'N/A'}</td>
      <td className="p-4 text-center">
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(student.status)}`}>
          {student.status}
        </span>
      </td>
    </tr>
  );
};

// StudentProgressList Component
const StudentProgressList = ({ students, title, filter }) => {
  const filteredStudents = filter ? students.filter(filter) : students;
  if (filteredStudents.length === 0) return null;

  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-lg mt-8">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="text-xs text-gray-400 uppercase bg-slate-900">
            <tr>
              <th className="p-4">Student Name</th>
              <th className="p-4">Chapter Progress</th>
              <th className="p-4 text-center">Score</th>
              <th className="p-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => <StudentProgressRow key={student.id} student={student} />)}
          </tbody>
        </table>
      </div>
    </div>
  );
};


// ----------------------------------
// --- 3. MAIN DASHBOARD PAGE ---
// ----------------------------------
const TeacherDashboard = () => {
  const studentsNeedingHelpFilter = (student) => student.status === 'Needs Help';

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Teacher Dashboard</h1>
        <p className="text-gray-400 mb-8">Class 6 - Science Overview</p>

        {/* Top Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DashboardCard title="Total Students" value={classStats.totalStudents} icon="🎓" />
          <DashboardCard title="Average Score" value={`${classStats.averageScore}%`} icon="🎯" />
          <DashboardCard title="Completion Rate" value={`${classStats.completionRate}%`} icon="✅" />
        </div>

        {/* Students Needing Attention List */}
        <StudentProgressList
          title="Students Needing Attention"
          students={studentData}
          filter={studentsNeedingHelpFilter}
        />

        {/* Full Class Progress List */}
        <StudentProgressList title="Full Class Progress" students={studentData} />
      </div>
    </div>
  );
};

export default TeacherDashboard;