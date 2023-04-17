import "../App.css";
import { useLocation, useNavigate } from 'react-router-dom'; 
import ErrorPage from "./ErrorPage";

function ResultPage () {
    const location = useLocation();
    const navigate = useNavigate();
  
  // if user did not follow process, redirect to home page
  if (!location.state) {
    return (
      <ErrorPage/>
    );
  }
  return (
    <div className="result-page">
      <h1>Your cover letter is ready!</h1>
      <textarea className="result" defaultValue={location.state.coverLetter}/>
      <br/>
      <button className="button accept-btn" onClick={() => navigate("/get-started")}>
        Generate another!
      </button>
    </div>
  );
}

export default ResultPage;