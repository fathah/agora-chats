import {useNavigation} from '@react-navigation/native';
import {Text, TouchableOpacity, View} from 'react-native';
import {conversationStyles} from './style';
import {UserType} from '../../types/users';
import MaterialIcon from '../../components/MaterialIcon';
import { AppColors } from '../../constants/colors';

const ChatHeader = ({user}: {user: UserType}) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={conversationStyles.header}>
      <TouchableOpacity
        onPress={handleBackPress}
        style={conversationStyles.backButton}>
        <MaterialIcon icon='chevron-left' color={ AppColors.white}  size={30}/>
      </TouchableOpacity>
      <View style={conversationStyles.userProfile}>
        <Text>{user.name[0]}</Text>
      </View>

      <Text style={conversationStyles.userName}>{`${user.name}`}</Text>
    </View>
  );
};

export default ChatHeader;
