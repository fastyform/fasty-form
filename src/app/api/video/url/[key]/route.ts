import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { NextRequest, NextResponse } from 'next/server';

import { z } from 'zod';
import {
  getProcessedVideoKey,
  getVideoUrlExpirationTimeInSeconds,
} from '@/app/(content)/submissions/[id]/(submission)/_components/submission-video';
import s3Client, { BUCKET_NAME_PROCESSED, BUCKET_NAME_UNPROCESSED } from '@/utils/s3';

const schema = z.enum(['false', 'true']);

export const GET = async (request: NextRequest, { params }: { params: { key: string } }) => {
  let isProcessed: boolean;
  try {
    const isProcessedQueryParam = schema.parse(request.nextUrl.searchParams.get('isProcessed'));
    isProcessed = isProcessedQueryParam === 'true';
  } catch {
    return NextResponse.json(undefined, { status: 400 });
  }

  try {
    const videoKey = params.key;

    const videoUrl = await getSignedUrl(
      s3Client,
      new GetObjectCommand({
        Bucket: isProcessed ? BUCKET_NAME_PROCESSED : BUCKET_NAME_UNPROCESSED,
        Key: isProcessed ? getProcessedVideoKey(videoKey) : videoKey,
      }),
      {
        expiresIn: getVideoUrlExpirationTimeInSeconds(isProcessed),
      },
    );

    return NextResponse.json({ videoUrl }, { status: 200 });
  } catch {
    return NextResponse.json(undefined, { status: 500 });
  }
};
