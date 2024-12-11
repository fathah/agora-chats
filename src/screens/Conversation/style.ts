import {StyleSheet} from 'react-native';
import {AppColors} from '../../constants/colors';

export const conversationStyles = StyleSheet.create({
  header: {
    backgroundColor: AppColors.darkGreen,
    paddingHorizontal: 20,
    paddingVertical: 10,

    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    color: AppColors.white,
    width: 25,
  },
  backButtonText: {
    fontSize: 30,
    color: AppColors.white,
  },
  userProfile: {
    backgroundColor: AppColors.white,
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },

  userName: {
    color: AppColors.white,
    fontSize: 20,
  },
});
