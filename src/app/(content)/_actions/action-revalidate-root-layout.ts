'use server';

import { revalidatePath } from 'next/cache';

const actionRevalidateRootLayout = async () => revalidatePath('/', 'layout');

export default actionRevalidateRootLayout;
