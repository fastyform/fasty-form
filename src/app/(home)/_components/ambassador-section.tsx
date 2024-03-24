'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';
import actionJoinAmbassadorProgram from '@/app/(home)/action-join-ambassador-program';
import AppButton from '@/components/app-button';
import AppInputForm from '@/components/app-input/app-input-form';
import Constants from '@/utils/constants';
import notify from '@/utils/notify';
import { emailValidator } from '@/utils/validators';
import { Container } from './container';

interface AmbassadorProgramSectionProps {
  className?: string;
}

const AmbassadorProgramSection = ({ className }: AmbassadorProgramSectionProps) => {
  const form = useForm({
    defaultValues: { email: '' },
    resolver: zodResolver(z.object({ email: emailValidator })),
  });

  const joinAmbassadorProgramMutation = useMutation({
    mutationFn: (email: string) => actionJoinAmbassadorProgram(email),
    onSuccess: () => {
      notify.success('Dziękujemy za wysłanie zgłoszenia!');
    },
    onError: () => {
      notify.error(Constants.COMMON_ERROR_MESSAGE);
    },
  });

  return (
    <div className={twMerge('relative border-y border-y-gray-600 py-8 lg:py-10', className)}>
      <Image
        fill
        alt="Zdjęcie siłowni z hantlami"
        objectFit="cover"
        objectPosition="center"
        src="/home/ambassador-program-bg.png"
      />
      <Container className="relative z-[1]">
        <Container.Content className="flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex max-w-md flex-col gap-2.5 lg:text-center">
            <h2 className="text-2xl font-bold lg:text-3xl">Zostań naszym ambasadorem!</h2>
            <p>
              Dołącz do naszego programu. Zostaw swój adres email i skontaktujemy się z Tobą.{' '}
              <Link className="font-bold text-yellow-400" href="/#">
                Dowiedz się więcej.
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
              Wysyłając swój adres email zgadzasz się na kontakt drogą mailową oraz otrzymywanie wiadomości
              marketingowych.
            </p>
          </div>
        </Container.Content>
      </Container>
    </div>
  );
};

export default AmbassadorProgramSection;
