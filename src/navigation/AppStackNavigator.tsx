import {NavigationContainer} from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UsersIndex from '../screens/Users';
import ConverstationIndex from '../screens/Conversation';


const Stack = createNativeStackNavigator();

  

const AppStackNavigator = () => {
    return (
        <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen name={"Chats"} component={UsersIndex} />
          <Stack.Screen name={"Converstation"} component={ConverstationIndex} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
    );
}

export default AppStackNavigator;