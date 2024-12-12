import React, { useEffect } from 'react';
import AppStackNavigator from './src/navigation/AppStackNavigator';
// import { initAgora } from './src/agora/init';

function App(): React.JSX.Element {

  // useEffect(() => {
  //   initAgora();
  // },[])
  return <AppStackNavigator />;
}

export default App;
