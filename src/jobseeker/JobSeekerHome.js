import React, { useEffect, useState } from 'react';

export default function JobSeekerHome() {
  const [jobseekerData, setJobSeekerData] = useState("");

  useEffect(() => {
    const storedJobSeekerData = localStorage.getItem('jobseeker');
    if (storedJobSeekerData) {
      const parsedJobSeekerData = JSON.parse(storedJobSeekerData);
      setJobSeekerData(parsedJobSeekerData)
    }
  }, []);

  return (
    <div>
      {jobseekerData && (
        <div>
          <h4>Welcome {jobseekerData.fullname}</h4>
        </div>
      )}
    </div>
  );
}
