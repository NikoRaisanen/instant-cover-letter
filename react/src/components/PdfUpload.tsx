import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';

const PdfUpload = (props: any) => {
    const [selectedFile, setSelectedFile] = useState<any>(null);

    const onFileChange = (e: any) => {
        setSelectedFile(e.target.files[0]);
    };

    const onFileUpload = async () => {
        // const formData = new FormData();

        // formData.append(
        //   "resume",
        //   selectedFile,
        //   selectedFile.name
        // );
       
        await axios.put(`https://instantcoverletter-resumes.s3.amazonaws.com/${selectedFile.name}`, selectedFile);
      };

    return (
        <div className="pdf-upload">
            <input type="file" onChange={(e) => onFileChange(e)} />
                <button onClick={() => onFileUpload()}>
                  Upload!
                </button>
        </div>
    );
}

export default PdfUpload;