import React from 'react';
import './style.css'; 

export default function Home() {
  return (
    <div className="home-container">
      <div className="admin-section">
        <h3>Admin</h3>
        <ul>
          <li>Admin Login</li>
          <li>Change Password</li>
          <li>Add Recruiter</li>
          <li>View Recruiters</li>
          <li>View Job Seekers</li>
          <li>Delete Job Seeker</li>
        </ul>
      </div>
      <div className="recruiter-section">
        <h3>Recruiter</h3>
        <ul>
          <li>Recruiter Login</li>
          <li>Post a New Job</li>
          <li>View Posted Jobs</li>
          <li>View Job Applicants</li>
          <li>Change Job Status</li>
        </ul>
      </div>
      <div className="jobseeker-section">
        <h3>Job Seeker</h3>
        <ul>
          <li>Registration</li>
          <li>Job Seeker Login</li>
          <li>View Profile</li>
          <li>Update Profile</li>
          <li>Apply for a Job</li>
          <li>View Applied Jobs</li>
          <li>Check Job Status</li>
        </ul>
      </div>
    </div>
  );
}
