import React, { useState } from "react";
import "./App.css";

function App() {
  const [jd, setJd] = useState("");
  const [prompt, setPrompt] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  const doTheMagic = async () => {
    try {
      const uri = "https://npqp27hv70.execute-api.us-east-1.amazonaws.com/sorcery";
      const response = await fetch(uri, {
        method: "POST",
        body: JSON.stringify({
          prompt: prompt,
          jobDescription: jd,
        })
      });
      // TODO: type issue with response.body
      setCoverLetter(response.body);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Paste Job Description
        </p>
        <textarea className="job-description" onChange={(e) => {setJd(e.target.value)}}/>

        <p>
          Write a few sentences about your skills, experience, and what you're looking for
        </p>
        <textarea className="prompt" onChange={(e) => {setPrompt(e.target.value)}}/>
        <button className="button accept-btn">
        Generate Cover Letter
        </button>
        </header>
    </div>
  );
}

export default App;
