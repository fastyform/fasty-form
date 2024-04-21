'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';
import PublicContainer from '@/app/[locale]/(public)/_components/public-container';
import AppButton from '@/components/app-button';
import AppInputForm from '@/components/app-input/app-input-form';
import notify from '@/utils/notify';
import { emailValidator } from '@/utils/validators';
import actionJoinAmbassadorProgram from './action-join-ambassador-program';

interface AmbassadorProgramSectionProps {
  className?: string;
}

const AmbassadorProgramSection = ({ className }: AmbassadorProgramSectionProps) => {
  const t = useTranslations();
  const form = useForm({
    defaultValues: { email: '' },
    resolver: zodResolver(z.object({ email: emailValidator })),
  });

  const joinAmbassadorProgramMutation = useMutation({
    mutationFn: (email: string) => actionJoinAmbassadorProgram(email),
    onSuccess: () => {
      notify.success(t('HOME_AMBASSADOR_SUCCESS_MESSAGE'));
    },
    onError: () => {
      notify.error(t('COMMON_ERROR'));
    },
  });

  return (
    <div className={twMerge('relative border-y border-y-gray-600 py-8 lg:py-10', className)}>
      <Image fill alt="Zdjęcie siłowni z hantlami" className="object-cover" src="/home/ambassador-program-bg.png" />
      <PublicContainer className="relative z-[1]">
        <PublicContainer.Content className="flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex max-w-md flex-col gap-2.5 lg:text-center">
            <h2 className="text-2xl font-bold lg:text-3xl">{t('HOME_AMBASSADOR_TITLE')}</h2>
            <p>
              {t('HOME_AMBASSADOR_DESCRIPTION')}{' '}
              <Link className="font-bold text-yellow-400" href="/ambassador-program">
                {t('HOME_AMBASSADOR_LEARN_MORE')}
              </Link>
            </p>
          </div>
          <div className="flex max-w-md flex-col gap-4">
            <AppInputForm control={form.control} fieldName="email" label="Email" />
            <AppButton
              classes={{ root: 'px-12 self-start text-lg py-2.5' }}
              loading={joinAmbassadorProgramMutation.isPending}
              onClick={form.handleSubmit(({ email }) => joinAmbassadorProgramMutation.mutate(email))}
            >
              Wyślij
            </AppButton>
            <p className="text-xs">
              {t('HOME_AMBASSADOR_ACCEPT_TERMS')}{' '}
              <Link className="font-semibold text-yellow-400" href="/ambassador-program">
                {t('HOME_AMBASSADOR_TERMS')}
              </Link>
              .
            </p>
          </div>
        </PublicContainer.Content>
      </PublicContainer>
    </div>
  );
};

export default AmbassadorProgramSection;
