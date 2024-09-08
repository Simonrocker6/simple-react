import React, { useState } from 'react';
import axiosInstance from '../axiosConfig';
import { useHistory } from 'react-router-dom';

function NewIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState('P1');
  const [owner, setOwner] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newIncident = {
        title,
        description,
        severity,
        owner,
      };
      await axiosInstance.post('/incidents', newIncident);
      history.push('/'); // Redirect to the incident list after adding
    } catch (error) {
      console.error('Error creating incident:', error);
    }
  };

  return (
    <div>
      <h2>Add New Incident</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <label>
          Severity:
          <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
            <option value="P0">P0</option>
            <option value="P1">P1</option>
            <option value="P2">P2</option>
          </select>
        </label>
        <label>
          Owner:
          <input type="text" value={owner} onChange={(e) => setOwner(e.target.value)} required />
        </label>
        <button type="submit">Create Incident</button>
      </form>
    </div>
  );
}

export default NewIncident;