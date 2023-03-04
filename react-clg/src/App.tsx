import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Paste Job Description
        </p>
        <textarea className="job-description"/>

        <p>
          Write a few sentences about your skills, experience, and what you're looking for
        </p>
        <textarea className="prompt"/>
        <button className="button accept-btn">
        Generate Cover Letter
        </button>
        </header>
    </div>
  );
}

export default App;
