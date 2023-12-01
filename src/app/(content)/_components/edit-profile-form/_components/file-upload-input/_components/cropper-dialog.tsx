import { Dispatch, SetStateAction, useState } from 'react';
import Cropper, { Area, Point } from 'react-easy-crop';
import getCroppedImg from '@/app/(content)/_components/edit-profile-form/_components/file-upload-input/_utils/get-cropped-img';
import AppButton from '@/components/app-button';
import AppDialog from '@/components/app-dialog';
import FileUploadSlider from './file-upload-slider';

const CropperDialog = ({
  setImageBlob,
  file,
  setFile,
  setIsDeleting,
}: {
  setImageBlob: Dispatch<SetStateAction<Blob | null>>;
  file: string;
  setFile: Dispatch<SetStateAction<string>>;
  setIsDeleting: Dispatch<SetStateAction<boolean>>;
}) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();

  const handleImageCrop = async () => {
    if (!croppedAreaPixels) throw new Error();
    const croppedImage = await getCroppedImg(file, croppedAreaPixels, rotation);
    if (!croppedImage) throw new Error();
    setImageBlob(croppedImage);
    setFile('');
    setIsDeleting(false);
  };

  const onCropComplete = (_: unknown, croppedArea: Area) => {
    setCroppedAreaPixels(croppedArea);
  };

  return (
    <AppDialog open={!!file}>
      <div className="flex flex-col gap-5">
        <Cropper
          aspect={1}
          classes={{ containerClassName: 'h-60 relative rounded-xl border border-gray-600 sm:h-80' }}
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
          <AppButton className="w-full" onClick={handleImageCrop}>
            Przytnij zdjęcie
          </AppButton>
        </div>
      </div>
    </AppDialog>
  );
};

export default CropperDialog;
