import react from 'react';
import './promptSelect.css';
// import promptImg from '../images/promptImg.svg';
// import resumeImg from '../images/resumeImg.svg';
import keyboard from '../images/keyboard.svg';
import file from '../images/file.svg'
import '../App.css';

const PromptSelect = (props: any) => {
    return (
        <>
        <div className="container">
        <div className="plans">
            <div className="title">How would you like to input your skills?</div>
            <label className="plan basic-plan" htmlFor="basic">
            <input checked type="radio" name="plan" id="basic" />
            <div className="plan-content">
                <img loading="lazy" src={file} alt=""/>
                <div className="plan-details">
                <span>Upload Resume</span>
                <p>Make sure your resume is in pdf format</p>
                </div>
            </div>
            </label>

            <label className="plan complete-plan" htmlFor="complete">
            <input type="radio" id="complete" name="plan" />
            <div className="plan-content">
                <img loading="lazy" src={keyboard} alt="" />
                <div className="plan-details">
                <span>Text Prompt</span>
                <p>Write about your skills and experience</p>
                </div>
            </div>
            </label>
        </div>
        </div>
        {/* <button className="button accept-btn" style={{'marginTop': '100px', 'fontSize': '14px'}}>
        Confirm
        </button> */}
        </>
    );

}

export default PromptSelect;