import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatStack from '../../Chat/Stack/ChatStack';
import TabBarHome from './TabBarHome';
import HomeStack from '../../Home/Stack/HomeStack';
import ProfileStack from '../../Profile/Stack/ProfileStack';
import ChatDetailScreen from '../../Chat/Screens/ChatDetailScreen';
import ReportScreen from '../../Chat/Screens/ReportScreen';
import AuthStack from './AuthStack';
import GrowStack from '../../Grow/Stack/GrowStack';
import UserProfileScreen from '../../Profile/Screens/UserProfileScreen';

const Tab = createBottomTabNavigator();
const App = createNativeStackNavigator();

const AppStack = () => {
  return (
    <App.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <App.Screen name="BottomTab" component={BootmTab} />
      <App.Screen name="ChatDetailScreen" component={ChatDetailScreen} />
      <App.Screen name="ReportScreen" component={ReportScreen} />
      <App.Screen name="AuthStack" component={AuthStack} />
    </App.Navigator>
  );
};

function BootmTab(props: any) {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={props => <TabBarHome {...props} />}>
      <Tab.Screen name="HomeStack" component={HomeStack} />
      <Tab.Screen name="ChatStack" component={ChatStack} />
      <Tab.Screen name="GrowStack" component={GrowStack} />
      <Tab.Screen name="ProfileStack" component={ProfileStack} />
    </Tab.Navigator>
  );
}

export default AppStack;
