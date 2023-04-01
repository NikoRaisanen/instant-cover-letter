import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand} from "@aws-sdk/client-s3";
import Constants from '../Constants';
const { RESUME_BUCKET } = Constants;

const getPresignedUrl = async (filename: string): Promise<string> => {
  try {
    const putObjectParams = {
      Bucket: RESUME_BUCKET,
      Key: filename,
    };
    
    const client = new S3Client({ region: "us-east-1" });
    const command = new PutObjectCommand(putObjectParams);
    const url = await getSignedUrl(client, command, { expiresIn: 3600 });
    console.log('url in getpresignedurl: ', url);
    return url;

  } catch (err) {
    console.error('Error getting presigned url: ', err);
    throw new Error('Error getting presigned url');
  }
};

export const handlePresigned = async (filename: string): Promise<object> => {
  if (!filename) throw new Error('No filename provided for presigned url');
  const url = await getPresignedUrl(filename);
  return { presignedUrl: url };
};