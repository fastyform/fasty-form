'use server';

import { addContactToList } from '@/utils/sendgrid';

const actionJoinAmbassadorProgram = async (email: string) => addContactToList(email);

export default actionJoinAmbassadorProgram;
