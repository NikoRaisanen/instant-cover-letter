import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "../loading.css";
import ErrorPage from "./ErrorPage";

function GeneratePage() {
  const [jd, setJd] = useState("");
  const [prompt, setPrompt] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [jdLength, setJdLength] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();
  const maxJdLength = 8000;

  // redirect to result page after cover letter is generated
  useEffect(() => {
    if (coverLetter !== "") {
      navigate("/result", { state: { coverLetter } });
    }
  }, [coverLetter])

  const doTheMagic = async (): Promise<void> => {
    // if (prompt === "" || jd === "") {
    //   return alert("Please enter both a job descripton and a summary of your skills");
    // }
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
      setError(true);
    }
  }

  const handleJdChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setJd(e.target.value);
    setJdLength(e.target.value.length);
    if (e.target.value.length > maxJdLength) {
      alert("Your job description is too long. Please shorten it to 8000 characters or less");
      return setIsButtonDisabled(true);
    }
    setIsButtonDisabled(false);

  }

  if (error) {
    return (
      <ErrorPage/>
    );
  }
  
  return (
    <div className="Home">
    <p className="titles">
        Paste Job Description
    </p>
    <label className="job-description-label">Characters remaining: {(maxJdLength - jdLength) < 0 ? 0 : (maxJdLength - jdLength)}</label>
    <br></br>
    <textarea placeholder="Copy and paste a job description here" className="job-description" onChange={(e) => {handleJdChange(e)}}/>

    <p className="titles">
        Write a few sentences about your skills, experience, and what you're looking for
    </p>
    <textarea placeholder="If you want to include any specific experience, skills or projects in your cover letter you should write about it here. Providing more detail usually leads to better results" className="prompt" onChange={(e) => {setPrompt(e.target.value)}}/>
    <br/>
    {
      loading ? <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div> :
      <button disabled={isButtonDisabled} className={isButtonDisabled ? "button cancel-btn": "button accept-btn"} onClick={() => doTheMagic()}>
      {isButtonDisabled ? "Fix Inputs" : "Generate Cover Letter"}
      </button>
    }
    </div>
  );
}

export default GeneratePage;
