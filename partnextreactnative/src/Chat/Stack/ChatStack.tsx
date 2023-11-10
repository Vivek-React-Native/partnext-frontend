import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AllChatListScreen from '../Screens/AllChatListScreen';
import ChatDetailScreen from '../Screens/ChatDetailScreen';
import ReportThankyouScreen from '../Screens/ReportThankyouScreen';

const Chat = createNativeStackNavigator();
const screenOptions = {
  headerShown: false,
  contentStyle: {
    backgroundColor: '#fff',
  },
};
const ChatStack = () => {
  return (
    <Chat.Navigator
      initialRouteName={'AllChatListScreen'}
      screenOptions={screenOptions}>
      <Chat.Screen name="AllChatListScreen" component={AllChatListScreen} />
      <Chat.Screen name="ReportThankyouScreen" component={ReportThankyouScreen} />
    </Chat.Navigator>
  );
};

export default ChatStack;
