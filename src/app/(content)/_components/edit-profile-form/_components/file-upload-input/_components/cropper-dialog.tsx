import { Dispatch, SetStateAction, useState } from 'react';
import Cropper, { Area, Point } from 'react-easy-crop';
import { Dialog } from '@mui/material';
import getCroppedImg from '@/app/(content)/_components/edit-profile-form/_components/file-upload-input/_utils/get-cropped-img';
import AppButton from '@/components/app-button';
import FileUploadSlider from './file-upload-slider';

const CropperDialog = ({
  setImageBlob,
  file,
  setFile,
}: {
  setImageBlob: Dispatch<SetStateAction<Blob | null>>;
  file: string;
  setFile: Dispatch<SetStateAction<string>>;
}) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();

  const handleImageUpload = async () => {
    if (!croppedAreaPixels) throw new Error();
    const croppedImage = await getCroppedImg(file, croppedAreaPixels, rotation);
    if (!croppedImage) throw new Error();
    setImageBlob(croppedImage);
    setFile('');
    // const { data, error } = await supabase.storage
    //   .from('Test_bucket')
    //   .upload(`profile_images/${trainerId}.jpeg`, croppedImage, {
    //     contentType: 'Blob',
    //     upsert: true,
    //   });
    // console.log(data, error);
  };

  const onCropComplete = (_: Area, croppedArea: Area) => {
    setCroppedAreaPixels(croppedArea);
  };

  return (
    <Dialog
      classes={{ paper: 'rounded-xl border border-gray-600 bg-[#1e2226] py-10 px-5 lg:px-10 w-full max-w-xl' }}
      open={!!file}
    >
      <div className="flex flex-col gap-5">
        <Cropper
          aspect={1}
          classes={{ containerClassName: 'h-40 relative rounded-xl border border-gray-600' }}
          crop={crop}
          cropShape="round"
          image={file}
          rotation={rotation}
          zoom={zoom}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
        <div>
          <div>
            <span className="text-sm text-white">Zoom</span>
            <FileUploadSlider
              aria-labelledby="Przybliż"
              max={3}
              min={1}
              step={0.1}
              value={zoom}
              onChange={(e, value) => setZoom(value as number)}
            />
          </div>
          <div>
            <span className="text-sm text-white">Rotation</span>
            <FileUploadSlider
              aria-labelledby="Rotacja"
              max={360}
              min={0}
              step={1}
              value={rotation}
              onChange={(e, value) => setRotation(value as number)}
            />
          </div>
          <AppButton onClick={handleImageUpload}>Zapisz zdjęcie</AppButton>
        </div>
      </div>
    </Dialog>
  );
};

export default CropperDialog;
