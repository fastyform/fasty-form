'use server';

import { revalidatePath } from 'next/cache';

const revalidatePathServer = (path: string) => {
  revalidatePath(path);
};

export default revalidatePathServer;
