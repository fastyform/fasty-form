import { Readable } from 'stream';
import dayjs from 'dayjs';
import { drive_v3, google } from 'googleapis';

const DOCUMENTS_FOLDER_ID = process.env.GOOGLE_DRIVE_DOCUMENTS_FOLDER_ID!;
const GOOGLE_SERVICE_AUTH_CREDENTIALS = JSON.parse(
  Buffer.from(process.env.GOOGLE_SERVICE_AUTH_CREDENTIALS!, 'base64').toString('utf-8'),
);

export const getGoogleDriveMonthFolderId = async (drive: drive_v3.Drive) => {
  const now = dayjs().utc();
  const yearFoldersQueryResponse = await drive.files.list({
    q: `mimeType='application/vnd.google-apps.folder' and name='${now.format(
      'YYYY',
    )}' and '${DOCUMENTS_FOLDER_ID}' in parents and trashed=false`,
    fields: 'files(id, name)',
    spaces: 'drive',
  });

  if (!yearFoldersQueryResponse.data.files?.length) {
    throw new Error('Year folder not found');
  }

  const yearFolderId = yearFoldersQueryResponse.data.files[0].id;

  const montFoldersQueryResponse = await drive.files.list({
    q: `mimeType='application/vnd.google-apps.folder' and name='${now.format(
      'MM',
    )}' and '${yearFolderId}' in parents and trashed=false`,
    fields: 'files(id, name)',
    spaces: 'drive',
  });

  if (!montFoldersQueryResponse.data?.files?.[0].id) {
    throw new Error('Month folder not found');
  }

  const monthFolderId = montFoldersQueryResponse.data.files[0].id;

  return monthFolderId;
};

export const getGoogleDriveClient = async () => {
  const authClient = new google.auth.GoogleAuth({
    credentials: GOOGLE_SERVICE_AUTH_CREDENTIALS as any,
    scopes: ['https://www.googleapis.com/auth/drive'],
  });

  await authClient.getClient();

  return google.drive({ version: 'v3', auth: authClient });
};

interface SavePdfToGoogleDriveParams {
  fileName: string;
  body: Readable;
  drive: drive_v3.Drive;
  monthFolderId: string;
}

export const savePdfToGoogleDrive = async ({ fileName, body, drive, monthFolderId }: SavePdfToGoogleDriveParams) => {
  const media = {
    mimeType: 'application/pdf',
    body,
  };

  const requestBody = {
    name: fileName,
    parents: [monthFolderId],
  };

  const response = await drive.files.create({
    requestBody,
    media,
    fields: 'id',
  });

  return response;
};
