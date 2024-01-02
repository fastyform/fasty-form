'use server';

import crypto from 'crypto';
import path from 'path';
import { CreateMultipartUploadCommand, UploadPartCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import checkIsTrainerAccount from '@/utils/check-is-trainer-account';
import getUserFromSession from '@/utils/get-user-from-session';
import s3Client, { BUCKET_NAME_UNPROCESSED } from '@/utils/s3';

const UPLOAD_URL_EXPIRATION_TIME_IN_SECONDS = 60 * 60; // 1 hour

interface Payload {
  fileName: string;
  totalParts: number;
}

const actionGetUploadParts = async ({ fileName, totalParts }: Payload) => {
  const user = await getUserFromSession();
  const isTrainerAccount = await checkIsTrainerAccount(user.id);

  if (isTrainerAccount) {
    throw new Error('Trainer account cannot upload videos');
  }

  const fileExtension = path.extname(fileName);
  const videoKey = Date.now() + crypto.randomUUID() + fileExtension;

  if (totalParts > 40) {
    // 40 parts by 5MB = 200MB - max file size
    throw new Error('Max file size is 200MB');
  }

  // Initiate multipart upload
  const createUploadResponse = await s3Client.send(
    new CreateMultipartUploadCommand({
      Bucket: BUCKET_NAME_UNPROCESSED,
      Key: videoKey,
    }),
  );

  // Generate presigned urls
  const presignedUrlPromises = [...Array(totalParts).keys()].map((partIndex) => {
    const partNumber = partIndex + 1;
    const uploadPartCommand = new UploadPartCommand({
      Bucket: BUCKET_NAME_UNPROCESSED,
      Key: videoKey,
      PartNumber: partNumber,
      UploadId: createUploadResponse.UploadId,
    });

    return getSignedUrl(s3Client, uploadPartCommand, { expiresIn: UPLOAD_URL_EXPIRATION_TIME_IN_SECONDS });
  });

  const presignedUrls = await Promise.all(presignedUrlPromises);

  return { presignedUrls, uploadId: createUploadResponse.UploadId, videoKey };
};

export default actionGetUploadParts;
