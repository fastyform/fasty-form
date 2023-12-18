'use server';

import { CreateMultipartUploadCommand, S3Client, UploadPartCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { BUCKET_NAME, S3_CLIENT_PARAMS } from '@/app/(content)/submissions/[id]/_utils';

interface Payload {
  fileName: string;
  totalParts: number;
}

const UPLOAD_URL_EXPIRATION_TIME_IN_SECONDS = 60 * 60; // 1 hour

const actionGetUploadParts = async (payload: Payload) => {
  const Key = payload.fileName;

  // Initiate multipart upload
  const s3Client = new S3Client(S3_CLIENT_PARAMS);
  const createUploadResponse = await s3Client.send(
    new CreateMultipartUploadCommand({
      Bucket: BUCKET_NAME,
      Key,
    }),
  );

  // Generate presigned urls
  const presignedUrlPromises = [...Array(payload.totalParts).keys()].map((partIndex) => {
    const partNumber = partIndex + 1;
    const uploadPartCommand = new UploadPartCommand({
      Bucket: BUCKET_NAME,
      Key,
      PartNumber: partNumber,
      UploadId: createUploadResponse.UploadId,
    });

    return getSignedUrl(s3Client, uploadPartCommand, { expiresIn: UPLOAD_URL_EXPIRATION_TIME_IN_SECONDS });
  });

  const presignedUrls = await Promise.all(presignedUrlPromises);

  return { data: { presignedUrls, uploadId: createUploadResponse.UploadId }, isSuccess: true };
};

export default actionGetUploadParts;
