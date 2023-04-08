import { useState } from 'react';
import axios from 'axios';
import '../App.css';
import upload2 from '../images/upload2.svg';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// TODO: disable button if filetype or size is invalid
const PdfUpload = (props: any) => {
    const [selectedFile, setSelectedFile] = useState<any>(null);

    const onFileChange = (e: any) => {
        // TODO: check file type. Only allow pdfs
        console.log('file: ', e.target.files[0]); 
        setSelectedFile(e.target.files[0]);
    };
    const getPresignedUrl = async (): Promise<string> => {
      // TODO: change uri back to one beginning with npqp27hv70
      // search for both urls to ensure all are pointing to correct api
      const uri = "https://fg94zuh9s0.execute-api.us-east-1.amazonaws.com/presigned-url";
      const response = await axios.get(uri, {
        params: {
          filename: selectedFile.name,
        },
      });
      console.log('response: ', response);
      console.log('stringify: ', JSON.stringify(response));
      return response.data.presignedUrl;
    }

    const uploadFileToS3 = async (presigned: string): Promise<void> => {
      const opts = {
        headers: {
          "Content-Type": selectedFile.type,
        },
      };
      await axios.put(presigned, selectedFile, opts);
    };

    const onFileUpload = async () => {       
      const s3PutUrl = await getPresignedUrl();
      console.log('s3 url: ', s3PutUrl);
      await uploadFileToS3(s3PutUrl);
      console.log('done uploading file');
    };

    return (
        <div className="pdf-upload" style={{marginBottom: '50px'}}>
          <p className="titles">
            Upload Resume
          </p>
          <div className='upload-container'>
          <label>
            <img className='upload-svg' src={upload2} width='80px' height='80px' style={{'padding': '30px', cursor: 'pointer'}}/>
            <input type="file" style={{'display': 'none'}} onChange={(e) => onFileChange(e)}/>
          </label>
          <br/>
          {selectedFile &&
          <span style={{'fontSize': '14px'}}>
            Filename: {selectedFile.name} <FontAwesomeIcon icon={faCheck} style={{color: "#34b233", paddingLeft: '10px'}} />
          </span>}
          </div>
        </div>
    );
}

export default PdfUpload;