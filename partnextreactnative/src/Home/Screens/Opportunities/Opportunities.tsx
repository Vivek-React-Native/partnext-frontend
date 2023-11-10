import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  PanResponder,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Platform,
  PanResponderGestureState,
  NativeModules,
  StatusBar,
} from 'react-native';
import CustomText from '../../../Common/Components/Text/CustomText';
import { Images } from '../../../Common/constants/Images';
import CommonStyles from '../../../Common/style/CommonStyles';
import SpaceStyles from '../../../Common/style/SpaceStyles';
import TextStyles from '../../../Common/style/TextStyles';
import Footer from './Footer';
import Card from './Card';
import { ACTION_OFFSET, CARD } from './utils/constants';
import HardCodeScreen from '../../Components/HardCodeScreen';
import { useDispatch, useSelector } from 'react-redux';
import { UserAction } from '../../../Core/Redux/action/UserAction';
import {
  addLeftRightCall,
  getFriendSuggestionCall,
} from '../../../Core/Redux/Services/HomeServices';
import { sendMsgCall } from '../../../Core/Redux/Services/ChatServices';
import LoaderModal from '../../../Common/Components/Loadar/LoaderModal';
import { BaseStyle } from '../../../Common/constants/BaseStyle';
import i18next from 'i18next';
import { useTranslation, initReactI18next } from 'react-i18next';
import en from '../../../assets/Translations/en.json';
import { SetChatAction } from '../../../Core/Redux/action/ChatAction';
import MatchModal from './MatchModal';

i18next.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
  },
  lng: 'en',
  fallbackLng: 'en',

  interpolation: {
    escapeValue: false,
  },
});

let allIndex = 0;

