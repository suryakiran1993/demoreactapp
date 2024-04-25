import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './recruiter.css';
import config from '../config'

export default function ViewJobs() {

  const [recruiterData, setRecruiterData] = useState("");

  useEffect(() => {
    const storedRecruiterData = localStorage.getItem('recruiter');
    if (storedRecruiterData) {
      const parsedRecruiterData = JSON.parse(storedRecruiterData);
      setRecruiterData(parsedRecruiterData)
    }
  }, []);

  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${config.url}/viewjobs/${recruiterData.username}`);
      setJobs(response.data);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    fetchJobs();
  }); 

  return (
    <div className="table-container">
      <h3>Posted Jobs</h3>
      <table className="job-table mx-auto" align='center'>
        <thead>
          <tr>
            <th>JOB ID</th>
            <th>Title</th>
            <th>Company</th>
            <th>Location</th>
            <th>Salary</th>
            <th>Deadline</th>
            <th>Posted Time</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(jobs) && jobs.length > 0 ? (
            jobs.map((job, index) => (
              <tr key={index}>
                <td>{job.jobid}</td>
                <td>{job.title}</td>
                <td>{job.company}</td>
                <td>{job.location}</td>
                <td>{job.salary}</td>
                <td>{job.deadline}</td>
                <td>{job.postedtime}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">Data Not Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
