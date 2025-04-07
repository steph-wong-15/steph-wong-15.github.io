// src/App.js
import React from 'react';
import ApolloProvider from './ApolloProvider';
import ClimbLogForm from './components/ClimbLogForm';
import ClimbLogList from './components/ClimbLogList';

function App() {
  return (
    <ApolloProvider>
      <div className="App">
        <h1>Rock Climbing Log</h1>
        <ClimbLogForm />
        <ClimbLogList />
      </div>
    </ApolloProvider>
  );
}

export default App;
