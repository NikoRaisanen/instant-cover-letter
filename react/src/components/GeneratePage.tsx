import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import "../App.css";
import "../loading.css";
import ErrorPage from "./ErrorPage";
import PdfUpload from "./PdfUpload";
import PromptField from "./PromptField";

function GeneratePage() {
  const [jd, setJd] = useState("");
  const [prompt, setPrompt] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [jdLength, setJdLength] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [resumeFile, setResumeFile] = useState<any>(null);
  const navigate = useNavigate();
  const maxJdLength = 6000;
  const location = useLocation();


  // redirect to result page after cover letter is generated
  useEffect(() => {
    if (coverLetter !== "") {
      navigate("/result", { state: { coverLetter } });
    }
  }, [coverLetter])

  const doTheMagic = async (): Promise<void> => {
    setLoading(true);
    let req;

    if (resumeFile) {
      // create req obj with approriate params. Upload resume to s3 before calling main lambda
      await uploadResume();

      req = {resumeS3Key: resumeFile.name};
    } else {
      req = {prompt};
    }
    req = {...req, jobDescription: jd};
    console.log('req to send to lambda: ', req);
    console.log('rstringified', JSON.stringify(req));

    try {
      const uri = "https://npqp27hv70.execute-api.us-east-1.amazonaws.com/sorcery";
      const response = await axios.post(uri, JSON.stringify(req));
      const res = response.data;
      console.log('res: ', res);
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

  const getPresignedUrl = async (): Promise<string> => {
    const uri = "https://npqp27hv70.execute-api.us-east-1.amazonaws.com/presigned-url";
    const response = await axios.get(uri, {
      params: {
        filename: resumeFile.name,
      },
    });
    console.log('presigned url response: ', response);
    console.log('stringify: ', JSON.stringify(response));
    return response.data.presignedUrl;
  }

  const uploadFileToS3 = async (presigned: string): Promise<void> => {
    const opts = {
      headers: {
        "Content-Type": resumeFile.type,
      },
    };
   await axios.put(presigned, resumeFile, opts);
  };

  const uploadResume = async () => {      
    try {
        const s3PutUrl = await getPresignedUrl();
        await uploadFileToS3(s3PutUrl);
    } catch (err: any) {
        console.error(err);
        setError(`error uploading file: ${err.message}`);
    }
      
  };

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
        <PdfUpload
          resumeFile={resumeFile}
          setResumeFile={setResumeFile}
          setIsButtonDisabled={setIsButtonDisabled}
        /> : 
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
