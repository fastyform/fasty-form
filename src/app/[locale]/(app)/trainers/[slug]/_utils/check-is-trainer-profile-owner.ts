import { User } from '@supabase/supabase-js';

const checkIsTrainerProfileOwner = (user: User | null, trainerId: string) => (user ? trainerId === user.id : false);

export default checkIsTrainerProfileOwner;
