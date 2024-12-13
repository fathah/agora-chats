import {StyleSheet} from 'react-native';
import {AppColors} from '../../constants/colors';

export const usersStyle = StyleSheet.create({
  header: {
    backgroundColor: AppColors.darkGreen,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    color: AppColors.white,

    fontSize: 20,
  },
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
    backgroundColor: AppColors.white,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,

    marginHorizontal: 'auto',
  },
  toggleLabel: {
    color: AppColors.darkGreen,
    textAlign: 'center',
  },
});
