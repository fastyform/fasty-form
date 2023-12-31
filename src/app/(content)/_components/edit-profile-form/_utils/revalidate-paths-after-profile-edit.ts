'use server';

import { revalidatePath } from 'next/cache';

const revalidatePathsAfterProfileEdit = async (trainerProfileSlug: string) => {
  revalidatePath(`/trainers/${trainerProfileSlug}`);
  revalidatePath(`/trainers/${trainerProfileSlug}/edit-profile`);
};

export default revalidatePathsAfterProfileEdit;
