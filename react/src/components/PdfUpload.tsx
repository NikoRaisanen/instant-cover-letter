import { useState } from 'react';
import axios from 'axios';

// TODO: disable button if filetype or size is invalid
const PdfUpload = (props: any) => {
    const [selectedFile, setSelectedFile] = useState<any>(null);

    const onFileChange = (e: any) => {
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
        <div className="pdf-upload">
            <input type="file" onChange={(e) => onFileChange(e)} />
                <button onClick={() => onFileUpload()}>
                  Upload!
                </button>
        </div>
    );
}

export default PdfUpload;