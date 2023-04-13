import { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import upload from '../images/upload.svg';
import { faCheck, faXmark, faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

// TODO: disable button if filetype or size is invalid
const PdfUpload = (props: any) => {
    const [fileErrors, setFileErrors] = useState<string[]>([]);
    const [isValid, setIsValid] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const activatedBorder = '2px dashed rgba(255, 255, 255, 0.8)';
    const boxShadow = '0px 0px 9px 1px white';

    const buildErrorMsg = () => {
        const uniq = fileErrors.filter((item,
            index) => fileErrors.indexOf(item) === index)
        let finalMsg = '<ol>'
        uniq.map((msg: string) => {
            finalMsg += `<li>${msg}</li>`;
        });
        finalMsg += '</ol>';
        return finalMsg;
    }
    // only allow pdf files
    const fileCheck = (file: any) => {
        const isPdf = file.type === 'application/pdf';
        if (!isPdf) {
            setFileErrors([...fileErrors, 'File must be in pdf format']);
            setIsValid(false);
        }
        else if (file.size > 2000000) {
            setFileErrors([...fileErrors, 'File size must be under 2MB']);
            setIsValid(false);
        } else {
            setIsValid(true);
        }
    };

    const onFileChange = (e: any) => {
        setFileErrors([]);
        console.log('file: ', e.target.files[0]);
        fileCheck(e.target.files[0]);
        props.setResumeFile(e.target.files[0]);
    };

    const dropHandler = (e: any) => {
        setFileErrors([]);
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        fileCheck(file);
        props.setResumeFile(file);
    };

    // don't open file in browser
    const dragOverHandler = (e: any) => {
        setIsDragging(true);
        e.stopPropagation();
        e.preventDefault();
    }

    return (
        <div className="pdf-upload" style={{marginBottom: '50px'}}>
          <p className="titles">
            Upload Resume
          </p>
          <div onDrop={dropHandler} onDragOver={dragOverHandler} onDragLeave={() => setIsDragging(false)} className="upload-box" style={{
            border: isDragging ? 'none' : activatedBorder,
            boxShadow: isDragging ? boxShadow : 'none',
            }}>
                <div className="upload-content-container">
                <FontAwesomeIcon icon={faCloudArrowUp} style={{color: "#f4f5f8", paddingLeft: '10px', paddingBottom: '10px', fontSize: '40px'}} />
                    <div>
                        <span className="drop-main-text">Drag and drop or&nbsp;</span>
                        <input
                            style={{display: 'none'}}
                            type="file"
                            name="file"
                            id="file-upload"
                            onChange={(e) => {onFileChange(e)}}
                        />
                    <label id="file-upload-label" htmlFor="file-upload">browse files</label>
                    </div>
                    <div className="drop-minor-text">
                        Accepted format: .pdf
                        <br/>
                        Max size: 2 MB
                    </div>

                </div>
                {props.resumeFile &&
                    <span style={{fontSize: '14px', marginTop: '25px'}}>
                        Filename: {props.resumeFile.name} {
                            isValid ? <FontAwesomeIcon icon={faCheck} style={{color: "#34b233", paddingLeft: '10px'}} />
                            :
                            <FontAwesomeIcon data-tooltip-id='tooltip'
                            data-tooltip-place='right' icon={faXmark} style={{color: "#FF0033", paddingLeft: '10px'}} />
                        }
                    </span>}
                    {fileErrors.length > 0 && <Tooltip
                        id='tooltip'
                        html={buildErrorMsg()}
                        style={{backgroundColor: '#AF0606', textAlign: 'left', fontSize: '16px', borderRadius: '10px'}}
                    />}
                    </div>
                </div>
    );
}

export default PdfUpload;