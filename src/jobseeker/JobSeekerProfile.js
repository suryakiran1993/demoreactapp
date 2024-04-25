import React, { useEffect, useState } from 'react';
import './jobseeker.css';

export default function JobSeekerProfile() {
  const [jobseekerData, setJobSeekerData] = useState(null);

  useEffect(() => {
    const storedJobSeekerData = localStorage.getItem('jobseeker');
    if (storedJobSeekerData) {
      const parsedJobSeekerData = JSON.parse(storedJobSeekerData);
      setJobSeekerData(parsedJobSeekerData);
    }
  }, []);

  return (
    jobseekerData ? (
      <div className='profile-card'>
        <p><strong>Full Name:</strong> {jobseekerData.fullname}</p>
        <p><strong>Gender:</strong> {jobseekerData.gender}</p>
        <p><strong>Date of Birth:</strong> {jobseekerData.dateofbirth}</p>
        <p><strong>Email:</strong> {jobseekerData.email}</p>
        <p><strong>Location:</strong> {jobseekerData.location}</p>
        <p><strong>Contact:</strong> {jobseekerData.contact}</p>
      </div>
    ) : (
      <p>No Job Seeker Data Found</p>
    )
  );
}
