import { useNavigate } from 'react-router-dom'; 
import "../App.css";

const SplashPage = () => {
    const navigate = useNavigate();
    return (
        <div className="splash-page">
            <h1>Cover Letter Generator</h1>
            <p style={{'paddingTop': '50px'}}>Instantly generate quality cover letters for job applications!</p>
                
            <p className='splash-small'>
                This is an open source project, check out the repo <a href="https://github.com/NikoRaisanen/ai-cover-letter-generator" target="_blank"> here</a>
            </p>
            <br/>
            
           
            <button className="button accept-btn" onClick={() => navigate("/your-skills")}>
                Get started
            </button>
        </div>
    );
}

export default SplashPage;