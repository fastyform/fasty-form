import { AbortMultipartUploadCommand } from '@aws-sdk/client-s3';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import s3Client, { BUCKET_NAME_UNPROCESSED } from '@/utils/s3';

const schema = z.object({
  videoKey: z.string(),
  uploadId: z.string().optional(),
});

export const DELETE = async (request: NextRequest) => {
  const parsedBody = schema.safeParse(await request.json());

  if (!parsedBody.success) {
    return NextResponse.json({ message: 'Bad request.' }, { status: 400 });
  }

  await s3Client.send(
    new AbortMultipartUploadCommand({
      Bucket: BUCKET_NAME_UNPROCESSED,
      Key: parsedBody.data.videoKey,
      UploadId: parsedBody.data.uploadId,
    }),
  );

  return NextResponse.json({ ok: true }, { status: 200 });
};
