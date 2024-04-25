import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './recruiter.css';
import config from '../config'

export default function ViewJobApplicants() {

  const [recruiterData, setRecruiterData] = useState("");
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const storedRecruiterData = localStorage.getItem('recruiter');
    if (storedRecruiterData) {
      const parsedRecruiterData = JSON.parse(storedRecruiterData);
      setRecruiterData(parsedRecruiterData)
    }
  }, []);

  const [jobApplicants, setJobApplicants] = useState([]);

  const fetchJobApplicants = async () => {
    try 
    {
      const response = await axios.get(`${config.url}/viewjobapplicants/${recruiterData.username}`);
      setJobApplicants(response.data);
    } 
    catch (error) 
    {
      setError(error.response.data);
    }
  }

  useEffect(() => {
    fetchJobApplicants();
  }); 

  const handleStatusChange = async (applicantId, status) => {
    try 
    {
      const response = await axios.post(`${config.url}/changejobstatus`, { applicantId, status });
      fetchJobApplicants();
      setMessage(response.data);
      setError(''); // Set error to ""
    } 
    catch (error) 
    {
      setError(error.response.data);
      setMessage(''); // Set message to ""
    }
  };

  return (
    <div className="table-container">
        <h3>Job Applicants</h3>
        {
          message ? <h4 align="center">{message}</h4> : <h4 align="center" style={{color:"red"}}>{error}</h4>
        }
        <table className="job-table mx-auto" align='center'>
            <thead>
                <tr>
                    <th>Applicant ID</th>
                    <th>Job ID</th>
                    <th>Status</th>
                    <th>Applied Time</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {Array.isArray(jobApplicants) && jobApplicants.length > 0 ? (
                    jobApplicants.map((applicant, index) => (
                        <tr key={index}>
                            <td>{applicant.applicantId}</td>
                            <td>{applicant.jobid}</td>

                <td>
                  {applicant.jobStatus}
                </td>
                           
                            <td>{applicant.appliedTime}</td>
                            <td>
                              <button className='selected' onClick={() => handleStatusChange(applicant.applicantId,"SELECTED")}>SELECTED</button>
                              <button className='rejected' onClick={() => handleStatusChange(applicant.applicantId,"REJECTED")}>REJECTED</button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5">No Job Applications found</td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
);
}
