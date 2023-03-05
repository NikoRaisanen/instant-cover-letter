import "../App.css";
import { useLocation, useNavigate } from 'react-router-dom'; 

function Result () {
    const location = useLocation();
    const navigate = useNavigate();
  
  // if user did not follow process, redirect to home page
  if (!location.state) {
    return (
      <div className="result-page">
        <h1>Oops! Something went wrong!</h1>
        <p className="titles">Try going back to the home page and try again.</p>
        <button className="button accept-btn" onClick={() => navigate("/")}>
          Take me back
        </button>
      </div>
    );
  }
  return (
    <div className="result-page">
      <h1>Your cover letter is ready!</h1>
      <textarea className="result" defaultValue={location.state.coverLetter}/>
      <br/>
      <button className="button accept-btn" onClick={() => navigate("/")}>
        Generate another!
      </button>
    </div>
  );
}

export default Result;