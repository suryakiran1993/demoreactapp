import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './jobseeker.css';
import config from '../config'

export default function UpdateJSProfile() {
  const [jobseekerData, setJobSeekerData] = useState({
    fullname: '',
    gender: '',
    dateofbirth: '',
    email: '',
    password: '',
    location: '',
    contact: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [initialJobseekerData, setInitialJobseekerData] = useState({});

  useEffect(() => {
    const storedJobSeekerData = localStorage.getItem('jobseeker');
    if (storedJobSeekerData) {
      const parsedJobSeekerData = JSON.parse(storedJobSeekerData);
      setJobSeekerData(parsedJobSeekerData);
      setInitialJobseekerData(parsedJobSeekerData); // Store initial job seeker data
    }
  }, []);

  const handleChange = (e) => {
    setJobSeekerData({ ...jobseekerData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => 
  {
    e.preventDefault();
    try 
    {
      const updatedData = {};
      for (const key in jobseekerData) {
        if (jobseekerData[key] !== initialJobseekerData[key] && initialJobseekerData[key] !== '') {
          updatedData[key] = jobseekerData[key]; 
        }
      }
      if (Object.keys(updatedData).length !== 0) {
        // There are changes
        updatedData.email = jobseekerData.email;
        const response = await axios.put(`${config.url}/updatejobseekerprofile`, updatedData);
        setMessage(response.data);
        setError('');
        const res = await axios.get(`${config.url}/jobseekerprofile/${jobseekerData.email}`, updatedData)
        localStorage.setItem("jobseeker",JSON.stringify(res.data))
      } else {
        // No changes
        setMessage("No Changes in Job Seeker Profile");
        setError("");
      }
    } 
    catch (error) {
      setError(error.response.data);
      setMessage('');
    }
  };
  
  
  return (
    <div>
      <h3 align="center"><u>Update Profile</u></h3>
      {message ? <h4 align="center">{message}</h4> : <h4 align="center" color='red'>{error}</h4>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name</label>
          <input type="text" id="fullname" value={jobseekerData.fullname} onChange={handleChange} required />
        </div>
        <div>
          <label>Gender</label>
          <input type="text" id="gender" value={jobseekerData.gender} readOnly />
        </div>
        <div>
          <label>Date of Birth</label>
          <input type="date" id="dateofbirth" value={jobseekerData.dateofbirth} onChange={handleChange} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" id="email" value={jobseekerData.email} readOnly />
        </div>
        <div>
          <label>Password</label>
          <input type="password" id="password" value={jobseekerData.password} onChange={handleChange} required />
        </div>
        <div>
          <label>Location</label>
          <input type="text" id="location" value={jobseekerData.location} onChange={handleChange} required />
        </div>
        <div>
          <label>Contact</label>
          <input type="number" id="contact" value={jobseekerData.contact} onChange={handleChange} required />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
