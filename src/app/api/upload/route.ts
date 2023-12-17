import { AbortMultipartUploadCommand, S3Client } from '@aws-sdk/client-s3';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { BUCKET_NAME, S3_CLIENT_PARAMS } from '@/app/(content)/submissions/[id]/_utils';

const schema = z.object({
  fileName: z.string(),
  uploadId: z.string().optional(),
});

export const DELETE = async (request: Request) => {
  const s3Client = new S3Client(S3_CLIENT_PARAMS);

  const parsedBody = schema.safeParse(await request.json());

  if (!parsedBody.success) {
    return NextResponse.json({ message: 'Bad request.' }, { status: 400 });
  }

  await s3Client.send(
    new AbortMultipartUploadCommand({
      Bucket: BUCKET_NAME,
      Key: parsedBody.data.fileName,
      UploadId: parsedBody.data.uploadId,
    }),
  );

  return NextResponse.json({ ok: true }, { status: 200 });
};
