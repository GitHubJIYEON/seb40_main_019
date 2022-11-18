import { useState } from 'react';
import ImageUploader from 'react-images-upload';
import '../css/ImgUploader.scss';

export default function ImgUploader() {
  const [pictures, setPictures] = useState([]);

  const onDrop = (picture) => {
    console.log(pictures);
    setPictures([...pictures, picture]);
    // setPictures([picture]);
  };
  return (
    <ImageUploader
      // {...props}
      withIcon={false}
      onChange={onDrop}
      imgExtension={['.jpg', '.png']}
      withPreview={true}
      maxFileSize={5242880}
      singleImage={true}
      buttonText={'이미지 업로드'}
      label={'최대크기: 5MB, 확장자: jpg, png'}
      fileSizeError={'파일크기가 5MB 이상입니다'}
      fileTypeError={'올바르지 않는 확장자 입니다'}
    />
  );
}
