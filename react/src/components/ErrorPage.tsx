import { useNavigate } from 'react-router-dom'; 
import "../App.css";

const ErrorPage = (props: any) => {
    const navigate = useNavigate();
    return (
        <div className="error-page">
            <h1>Oops! Something went wrong!</h1>
            <p className="titles">Try going back to the home page and try again.</p>
            <p style={{"fontSize": "14px", "paddingBottom": "25px"}}>{props.msg}</p>
            <button className="button accept-btn" onClick={() => navigate("/")}>
                Take me back
            </button>
        </div>
    );
}

export default ErrorPage;