import { Dispatch, SetStateAction, useEffect } from 'react';
import { Control, useController, UseFormGetFieldState, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { useDebounce } from '@uidotdev/usehooks';
import slugify from 'slugify';
import { OnboardingFormValues } from '@/app/(content)/_components/onboarding-form/_utils';
import AppInputForm from '@/components/app-input/app-input-form';

const slugifyWithOptions = (text: string) => slugify(text, { replacement: '-', lower: true, strict: true });
const DEBOUNCE_TIME = 600;

const ProfileSlugInput = ({
  watch,
  getFieldState,
  control,
  setValue,
  setIsLoading,
}: {
  watch: UseFormWatch<OnboardingFormValues>;
  getFieldState: UseFormGetFieldState<OnboardingFormValues>;
  control: Control<OnboardingFormValues>;
  setValue: UseFormSetValue<OnboardingFormValues>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  const { field, fieldState } = useController({ name: 'profileSlug', control });
  const debouncedSlugValue = useDebounce(field.value, DEBOUNCE_TIME);

  const profileNameValue = watch('profileName');
  const profileNameInputState = getFieldState('profileName');

  useEffect(() => {
    if (!fieldState.isTouched && profileNameInputState.isDirty) {
      setValue('profileSlug', slugifyWithOptions(profileNameValue), {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [profileNameValue, profileNameInputState.isDirty, setValue, fieldState.isTouched]);

  useEffect(() => {
    if (debouncedSlugValue) {
      setValue('profileSlug', slugifyWithOptions(debouncedSlugValue), {
        shouldValidate: true,
      });
    }
  }, [debouncedSlugValue, setValue]);

  useEffect(() => {
    if (!field.value) return;

    setIsLoading(true);

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, DEBOUNCE_TIME);

    return () => clearTimeout(timeout);
  }, [field.value, setIsLoading]);

  return (
    <div className="flex flex-col gap-2.5 ">
      <span className="text-white">Link do profilu</span>
      <AppInputForm<OnboardingFormValues> control={control} fieldName="profileSlug" />
    </div>
  );
};

export default ProfileSlugInput;
