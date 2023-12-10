'use client';

import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import actionSendRequirements from '@/app/(content)/submissions/[id]/(requirements)/requirements/_actions/action-send-requirements';
import {
  submissionRequirementsSchema,
  SubmissionRequirementsSchema,
} from '@/app/(content)/submissions/[id]/(requirements)/requirements/_utils';
import AppButtonSubmit from '@/components/app-button-submit';
import AppFormState from '@/components/app-form-error';
import AppInputForm from '@/components/app-input/app-input-form';
import { formDefaultState } from '@/utils/form';

const SubmissionRequirementsForm = () => {
  const [state, formAction] = useFormState(actionSendRequirements, formDefaultState);
  const { control, handleSubmit, reset, formState } = useForm({
    resolver: zodResolver(submissionRequirementsSchema),
    defaultValues: { client_description: '' },
    mode: 'onTouched',
  });

  // const [file, setFile] = useState<string>('');
  const { getRootProps, getInputProps } = useDropzone({
    maxSize: 5000000,
    multiple: false,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
    },
  });

  useEffect(() => {
    if (state?.isSuccess) {
      reset();
    }
  }, [state, reset]);

  const handleFormAction = (data: FormData) => handleSubmit(() => formAction(data))();

  return (
    // NOTE: This textarea size is hardcoded because of the jumping form bug on first render
    <form action={handleFormAction} className="flex flex-col gap-5 [&_textarea]:!h-[115px]">
      <AppFormState state={state} />
      <div
        {...getRootProps({
          className:
            'flex h-36 w-full flex-col items-center justify-center rounded-2xl border border-dashed border-yellow-400 bg-[#1E2226] dropzone',
        })}
      >
        <input {...getInputProps()} />
        <CloudUploadIcon className="fill-yellow-400" fontSize="large" />
        <span className=" text-yellow-400">Wgraj wideo</span>
      </div>
      <AppInputForm<SubmissionRequirementsSchema>
        fullWidth
        multiline
        control={control}
        fieldName="client_description"
        label="Wiadomość dla trenera"
        minRows={5}
        placeholder="Wiadomość"
      />
      <AppButtonSubmit isValid={formState.isValid}>Prześlij</AppButtonSubmit>
    </form>
  );
};

export default SubmissionRequirementsForm;
