import { useState } from 'react';
import axios from 'axios';
import '../App.css';
import upload from '../images/upload.svg';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

// TODO: disable button if filetype or size is invalid
const PdfUpload = (props: any) => {
    const [fileErrors, setFileErrors] = useState<string[]>([]);
    const [isValid, setIsValid] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const activatedBorder = '2px dashed rgba(255, 255, 255, 0.8)';
    const boxShadow = '0px 0px 10px 5px white';

    const buildErrorMsg = () => {
        let finalMsg = '<ol>'
        fileErrors.map((msg: string) => {
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
        if (e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            fileCheck(file);
            props.setResumeFile(file);
        }
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
          <div id="drop_zone" onDrop={dropHandler} onDragOver={dragOverHandler} className="drag-n-drop-box" style={{
            border: isDragging ? 'none' : activatedBorder,
            boxShadow: isDragging ? boxShadow : 'none',
            }}>
                <div className="drag-n-drop-box-content">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        id="drag-n-drop-icon" viewBox="0 0 48 48">
                        <path id="Imported Path"
                            fill="#4E595C" stroke="none" stroke-width="1"
                            d="M 12.50,40.00
           C 9.63,40.00 7.17,38.97 5.10,36.90
             3.03,34.83 2.00,32.37 2.00,29.50
             2.00,26.90 2.83,24.61 4.48,22.62
             6.12,20.64 8.25,19.45 10.85,19.05
             11.52,15.82 13.08,13.18 15.55,11.12
             18.02,9.07 20.87,8.05 24.10,8.05
             27.87,8.05 31.03,9.41 33.58,12.12
             36.12,14.84 37.40,18.10 37.40,21.90
             37.40,21.90 37.40,23.10 37.40,23.10
             39.80,23.03 41.83,23.81 43.50,25.43
             45.17,27.04 46.00,29.08 46.00,31.55
             46.00,33.85 45.17,35.83 43.50,37.50
             41.83,39.17 39.85,40.00 37.55,40.00
             37.55,40.00 25.50,40.00 25.50,40.00
             24.70,40.00 24.00,39.70 23.40,39.10
             22.80,38.50 22.50,37.80 22.50,37.00
             22.50,37.00 22.50,24.10 22.50,24.10
             22.50,24.10 18.35,28.25 18.35,28.25
             18.35,28.25 16.20,26.10 16.20,26.10
             16.20,26.10 24.00,18.30 24.00,18.30
             24.00,18.30 31.80,26.10 31.80,26.10
             31.80,26.10 29.65,28.25 29.65,28.25
             29.65,28.25 25.50,24.10 25.50,24.10
             25.50,24.10 25.50,37.00 25.50,37.00
             25.50,37.00 37.55,37.00 37.55,37.00
             39.05,37.00 40.33,36.47 41.40,35.40
             42.47,34.33 43.00,33.05 43.00,31.55
             43.00,30.05 42.47,28.77 41.40,27.70
             40.33,26.63 39.05,26.10 37.55,26.10
             37.55,26.10 34.40,26.10 34.40,26.10
             34.40,26.10 34.40,21.90 34.40,21.90
             34.40,18.93 33.39,16.38 31.38,14.25
             29.36,12.12 26.87,11.05 23.90,11.05
             20.93,11.05 18.43,12.12 16.40,14.25
             14.37,16.38 13.35,18.93 13.35,21.90
             13.35,21.90 12.40,21.90 12.40,21.90
             10.33,21.90 8.58,22.62 7.15,24.07
             5.72,25.53 5.00,27.32 5.00,29.45
             5.00,31.52 5.73,33.29 7.20,34.78
             8.66,36.26 10.43,37.00 12.50,37.00
             12.50,37.00 19.50,37.00 19.50,37.00
             19.50,37.00 19.50,40.00 19.50,40.00
             19.50,40.00 12.50,40.00 12.50,40.00 Z
           M 24.00,25.50 24.00,25.50 24.00,25.50 24.00,25.50" />
                    </svg>
                    <div className="drop-label-container"><span className="drop-label-text">Drag and drop or&nbsp;</span><input
                        type="file"
                        name="file"
                        id="file-upload"
                        onChange={(e) => {onFileChange(e)}}
                    /><label id="file-upload-label" htmlFor="file-upload">browse files</label>
                    </div>
                    <div className="drop-label-filenames">
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
                        style={{backgroundColor: 'red', textAlign: 'left', fontSize: '16px', borderRadius: '10px'}}
                    />}
                    </div>
                </div>
    );
}

export default PdfUpload;