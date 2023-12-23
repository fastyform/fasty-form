import { S3Client } from '@aws-sdk/client-s3';

export const BUCKET_NAME_UNPROCESSED = process.env.S3_BUCKET_NAME_UNPROCESSED!;
export const BUCKET_NAME_PROCESSED = process.env.S3_BUCKET_NAME_PROCESSED!;

const s3Client = new S3Client({ region: 'eu-central-1' });

export default s3Client;
