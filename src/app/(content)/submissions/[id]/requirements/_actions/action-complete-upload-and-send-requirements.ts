'use server';

import {
  CompletedPart,
  CompleteMultipartUploadCommand,
  CompleteMultipartUploadRequest,
  S3Client,
} from '@aws-sdk/client-s3';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { BUCKET_NAME, S3_CLIENT_PARAMS } from '@/app/(content)/submissions/[id]/_utils';
import { submissionRequirementsSchema } from '@/app/(content)/submissions/[id]/requirements/_utils';
import { getSupabaseServerClient } from '@/utils/supabase/client';

interface Payload {
  fileName: string;
  uploadId: CompleteMultipartUploadRequest['UploadId'];
  parts: CompletedPart[];
  submissionId: string;
  clientDescription: string;
}

const actionCompleteUploadAndSendRequirements = async (payload: Payload) => {
  const { fileName, uploadId, parts, submissionId, clientDescription } = payload;

  submissionRequirementsSchema.parse({ clientDescription });
  const supabase = getSupabaseServerClient();
  const { data: session, error: sessionError } = await supabase.auth.getSession();
  if (sessionError || !session.session) throw new Error();

  const s3Client = new S3Client(S3_CLIENT_PARAMS);

  const completeMultipartUploadResponse = await s3Client.send(
    new CompleteMultipartUploadCommand({
      Bucket: BUCKET_NAME,
      Key: fileName,
      UploadId: uploadId,
      MultipartUpload: { Parts: parts },
    }),
  );

  const { error: updateSubmissionError } = await supabase
    .from('submissions')
    .update({
      video_key: completeMultipartUploadResponse.Key,
      client_description: clientDescription,
      status: 'unreviewed',
    })
    .eq('id', submissionId);

  if (updateSubmissionError) throw new Error();

  revalidatePath('/submissions');

  redirect(`/submissions/${submissionId}`);
};

export default actionCompleteUploadAndSendRequirements;
