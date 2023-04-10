import { useState } from 'react';
import axios from 'axios';
import '../App.css';
import upload from '../images/upload.svg';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// TODO: disable button if filetype or size is invalid
const PdfUpload = (props: any) => {
    const [isValid, setIsValid] = useState(false);

    // only allow pdf files
    const fileCheck = (file: any) => {
        const isPdf = file.type === 'application/pdf';
        if (!isPdf) {
            alert('Please upload a resume in pdf format');
            setIsValid(false);
        }
        else if (file.size > 1000000) {
            alert('Please upload a resume that is less than 1MB');
            setIsValid(false);
        } else {
            setIsValid(true);
        }
    };

    const onFileChange = (e: any) => {
        // TODO: check file type. Only allow pdfs
        console.log('file: ', e.target.files[0]);
        fileCheck(e.target.files[0]);
        props.setResumeFile(e.target.files[0]);
    };

    return (
        <div className="pdf-upload" style={{marginBottom: '50px'}}>
          <p className="titles">
            Upload Resume
          </p>
          <div className='upload-container'>
          <label>
            <img className='upload-svg' src={upload} width='80px' height='80px' style={{'padding': '30px', cursor: 'pointer'}}/>
            <input type="file" style={{'display': 'none'}} onChange={(e) => onFileChange(e)}/>
          </label>
          <br/>
          {props.resumeFile &&
          <span style={{'fontSize': '14px'}}>
            Filename: {props.resumeFile.name} {
                isValid ? <FontAwesomeIcon icon={faCheck} style={{color: "#34b233", paddingLeft: '10px'}} />
                :
                <FontAwesomeIcon icon={faXmark} style={{color: "#FF0033", paddingLeft: '10px'}} />
            }
          </span>}
          </div>
        </div>
    );
}

export default PdfUpload;