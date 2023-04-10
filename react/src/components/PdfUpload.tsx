import { useState } from 'react';
import axios from 'axios';
import '../App.css';
import upload from '../images/upload.svg';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// TODO: disable button if filetype or size is invalid
const PdfUpload = (props: any) => {
    // only allow pdf files
    const pdfCheck = (file: any) => {
        if (file.type !== 'application/pdf') {
            alert('Uploaded resume must be in pdf format');
        }
    };

    const onFileChange = (e: any) => {
        // TODO: check file type. Only allow pdfs
        console.log('file: ', e.target.files[0]);
        pdfCheck(e.target.files[0]);
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
            Filename: {props.resumeFile.name} <FontAwesomeIcon icon={faCheck} style={{color: "#34b233", paddingLeft: '10px'}} />
          </span>}
          </div>
        </div>
    );
}

export default PdfUpload;