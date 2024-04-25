import React from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import './jobseeker.css';

import JobSeekerHome from './JobSeekerHome';
import JobSeekerProfile from './JobSeekerProfile';
import ViewJobsPosted from './ViewJobsPosted';
import ViewAppliedJobs from './ViewAppliedJobs';
import UpdateJSProfile from './UpdateJSProfile';

export default function JobSeekerNavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isJobSeekerLoggedIn');
    localStorage.removeItem('jobseeker');

    navigate('/jobseekerlogin');
    window.location.reload()
  };

  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/jobseekerhome">Home</Link></li>
          <li className="dropdown">
            <Link>Profile</Link>
            <div className="dropdown-content">
            <Link to="/jobseekerprofile">View Profile</Link>
            <Link to="/updatejobseekerprofile">Update Profile</Link>
            </div>
          </li>
          <li><Link to="/viewjobsposted">View Jobs</Link></li>
          <li><Link to="/viewappliedjobs">Applied Jobs</Link></li>
          <li><button className="logoutButton" onClick={handleLogout}>Logout</button></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/jobseekerhome" element={<JobSeekerHome/>} exact />
        <Route path="/jobseekerprofile" element={<JobSeekerProfile/>} exact />
        <Route path="/updatejobseekerprofile" element={<UpdateJSProfile/>} exact />
        <Route path="/viewjobsposted" element={<ViewJobsPosted/>} exact />
        <Route path="/viewappliedjobs" element={<ViewAppliedJobs/>} exact />
      </Routes>
    </div>
  );
}
