import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admin.css';
import config from '../config'

export default function ViewEvents() {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${config.url}/viewevents`);
      setEvents(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      <h1 align="center">Events</h1>
      <table border={1} align="center">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Description</th>
            <th>Date</th>
            <th>Location</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {events.length > 0 ? (
            events.map((event, index) => (
              <tr key={index}>
                <td>{event.title}</td>
                <td>{event.category}</td>
                <td>{event.description}</td>
                <td>{event.date}</td>
                <td>{event.location}</td>
                <td>
  {event.file.endsWith('.jpg') || event.file.endsWith('.jpeg') || event.file.endsWith('.png') ? (
    <img src={`${config.url}/eventimage/${event.file}`} alt="Event" style={{ width: '250px', height: '250px' }} />
  ) : (
    <a href={`${config.url}/eventimage/${event.file}`}>Click Here</a>
  )}
</td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" align="center">No events found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
