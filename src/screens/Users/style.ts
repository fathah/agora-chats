import {StyleSheet} from 'react-native';
import {AppColors} from '../../constants/colors';

export const usersStyle = StyleSheet.create({
  userTile: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomColor: '#ccc',
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#fff',
  },
  userProfile: {
    backgroundColor: '#ccc',
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  toggleUser: {
    backgroundColor: AppColors.darkGreen,
    paddingHorizontal: 20,
    paddingVertical: 15,
    width: 150,
    borderRadius: 10,
    marginVertical: 15,

    marginHorizontal: 'auto',
  },
  toggleLabel: {
    color: AppColors.white,
    textAlign: 'center',
  },
});
