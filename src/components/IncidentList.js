import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import { Link, useHistory } from 'react-router-dom';
import './IncidentList.css'; // Import custom CSS

function IncidentList() {
  const [incidents, setIncidents] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await axiosInstance.get('/incidents');
        setIncidents(response.data);
      } catch (error) {
        console.error('Error fetching incidents:', error);
      }
    };
    fetchIncidents();
  }, []);

  const handleAddIncident = () => {
    history.push('/incidents/new'); // Redirect to the new incident form
  };

  const handleDelete = async (id) => {
    await axiosInstance.delete(`/incidents/${id}`); 
    setIncidents(incidents.filter(incident => incident.id !== id)); 
  };

  return (
    <div className="incident-list">
      <h2>Incident List: </h2>
      <div className="card-container">
        {incidents.map(incident => (
          <div className="card" key={incident.id}>
            <h3>Title: {incident.title}</h3>
            <p>Description: {incident.description}</p>
            <Link to={`/incidents/${incident.id}`} className="btn view-details">View Details</Link>
            <button onClick={() => handleDelete(incident.id)} className="btn delete-button">Delete</button>
          </div>
        ))}
      </div>
      <button className="btn add-incident" onClick={handleAddIncident}>Add New Incident</button>
    </div>
  );
}

export default IncidentList;