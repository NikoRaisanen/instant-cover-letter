import React, { useState } from "react";
import "../App.css";

function Home() {
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
      return setCoverLetter(String(response.body));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="Home">
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
    </div>
  );
}

export default Home;
