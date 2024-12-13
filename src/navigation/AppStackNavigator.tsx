import {NavigationContainer} from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UsersIndex from '../screens/Users';
import ConverstationIndex from '../screens/Conversation';


const Stack = createNativeStackNavigator();

  

const AppStackNavigator = () => {
    const options={headerShown: false}
    return (
        <NavigationContainer>
      <Stack.Navigator screenOptions={options}>
          <Stack.Screen name={"Chats"} component={UsersIndex} />
          <Stack.Screen name={"Converstation"} component={ConverstationIndex}  />
      </Stack.Navigator>
    </NavigationContainer>
    );
}

export default AppStackNavigator;