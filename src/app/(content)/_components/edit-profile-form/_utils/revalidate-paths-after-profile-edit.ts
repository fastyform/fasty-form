'use server';

import { revalidatePath } from 'next/cache';

const revalidatePathsAfterProfileEdit = async (trainerId: string) => {
  revalidatePath(`/trainers/${trainerId}`);
  revalidatePath(`/trainers/${trainerId}/edit-profile`);
};

export default revalidatePathsAfterProfileEdit;
