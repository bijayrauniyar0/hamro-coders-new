/* eslint-disable no-unused-vars */
const MAX_WIDTH = 1024;
const MAX_HEIGHT = 1024;

export const resizeImageToFile = (
  file: File,
  callback: (resizedDataUrl: string, resizedFile: File) => void,
) => {
  const reader = new FileReader();

  reader.onload = event => {
    const img = new Image();
    img.onload = () => {
      let width = img.width;
      let height = img.height;

      if (width > MAX_WIDTH || height > MAX_HEIGHT) {
        if (width > height) {
          height = (MAX_WIDTH / width) * height;
          width = MAX_WIDTH;
        } else {
          width = (MAX_HEIGHT / height) * width;
          height = MAX_HEIGHT;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          blob => {
            if (blob) {
              const resizedFile = new File(
                [blob],
                file.name.replace(/\.[^/.]+$/, '.webp'),
                {
                  type: 'image/webp',
                  lastModified: Date.now(),
                },
              );

              const dataUrl = URL.createObjectURL(resizedFile);
              callback(dataUrl, resizedFile);
            }
          },
          'image/webp',
          0.8,
        );
      }
    };

    img.src = event.target?.result as string;
  };

  reader.readAsDataURL(file);
};
