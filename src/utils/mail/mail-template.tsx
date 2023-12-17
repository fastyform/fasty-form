/* eslint-disable @next/next/no-img-element */
import { ReactNode } from 'react';
import { Tailwind } from '@react-email/tailwind';
import Constants from '@/utils/constants';

const MailTemplate = ({ title, children }: { title: string; children: ReactNode }) => (
  <Tailwind>
    <table border={0} cellPadding={0} cellSpacing={0} className="bg-[#0F1216] p-10" width="100%">
      <tr>
        <td align="center">
          <a href={Constants.ORIGIN_URL}>
            <img
              alt="FastForm logo"
              className="h-auto w-full max-w-[300px]"
              src="https://veknudpszbrjutmcmrwk.supabase.co/storage/v1/object/public/assets/Logo.png"
            />
          </a>
        </td>
      </tr>
    </table>

    <table align="center" border={0} cellPadding={0} cellSpacing={0} className="p-5" width="600">
      <tr>
        <td align="center" className="p-5">
          <h2 className="m-0 text-2xl text-[#1E1E1E]">{title}</h2>
        </td>
      </tr>
      <tr>
        <td className="pb-10 text-base text-[#1e1e1e]">{children}</td>
      </tr>
      <tr>
        <td className="text-xs text-black/60">
          E-mail został wygenerowany automatycznie. Prosimy na niego nie odpowiadać.
        </td>
      </tr>
    </table>
  </Tailwind>
);

export default MailTemplate;