export default function Opportunities({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hardCodeScreen, setHardCodeScreen] = useState(false);
  const [openMatchModal, setOpenMatchModal] = useState(false);
  const [OppositeUser, setOppositeUser] = useState('');
  const [allFriendData, setAllFriendData] = useState([]);
  const [msg, setMsg] = useState('');
  const swipe = useRef(new Animated.ValueXY()).current;
  const tiltSign = useRef(new Animated.Value(1)).current;
  const [loading, setLoading] = useState(false);
  const userData = useSelector((state: RootState) => state.user.userData);
  // console.log('userData -> ', JSON.stringify(userData, null, 2));
  console.log('allFriendData -> ', JSON.stringify(allFriendData, null, 2));

  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!allFriendData.length) {
      setHardCodeScreen(false);
    }
  }, [allFriendData.length]);

  useEffect(() => {
    dispatch(UserAction());
    dispatch(SetChatAction());
  }, []);

  useEffect(() => {
    getFriendSuggestList();
  }, []);

  useEffect(() => {
    if (allFriendData.length == 0) {
      setLoading(true);
      getFriendSuggestList();
    }
  }, [allFriendData]);

  const getFriendSuggestList = () => {
    const data = {
      start: 0,
      length: 5,
    };
    setLoading(true);
    getFriendSuggestionCall(data)
      .then((res: any) => {
        console.log(
          'getFriendSuggestList -> ',
          JSON.stringify(res?.data, null, 2),
        );
        if (res?.data?.data.length != 0) {
          console.log('setAllFriendData -> ', res?.data?.data);
          setAllFriendData(res?.data?.data);
        }
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  };

  const panResponder = PanResponder.create({
    // onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: Platform.select({
      default: () => true,
      android: (e: GestureResponderEvent, state: PanResponderGestureState) =>
        Math.abs(state.dx) > 10 || Math.abs(state.dy) > 10,
    }),

    onPanResponderMove: (_, { dx, dy, y0 }) => {
      swipe.setValue({ x: dx, y: dy });
      tiltSign.setValue(y0 > CARD.HEIGHT / 2 ? 1 : -1);
    },
    onPanResponderRelease: (_, { dx, dy }) => {
      // if (dx > 0) {
      //   console.log("Plus");
      //   callRightApi(
      //     1,
      //     allFriendData[currentIndex]?.id,
      //     allFriendData[currentIndex]
      //   );
      // } else {
      //   callRightApi(
      //     2,
      //     allFriendData[currentIndex]?.id,
      //     allFriendData[currentIndex]
      //   );
      //   console.log("Minus");
      // }
      const direction = Math.sign(dx);
      const isActionActive = Math.abs(dx) > ACTION_OFFSET;
      let its = this;

      if (isActionActive) {
        Animated.timing(swipe, {
          duration: 200,
          toValue: {
            x: direction * CARD.OUT_OF_SCREEN,
            y: dy,
          },
          useNativeDriver: true,
        }).start(() => {
          console.log('logged', dx);
          if (dx > 0) {
            console.log('Plus');
            callRightApi(
              1,
              allFriendData[currentIndex]?.id,
              allFriendData[currentIndex],
            );
          } else {
            callRightApi(
              2,
              allFriendData[currentIndex]?.id,
              allFriendData[currentIndex],
            );
            console.log('Minus');
          }
          setAllFriendData(prevState => prevState.slice(1));
          swipe.setValue({ x: 0, y: 0 });
        });
      } else {
        Animated.spring(swipe, {
          toValue: {
            x: 0,
            y: 0,
          },
          useNativeDriver: true,
          friction: 5,
        }).start(() => {
          console.log('logged', dx);
          if (dx > 0) {
            console.log('Plus');
            callRightApi(
              1,
              allFriendData[currentIndex]?.id,
              allFriendData[currentIndex],
            );
          } else {
            callRightApi(
              2,
              allFriendData[currentIndex]?.id,
              allFriendData[currentIndex],
            );
            console.log('Minus');
          }
          setAllFriendData(prevState => prevState.slice(1));
          swipe.setValue({ x: 0, y: 0 });
        });
      }
    },
  });

  const removeTopCard = useCallback(
    x => {
      console.log(x);
      setAllFriendData(prevState => prevState.slice(1));
      swipe.setValue({ x: 0, y: 0 });
    },
    [swipe],
  );

  const callRightApi = (status, id, userData) => {
    const data = {
      user: id,
      connection_status: status,
    };
    if (openMatchModal) {
      setLoading(true);
    }
    console.log('callRightApi-data -> ', JSON.stringify(data, null, 2));
    addLeftRightCall(data)
      .then((res: any) => {
        // alert(res?.data?.message)
        console.log('callRightApi-res', res?.data?.message, data);
        if (res?.data?.message == 'Matched SuccessFully!') {
          setOpenMatchModal(true);
          setOppositeUser(userData);
          setLoading(false);
        }
      })
      .catch(err => {});
  };

  const handleChoice = useCallback(
    (direction: any, id: any) => {
      // if (direction == 1) {
      //   callRightApi(2, id);
      // }
      // if (direction == -1) {
      //   callRightApi(1, id);
      // }
      // Animated.timing(swipe.x, {
      //   toValue: direction * CARD.OUT_OF_SCREEN,
      //   duration: 400,
      //   useNativeDriver: true,
      // }).start(removeTopCard);
    },
    [removeTopCard, swipe.x],
  );

  const renderTags = (
    item: { name: any; intersts: any },
    index: React.Key | null | undefined,
  ) => {
    return (
      <>
        <TouchableOpacity key={index} style={[CommonStyles.tagView]}>
          <CustomText
            style={[TextStyles.bold13DarkBlue]}
            text={item?.intersts?.name}
            numberOfLines={undefined}
          />
        </TouchableOpacity>
      </>
    );
  };
  const renderCat = (
    item: { name: any; category: any },
    index: React.Key | null | undefined,
  ) => {
    return (
      <>
        <TouchableOpacity
          key={index}
          style={[
            CommonStyles.tagView,
            item?.category?.name == 'I own a business'
              ? { borderColor: '#FFAB4A' + 90 }
              : item?.category?.name == 'I own a startup'
              ? { borderColor: '#FFAB4A' + 90 }
              : item?.category?.name == 'I have an idea'
              ? { borderColor: '#FFAB4A' + 90 }
              : item?.category?.name == 'Grow an idea'
              ? { borderColor: '#FFAB4A' + 90 }
              : item?.category?.name == 'Partnership on a startup'
              ? { borderColor: '#FFAB4A' + 90 }
              : item?.category?.name == 'Partnership on existing business'
              ? { borderColor: '#FFAB4A' + 90 }
              : item?.category?.name == 'Stratagic Partner'
              ? { borderColor: '#ABB8FF' }
              : item?.category?.name == 'Active Partner'
              ? { borderColor: '#ABB8FF' }
              : { borderColor: '#0F61B4' },
          ]}>
          <CustomText
            style={[TextStyles.bold13DarkBlue]}
            text={item?.category?.name}
            numberOfLines={undefined}
          />
        </TouchableOpacity>
      </>
    );
  };

  const sendMsg = () => {
    const data = {
      recipient: OppositeUser?.id,
      content: msg,
      message_media: [],
    };
    sendMsgCall(data)
      .then(res => {
        setMsg('');
        setOpenMatchModal(false);
      })
      .catch(err => {});
  };

  return (
    <>
      <MatchModal
        visible={openMatchModal}
        msg={msg}
        setMsg={setMsg}
        onClose={() => setOpenMatchModal(false)}
        sendMsg={sendMsg}
        oppositeUser={OppositeUser}
      />

      <View style={[CommonStyles.mainContainer, { alignItems: 'center' }]}>
        <SafeAreaView />
        <LoaderModal loading={loading} />
        <Image source={Images.companyLogo} style={SpaceStyles.alignSelf} />

        {allFriendData?.length != 0 ? (
          <>
            <View style={CommonStyles.topImageView}>
              {allFriendData
                ?.map((item, index) => {
                  const isFirst = index === 0;
                  const dragHandlers = isFirst ? panResponder.panHandlers : {};
                  return (
                    <Card
                      key={index.toString() + item?.full_name}
                      rest={undefined}
                      allIndex={allIndex}
                      allFriendData={allFriendData[currentIndex]}
                      source={allFriendData[currentIndex]}
                      isFirst={isFirst}
                      swipe={swipe}
                      tiltSign={tiltSign}
                      {...dragHandlers}
                      item={allFriendData[currentIndex]}
                    />
                  );
                })
                .reverse()}
            </View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={[CommonStyles.whiteContainer]}>
              <View style={SpaceStyles.rowWrap}>
                {allFriendData[currentIndex]?.user_category?.map((i, index) => {
                  return renderCat(i, index);
                })}
                {allFriendData[currentIndex]?.user_intersts?.map((i, index) => {
                  return renderTags(i, index);
                })}
                {allFriendData[currentIndex]?.experience != null && (
                  <TouchableOpacity style={[CommonStyles.tagView]}>
                    <CustomText
                      style={[TextStyles.bold13DarkBlue]}
                      text={
                        allFriendData[currentIndex]?.experience +
                        ' ' +
                        'years of experience'
                      }
                      numberOfLines={undefined}
                    />
                  </TouchableOpacity>
                )}
              </View>
              <CustomText
                text={t('home.aboutYourself')}
                style={[TextStyles.bold18DarkBlue, SpaceStyles.top1]}
                numberOfLines={undefined}
              />
              <CustomText
                text={allFriendData[currentIndex]?.about_us}
                style={[TextStyles.regular14DarkBlue, SpaceStyles.top1]}
                numberOfLines={undefined}
              />

              <CustomText
                text={t('home.kindOfPartnership')}
                style={[TextStyles.bold18DarkBlue, SpaceStyles.top1]}
                numberOfLines={undefined}
              />
              <CustomText
                text={allFriendData[currentIndex]?.partnership_reason}
                style={[TextStyles.regular14DarkBlue, SpaceStyles.top1]}
                numberOfLines={undefined}
              />
              <View style={{ height: 100 }}>
                <Footer
                  userId={allFriendData[currentIndex]?.id}
                  handleChoice={handleChoice}
                />
              </View>
            </ScrollView>
          </>
        ) : (
          <>
            {!loading && allFriendData.length == 0 && (
              <>
                <HardCodeScreen />
              </>
            )}
          </>
        )}
      </View>
    </>
  );
}
