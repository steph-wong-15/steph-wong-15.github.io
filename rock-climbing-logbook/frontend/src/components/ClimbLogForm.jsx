import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

// GraphQL mutation to add a new climb log
const ADD_CLIMB_LOG = gql`
  mutation AddClimbLog($date: String!, $location: String!, $difficulty: String!, $notes: String!) {
    addClimbLog(date: $date, location: $location, difficulty: $difficulty, notes: $notes) {
      id
      date
      location
      difficulty
      notes
    }
  }
`;

const ClimbForm = () => {
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [notes, setNotes] = useState('');

  const [addClimbLog, { loading, error }] = useMutation(ADD_CLIMB_LOG);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addClimbLog({
        variables: {
          date,
          location,
          difficulty,
          notes,
        },
      });
      setDate('');
      setLocation('');
      setDifficulty('');
      setNotes('');
    } catch (err) {
      console.error('Error adding climb log:', err);
    }
  };

  return (
    <div className="form-container">
      <h2>Log a New Climb</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="difficulty">Difficulty:</label>
          <input
            type="text"
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="notes">Notes:</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Log Climb'}
        </button>
        {error && <p className="error-message">Error: {error.message}</p>}
      </form>
    </div>
  );
};

export default ClimbForm;
