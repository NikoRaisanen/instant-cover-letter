import { useNavigate } from 'react-router-dom'; 
import "../App.css";

const SplashPage = () => {
    const navigate = useNavigate();
    return (
        <div className="splash-page">
            <h1>Cover Letter Generator</h1>
            <p>Instantly generate a quality cover letter for your job applications!</p>
                
            <p className="splash-small">Paste a job description</p>
            
            <p className="splash-small">Write a brief summary of your skills</p>
           
            <button className="button accept-btn" onClick={() => navigate("/")}>
                Get started
            </button>
        </div>
    );
}

export default SplashPage;