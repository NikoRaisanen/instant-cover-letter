import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../App.css";
import "../loading.css";
import ErrorPage from "./ErrorPage";
import PdfUpload from "./PdfUpload";
import PromptField from "./PromptField";

// TODO: add logic here to handle both resume and text prompt
function GeneratePage() {
  const [jd, setJd] = useState("");
  const [prompt, setPrompt] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [jdLength, setJdLength] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();
  const maxJdLength = 6000;
  const location = useLocation();


  // redirect to result page after cover letter is generated
  useEffect(() => {
    if (coverLetter !== "") {
      navigate("/result", { state: { coverLetter } });
    }
    console.log('use effect');
    console.log('promptType: ', location.state.promptType);
  }, [coverLetter])

  const doTheMagic = async (): Promise<void> => {
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
      const res = await response.json();
      if (res.error) {
        return setError(res.error);
      }

      setCoverLetter(res.coverLetter);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  }

  const handleJdChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setJd(e.target.value);
    setJdLength(e.target.value.length);
    if (!isButtonDisabled && e.target.value.length > maxJdLength) {
      alert(`Your job description is too long. Please shorten it to ${maxJdLength} characters or less`);
      setIsButtonDisabled(true);
    }
    // re enable button if length is appropriate
    else if (isButtonDisabled && e.target.value.length <= maxJdLength) {
      setIsButtonDisabled(false);
    } 
  }

  if (error) {
    return (
      <ErrorPage msg={error}/>
    );
  }
  
  return (
    <div className="Home">
    <p className="titles">
        Paste Job Description
    </p>
    <label className="job-description-label">Characters remaining: {(maxJdLength - jdLength) < 0 ? 0 : (maxJdLength - jdLength)}</label>
    <br/>
    <textarea placeholder="Copy and paste a job description here" className="job-description" onChange={(e) => {handleJdChange(e)}}/>

    {location.state.promptType === 'resume' ?
        <PdfUpload/> : 
        <PromptField
            setPrompt={setPrompt}
            setIsButtonDisabled={setIsButtonDisabled}
            isButtonDisabled={isButtonDisabled}
        />
      }

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
