import {ImagePickerResponse, launchImageLibrary} from 'react-native-image-picker';

export const pickImage = async (): Promise<ImagePickerResponse>  => {
  return await launchImageLibrary({
    mediaType: 'photo',
    selectionLimit:10,

  });
};

export const pickVideo = async (): Promise<ImagePickerResponse>  => {
  return await launchImageLibrary({
    mediaType: 'video',
    selectionLimit:1,

  });
};
