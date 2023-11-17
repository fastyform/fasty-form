import { ReactNode } from 'react';

const SubmissionsLayout = async ({ children }: { children: ReactNode }) => (
  <section className="my-5 flex w-full flex-col gap-10">{children}</section>
);

export default SubmissionsLayout;
