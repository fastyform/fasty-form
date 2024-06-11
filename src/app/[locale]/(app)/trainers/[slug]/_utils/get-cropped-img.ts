import { Area } from 'react-easy-crop';

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });

const getRadianAngle = (degreeValue: number): number => (degreeValue * Math.PI) / 180;

const rotateSize = (width: number, height: number, rotation: number): { width: number; height: number } => {
  const rotRad = getRadianAngle(rotation);

  return {
    width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
};

const getCroppedImg = async (imageSrc: string, pixelCrop: Area, rotation: number = 0): Promise<Blob | null> => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return null;
  }

  const rotRad = getRadianAngle(rotation);

  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(image.width, image.height, rotation);

  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rotRad);
  ctx.translate(-image.width / 2, -image.height / 2);

  ctx.drawImage(image, 0, 0);

  const croppedCanvas = document.createElement('canvas');
  const croppedCtx = croppedCanvas.getContext('2d');

  if (!croppedCtx) {
    return null;
  }

  croppedCanvas.width = pixelCrop.width;
  croppedCanvas.height = pixelCrop.height;

  croppedCtx.drawImage(
    canvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  );

  const maxDimension = 1080;
  let resizeWidth = croppedCanvas.width;
  let resizeHeight = croppedCanvas.height;

  if (resizeWidth > maxDimension || resizeHeight > maxDimension) {
    const aspectRatio = resizeWidth / resizeHeight;
    if (resizeWidth > resizeHeight) {
      resizeWidth = maxDimension;
      resizeHeight = maxDimension / aspectRatio;
    } else {
      resizeHeight = maxDimension;
      resizeWidth = maxDimension * aspectRatio;
    }
  }

  const resizedCanvas = document.createElement('canvas');
  resizedCanvas.width = resizeWidth;
  resizedCanvas.height = resizeHeight;
  const resizedCtx = resizedCanvas.getContext('2d');

  if (!resizedCtx) {
    return null;
  }

  resizedCtx.drawImage(croppedCanvas, 0, 0, resizeWidth, resizeHeight);

  return new Promise((resolve, reject) => {
    resizedCanvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('Unable to create blob from the resized canvas.'));
      }
    }, 'image/jpeg');
  });
};

export default getCroppedImg;
