import {Dimensions} from 'react-native';

export const getScreenWidth = () => {
  return Dimensions.get('window').width;
};
