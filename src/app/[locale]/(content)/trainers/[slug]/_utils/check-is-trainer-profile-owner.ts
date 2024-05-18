import { User } from '@supabase/supabase-js';

const checkIsTrainerProfileOwner = async (user: User | null, trainerId: string) =>
  user ? trainerId === user.id : false;

export default checkIsTrainerProfileOwner;
