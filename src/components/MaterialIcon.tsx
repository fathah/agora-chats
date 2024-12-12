import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppColors } from '../constants/colors';

const MaterialIcon = ({ icon, color, size }: { icon: string, color?: string, size?: number }) => {
    return (
        <Icon name={icon} size={size ?? 25} color={color ?? AppColors.black} />
    );
};

export default MaterialIcon;