// src/components/IncidentDetail.js
import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import { useParams, useHistory, } from 'react-router-dom';
import './IncidentDetail.css'; // Import custom CSS

function IncidentDetail() {
  const { id } = useParams();
  const [incident, setIncident] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const history = useHistory();
  const fetchIncident = async () => {
    const response = await axiosInstance.get(`/incidents/${id}`);
    console.log('Simon: resp' + JSON.stringify(response));
    setIncident(response.data);
  };
  useEffect(() => {
    fetchIncident();
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const updateIncident = async (e) => {
    e.preventDefault();
    await axiosInstance.put(`/incidents/${id}`, incident);
    setIsEditing(false);
    fetchIncident();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncident({ ...incident, [name]: value });
  };

  if (!incident) return <div>Loading...</div>;

  const handleBack = () => {
    history.push('/incidents'); // Navigate back to the list view
  };

  const handleDelete = async () => {
    await axiosInstance.delete(`/incidents/${id}`); // Adjust as necessary
    history.push('/incidents') // Navigate back to the list view after deletion
  };

  console.log('Simon: incident ' + JSON.stringify(incident));

  return (
    <div className="incident-detail">
      <h2>{isEditing ? 'Edit Incident' : incident.title}</h2>
      <div className="detail-content">
        {isEditing ? (
          <form onSubmit={updateIncident}>
            <label>Title:</label>
            <input type="text" name="title" value={incident.title} onChange={handleChange} required />
            <label>Description:</label>
            <textarea name="description" value={incident.description} onChange={handleChange} required />
            <label>Severity:</label>
            <select name="severity" value={incident.severity} onChange={handleChange}>
              <option value="P0">P0</option>
              <option value="P1">P1</option>
              <option value="P2">P2</option>
            </select>
            <button type="submit" className="btn save">Save Changes</button>
          </form>
        ) : (
          <div>
            <p>Description: {incident.description}</p>
            <p>Severity: {incident.severity}</p>
            <p>Owner: {incident.owner}</p>
            <div>
              <h3>Change Log:</h3>
              <ul>
                {incident.changeLog.map((log, index) => (
                  <li key={index}>{log}</li>
                ))}
              </ul>
            </div>
            <button onClick={handleEdit} className="btn edit">Edit Incident</button>
            <button onClick={handleDelete} className="btn delete-button">Delete Incident</button>
          </div>
        )}
      </div>
      <button onClick={handleBack} className="btn back-button">Back to List</button>
      
    </div>
  );
}

export default IncidentDetail;
