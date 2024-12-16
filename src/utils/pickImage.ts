import {launchImageLibrary} from 'react-native-image-picker';

export const pickImage = async () => {
  const result = await launchImageLibrary({
    mediaType: 'photo',
  });
  return result;
};
