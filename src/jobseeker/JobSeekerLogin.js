import React, { useState } from 'react';
import './jobseeker.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../config'


export default function JobSeekerLogin({onJobSeekerLogin}) 
{
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message,setMessage] = useState("")
  const [error,setError] = useState("")

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try 
    {
      const response = await axios.post(`${config.url}/checkjobseekerlogin`, formData);
      if (response.data != null) 
      {
        onJobSeekerLogin();

        localStorage.setItem('jobseeker', JSON.stringify(response.data));

        navigate("/jobseekerhome");
      } 
      else 
      {
        setMessage("Login Failed")
        setError("")
      }
    } 
    catch (error) 
    {
      setMessage("")
      setError(error.message)
    }
  };

  return (
    <div>
      <h3 align="center"><u>Job Seeker Login</u></h3>
      {
        message ? <h4 align="center">{message}</h4> : <h4 align="center" style={{color:"red"}}>{error}</h4>
      }
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input type="email" id="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" id="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="button">Login</button>
      </form>
    </div>
  );
}