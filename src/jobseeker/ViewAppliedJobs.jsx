import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './jobseeker.css';
import config from '../config'

export default function ViewAppliedJobs() {
    const [jobseekerData, setJobSeekerData] = useState("");
    const [jobApplicants, setJobApplicants] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const storedJobSeekerData = localStorage.getItem('jobseeker');
        if (storedJobSeekerData) {
            const parsedJobSeekerData = JSON.parse(storedJobSeekerData);
            setJobSeekerData(parsedJobSeekerData);
        }
    }, []); // Empty dependency array ensures it runs only once on mount

    useEffect(() => {
        if (jobseekerData) {
            fetchJobApplicants();
        }
    }); 

    const fetchJobApplicants = async () => {
        try {
            const response = await axios.get(`${config.url}/appliedjobs/${jobseekerData.email}`);
            setJobApplicants(response.data);
        } catch (error) {
            setError(error.response.data);
        }
    }

    return (
        <div className="table-container">
            <h3>Job Application Status</h3>
            {error && <h4 align="center" style={{ color: "red" }}>{error}</h4>}
            <table className="job-table mx-auto" align='center'>
                <thead>
                    <tr>
                        <th>Applicant ID</th>
                        <th>Job ID</th>
                        <th>Status</th>
                        <th>Applied Time</th>
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
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No Job Applications found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
