import react from 'react';
import './promptSelect.css';
import promptImg from '../images/promptImg.svg';
import resumeImg from '../images/resumeImg.svg';

const PromptSelect = (props: any) => {
    return (
        <div className="container">
        <div className="plans">
            <div className="title">How would you like to input your skills?</div>
            <label className="plan basic-plan" htmlFor="basic">
            <input checked type="radio" name="plan" id="basic" />
            <div className="plan-content">
                <img loading="lazy" src={promptImg} alt="" />
                <div className="plan-details">
                <span>Upload Resume</span>
                <p>Make sure your resume is in pdf format</p>
                </div>
            </div>
            </label>

            <label className="plan complete-plan" htmlFor="complete">
            <input type="radio" id="complete" name="plan" />
            <div className="plan-content">
                <img loading="lazy" src={resumeImg} alt="" />
                <div className="plan-details">
                <span>Text Prompt</span>
                <p>Write about your skills and experience</p>
                </div>
            </div>
            </label>
        </div>
        </div>
    );

}

export default PromptSelect;