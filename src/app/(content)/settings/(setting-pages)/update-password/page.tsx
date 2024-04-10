import { SearchParams } from '@/utils/types';
import UpdatePasswordForm from './update-password-form';

const UpdatePassword = ({ searchParams }: { searchParams: SearchParams }) => (
  <>
    <h1 className="text-2xl text-white">Zaktualizuj hasło</h1>
    <UpdatePasswordForm redirectPathParam={searchParams.redirectPath} />
  </>
);

export default UpdatePassword;
