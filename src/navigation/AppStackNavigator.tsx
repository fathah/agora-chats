import {NavigationContainer} from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UsersIndex from '../screens/Users';
import ConverstationIndex from '../screens/Conversation';
import ImageView from "../screens/Conversation/ImageView";
import CropVideo from "../screens/CropVideo";
import ViewVideo from "../screens/ViewVideo";
import CropImageIndex from "../screens/CropImage";


const Stack = createNativeStackNavigator();

  

const AppStackNavigator = () => {
    const options={headerShown: false}
    return (
        <NavigationContainer>
      <Stack.Navigator screenOptions={options}>
          <Stack.Screen name={"Chats"} component={UsersIndex} />
          <Stack.Screen name={"Converstation"} component={ConverstationIndex}  />
          <Stack.Screen name={"ImageView"} component={ImageView} />
          <Stack.Screen name={"CropVideo"} component={CropVideo}/>
          <Stack.Screen name={'ViewVideo'} component={ViewVideo}/>
          <Stack.Screen name={'CropImage'} component={CropImageIndex}/>
      </Stack.Navigator>
    </NavigationContainer>
    );
}

export default AppStackNavigator;