import react from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import './promptSelect.css';
// import promptImg from '../images/promptImg.svg';
// import resumeImg from '../images/resumeImg.svg';
import keyboard from '../images/keyboard.svg';
import file from '../images/file.svg'
import '../App.css';

const PromptSelect = (props: any) => {
    const navigate = useNavigate();
    const redirectWithState = (path: string, state: any) => {
        setTimeout(() => {
            navigate(path, { state });
        }, 1000);
    }
    const handleSelection = async (e: any) => {
        if (e.target.name === 'upload-resume') {
            console.log('resume selection')
            redirectWithState('/generate', { promptType: "resume" });
        } else {
            console.log('text prompt selection')
            redirectWithState('/generate', { promptType: "text" });
        }
        // setTimeout(() => {
        //     navigate('/generate', { state: { promptType: "resume" } });
        // }, 1000);
    }

    return (
        <>
        <div className="container">
        <div className="plans">
            <div className="title">How would you like to input your skills?</div>
            <label className="plan basic-plan" htmlFor="basic">
            <input type="radio" name="upload-resume" id="basic" onClick={(e) => handleSelection(e)}/>
            <div className="plan-content">
            {/* <span style={{color: 'red', fontSize: '14px'}}>beta</span> */}
                <img loading="lazy" src={file} alt=""/>
                <div className="plan-details">
                <span>Upload Resume</span>
                <p>Make sure your resume is in pdf format</p>
                </div>
            </div>
            </label>

            <label className="plan complete-plan" htmlFor="complete">
            <input type="radio" id="complete" name="text-prompt" onClick={(e) => handleSelection(e)}/>
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
        </>
    );

}

export default PromptSelect;