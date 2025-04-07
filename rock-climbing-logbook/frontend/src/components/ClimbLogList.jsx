import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

// GraphQL query to fetch all climb logs
const GET_CLIMB_LOGS = gql`
  query GetClimbLogs {
    climbLogs {
      id
      date
      location
      difficulty
      notes
    }
  }
`;

const ClimbList = () => {
  const { loading, error, data } = useQuery(GET_CLIMB_LOGS);

  if (loading) return <p>Loading climb logs...</p>;
  if (error) return <p>Error fetching climb logs: {error.message}</p>;

  return (
    <div className="climb-list">
      <h2>Climb Logs</h2>
      <ul>
        {data.climbLogs.map((climb) => (
          <li key={climb.id} className="climb-item">
            <h3>{climb.location}</h3>
            <p>Date: {climb.date}</p>
            <p>Difficulty: {climb.difficulty}</p>
            <p>Notes: {climb.notes}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClimbList;
