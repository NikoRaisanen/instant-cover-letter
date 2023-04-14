import react from 'react';
import { useNavigate } from 'react-router-dom';
import './promptSelect.css';
import keyboard from '../images/keyboard.svg';
import file from '../images/file.svg'
import '../App.css';
import { Tooltip } from "react-tooltip";

const PromptSelect = (props: any) => {
    const navigate = useNavigate();
    const redirectWithState = (path: string, state: any) => {
        setTimeout(() => {
            navigate(path, { state });
        }, 500);
    }
    const handleSelection = async (e: any) => {
        if (e.target.name === 'upload-resume') {
            redirectWithState('/generate', { promptType: "resume" });
        } else {
            redirectWithState('/generate', { promptType: "text" });
        }
    }

    return (
        <>
        <div className="container">
        <div className="options">
            <div className="title">How would you like to input your skills?</div>
            <label className="option" htmlFor="resume">
            <input type="radio" name="upload-resume" id="resume" onClick={(e) => handleSelection(e)}/>
            <div data-tooltip-id="resume-option" className="option-content">
                <img loading="lazy" src={file} alt=""/>
                <div className="option-details">
                <span>Upload Resume</span>
                <p>Make sure your resume is in pdf format</p>
                </div>
            </div>
            <Tooltip
                        id='resume-option'
                        content='This is a beta feature, currently supports resumes up to 2 pages long'
                        style={{backgroundColor: 'rgb(40, 44, 52, 0.9)', textAlign: 'left', fontSize: '12px', borderRadius: '10px', maxWidth: '250px'}}
                    />
            </label>

            <label className="option text-opt" htmlFor="text">
            <input type="radio" id="text" name="text-prompt" onClick={(e) => handleSelection(e)}/>
            <div className="option-content">
                <img loading="lazy" src={keyboard} alt="" />
                <div className="option-details">
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