import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "../loading.css";

function GeneratePage() {
  const [jd, setJd] = useState("");
  const [prompt, setPrompt] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // redirect to result page after cover letter is generated
  useEffect(() => {
    if (coverLetter !== "") {
      navigate("/result", { state: { coverLetter } });
    }
  }, [coverLetter])

  const doTheMagic = async (): Promise<void> => {
    if (prompt === "" || jd === "") {
      return alert("Please enter both a job descripton and a summary of your skills");
    }
    setLoading(true);
    try {
      const uri = "https://npqp27hv70.execute-api.us-east-1.amazonaws.com/sorcery";
      const response = await fetch(uri, {
        method: "POST",
        body: JSON.stringify({
          prompt: prompt,
          jobDescription: jd,
        })
      });
      const { coverLetter } = await response.json();
      setCoverLetter(coverLetter);
    
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="Home">
    <p className="titles">
        Paste Job Description
    </p>
    <textarea className="job-description" onChange={(e) => {setJd(e.target.value)}}/>

    <p className="titles">
        Write a few sentences about your skills, experience, and what you're looking for
    </p>
    <textarea className="prompt" onChange={(e) => {setPrompt(e.target.value)}}/>
    <br/>
    {
      loading ? <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div> :
      <button className="button accept-btn" onClick={() => doTheMagic()}>
      Generate Cover Letter
      </button>
    }
    </div>
  );
}

export default GeneratePage;
