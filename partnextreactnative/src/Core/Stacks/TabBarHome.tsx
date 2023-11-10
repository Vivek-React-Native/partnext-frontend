import React from 'react';
import { View, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import CustomText from '../../Common/Components/Text/CustomText';
import { COLORS } from '../../Common/constants/Colors';
import { Images } from '../../Common/constants/Images';
import CommonStyles from '../../Common/style/CommonStyles';
import TextStyles from '../../Common/style/TextStyles';
import { useSelector } from 'react-redux';

const tabBarConfig = [
  {
    icon: Images.opportunitiesunSelectedIcon,
    selectedIcon: Images.opportunitiesSelectedIcon,
    name: 'HomeStack',
    text: 'Opportunities',
  },
  {
    icon: Images.chatsUnselectedIcon,
    selectedIcon: Images.chatSelectedIcon,
    name: 'ChatStack',
    text: 'Chats',
  },
  {
    icon: Images.growUnselectedIcon,
    selectedIcon: Images.selectedGrowIcon,
    name: 'GrowStack',
    text: 'Grow',
  },
  {
    icon: Images.profileUnselectedIcon,
    selectedIcon: Images.profileSelectedIcon,
    name: 'ProfileStack',
    text: 'Profile',
  },
];

function TabBarHome(props: { descriptors: any; navigation: any; state: any }) {
  const { descriptors, navigation, state } = props;
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const allChatList = useSelector((state: RootState) => state.chat.chatData);
  let unreadMsgCount = 0;
  if (allChatList != null && allChatList?.length !== 0) {
    allChatList.forEach(element => {
      unreadMsgCount = unreadMsgCount + element?.unseenmsg_count || 0;
    });
  }
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={{ backgroundColor: '#FFFFFF' }}>
      <View style={CommonStyles.tabContainer}>
        {tabBarConfig.map((route, index) => {
          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
          return (
            <TouchableOpacity
              key={`key${index}`}
              activeOpacity={0.9}
              onPress={onPress}
              style={
                isFocused
                  ? CommonStyles.selectedTab
                  : CommonStyles.unSelectedTab
              }>
              <Image
                source={isFocused ? route.selectedIcon : route.icon}
                resizeMode="contain"
              />
              <CustomText
                text={route.text}
                style={
                  isFocused
                    ? TextStyles.regular12Title
                    : TextStyles.regular12SecondoryBlue
                }
                numberOfLines={undefined}
              />
              {route.text === 'Chats' && unreadMsgCount !== 0 && (
                <View style={CommonStyles.tabBarBadgeStyle}>
                  <Image source={Images.messageNumberView} />
                  <CustomText
                    text={unreadMsgCount}
                    style={[
                      TextStyles.bold11White,
                      { position: 'absolute', alignSelf: 'center' },
                    ]}
                    numberOfLines={undefined}
                  />
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
      <SafeAreaView style={{ backgroundColor: COLORS.PRIMARY_COLOR }} />
    </View>
  );
}

export default TabBarHome;
