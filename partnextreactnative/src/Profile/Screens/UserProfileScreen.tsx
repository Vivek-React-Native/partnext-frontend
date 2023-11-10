import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, PanResponder, View, Image, ScrollView, TouchableOpacity, SafeAreaView, Platform, PanResponderGestureState, Linking } from 'react-native';
import CustomText from '../../Common/Components/Text/CustomText';
import { Images } from '../../Common/constants/Images';
import CommonStyles from '../../Common/style/CommonStyles';
import SpaceStyles from '../../Common/style/SpaceStyles';
import TextStyles from '../../Common/style/TextStyles';
import { useDispatch, useSelector } from "react-redux";
import { UserAction } from '../../Core/Redux/action/UserAction';
import { addLeftRightCall, getFriendSuggestionCall, getUserProfileCall } from '../../Core/Redux/Services/HomeServices';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../../Common/constants/Colors';
import { sendMsgCall } from '../../Core/Redux/Services/ChatServices';
import LoaderModal from '../../Common/Components/Loadar/LoaderModal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { BaseStyle } from '../../Common/constants/BaseStyle';
import { useTranslation, initReactI18next } from "react-i18next";
import { ACTION_OFFSET, CARD } from '../../Home/Screens/Opportunities/utils/constants';
import HardCodeScreen from '../../Home/Components/HardCodeScreen';
import Card from '../../Home/Screens/Opportunities/Card';
import Footer from '../../Home/Screens/Opportunities/Footer';
import { styles } from '../../Home/Screens/Opportunities/Card/styles';
import CommonHeader from '../../Common/Components/Header/CommonHeader';

let allIndex = 0

const HEIGHT = (BaseStyle.DEVICE_HEIGHT / 100)
const WIDTH = (BaseStyle.DEVICE_WIDTH / 100)

const isIos = Platform.OS === "ios"

export default function UserProfileScreen({ navigation, route }) {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [hardCodeScreen, setHardCodeScreen] = useState(false);
    const [openMatchModal, setOpenMatchModal] = useState(false);
    const [userId, setUserId] = useState('');
    const [allFriendData, setAllFriendData] = useState([]);
    const [msg, setMsg] = useState('');
    const swipe = useRef(new Animated.ValueXY()).current;
    const tiltSign = useRef(new Animated.Value(1)).current;
    const [loading, setLoading] = useState(false);
    const [matchedUserData, setmatchedUserData] = useState('');
    const [userProfileData, setUserProfileData] = useState(null);
    const [imageIndex, setIndex] = useState(0);

    const userData = useSelector((state: RootState) => state.user.userData);


    const { t } = useTranslation();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(UserAction())
    }, []);

    useEffect(() => {
        getFriendSuggestList()
    }, []);

    useEffect(() => {
        if (allFriendData.length == 0) {
            setLoading(true)
            getFriendSuggestList()
        }
    }, [allFriendData]);

    const getFriendSuggestList = () => {
        setLoading(true)
        getUserProfileCall(`${route?.params?.userId}/`)
            .then((res: any) => {
                setLoading(false)
                console.log(res?.data?.data, "<<<<<<////>>>>>>");
                // setUserData(res?.data?.data)
                let aa = []
                aa.push(res?.data?.data)
                setAllFriendData(aa)
            })
            .catch((err) => {
                setLoading(false)
            });
    }

    const panResponder = PanResponder.create({
        // onMoveShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: Platform.select({
            default: () => true,
            android: (e: GestureResponderEvent, state: PanResponderGestureState) =>
                Math.abs(state.dx) > 10 || Math.abs(state.dy) > 10
        }),

        onPanResponderMove: (_, { dx, dy, y0 }) => {

            swipe.setValue({ x: dx, y: dy });
            tiltSign.setValue(y0 > CARD.HEIGHT / 2 ? 1 : -1);
        },
        onPanResponderRelease: (_, { dx, dy }) => {
            if (dx > 0) {
                console.log("Plus");
                callRightApi(1, allFriendData[currentIndex]?.id, allFriendData[currentIndex])
            } else {
                callRightApi(2, allFriendData[currentIndex]?.id, allFriendData[currentIndex])
                console.log("Minus");
            }
            const direction = Math.sign(dx);
            const isActionActive = Math.abs(dx) > ACTION_OFFSET;

            if (isActionActive) {
                Animated.timing(swipe, {
                    duration: 200,
                    toValue: {
                        x: direction * CARD.OUT_OF_SCREEN,
                        y: dy,
                    },
                    useNativeDriver: true,
                }).start(removeTopCard);
            } else {
                Animated.spring(swipe, {
                    toValue: {
                        x: 0,
                        y: 0,
                    },
                    useNativeDriver: true,
                    friction: 5,
                }).start();
            }
        },
    });

    const removeTopCard = useCallback(() => {
        setAllFriendData((prevState) => prevState.slice(1));
        swipe.setValue({ x: 0, y: 0 });
    }, [swipe]);

    const callRightApi = (status, id, userData) => {
        const data = {
            user: id,
            connection_status: status
        }
        addLeftRightCall(data)
            .then((res: any) => {
                if (res?.data?.message == 'Matched SuccessFully!') {
                    setOpenMatchModal(true)
                    setUserId(id)
                    setmatchedUserData(userData)
                }
            })
            .catch((err) => {
            });
    }

    const handleChoice = useCallback(
        (direction: any, id: any) => {
            if (direction == 1) {
                callRightApi(2, id)
            }
            if (direction == -1) {
                callRightApi(1, id)
            }
            Animated.timing(swipe.x, {
                toValue: direction * CARD.OUT_OF_SCREEN,
                duration: 400,
                useNativeDriver: true,
            }).start(removeTopCard);
        },
        [removeTopCard, swipe.x]
    );


    const renderTags = (item: { name: any; intersts: any }, index: React.Key | null | undefined) => {
        return (
            <>
                <TouchableOpacity
                    key={index}
                    style={[CommonStyles.tagView]}
                >
                    <CustomText
                        style={[TextStyles.bold13DarkBlue]}
                        text={item?.intersts?.name} numberOfLines={undefined} />
                </TouchableOpacity>
            </>
        )
    }
    const renderCat = (item: { name: any; category: any }, index: React.Key | null | undefined) => {
        return (
            <>
                <TouchableOpacity
                    key={index}
                    style={[CommonStyles.tagView,
                    (item?.category?.name == 'I own a business') ? { borderColor: '#FFAB4A' + 90 } :
                        (item?.category?.name == 'I own a startup') ? { borderColor: '#FFAB4A' + 90 } :
                            (item?.category?.name == 'I have an idea') ? { borderColor: '#FFAB4A' + 90 } :
                                (item?.category?.name == 'Grow an idea') ? { borderColor: '#FFAB4A' + 90 } :
                                    (item?.category?.name == 'Partnership on a startup') ? { borderColor: '#FFAB4A' + 90 } :
                                        (item?.category?.name == 'Partnership on existing business') ? { borderColor: '#FFAB4A' + 90 } :
                                            (item?.category?.name == 'Stratagic Partner') ? { borderColor: '#ABB8FF' } :
                                                (item?.category?.name == 'Active Partner') ? { borderColor: '#ABB8FF' } :
                                                    { borderColor: "#0F61B4" }]}
                >
                    <CustomText
                        style={[TextStyles.bold13DarkBlue]}
                        text={item?.category?.name} numberOfLines={undefined} />
                </TouchableOpacity>
            </>
        )
    }

    const sendMsg = () => {
        const data = {
            recipient: userId,
            content: msg,
            message_media: []
        }
        sendMsgCall(data)
            .then((res) => {
                setMsg('')
                setOpenMatchModal(false)
            })
            .catch((err) => {
            });
    }

    const setIndexFun = () => {
        if (allFriendData[currentIndex]?.user_images.length > imageIndex + 1) {
            setIndex(imageIndex + 1)
        } else {
            setIndex(0)
        }
    }

    return (
        <>
            <SafeAreaView style={{ backgroundColor: COLORS.BACKGROUND }} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={[CommonStyles.mainContainer]}>
                {/* <CommonHeader
                    onPressBack={() => navigation.goBack()}
                    text={''}
                /> */}

                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={[CommonStyles.backButtonView, SpaceStyles.top2]}>
                    <Image
                        resizeMode={'contain'}
                        source={Images.backIcon}
                    />
                </TouchableOpacity>

                <LoaderModal loading={loading} />
                <Image
                    source={Images.companyLogo}
                    style={SpaceStyles.alignSelf}
                />
                <View style={CommonStyles.topImageView}>
                    {allFriendData?.map((item, index) => {
                        const isFirst = index === 0;
                        const dragHandlers = isFirst ? panResponder.panHandlers : {};
                        return (
                            // <Card
                            //     rest={undefined}
                            //     allIndex={allIndex}
                            //     allFriendData={allFriendData[currentIndex]}
                            //     source={allFriendData[currentIndex]}
                            //     isFirst={isFirst}
                            //     swipe={swipe}
                            //     tiltSign={tiltSign}
                            //     {...dragHandlers}
                            //     item={allFriendData[currentIndex]} />

                            <View
                                style={[styles.container]}
                            >
                                <View style={[SpaceStyles.alignSpaceBlock, { position: 'absolute', zIndex: 99999, top: 15, paddingHorizontal: WIDTH * 3 }]}>
                                    {allFriendData[currentIndex]?.user_images.map((i, indexs) => {
                                        return (
                                            <>
                                                {allFriendData[currentIndex]?.user_images.length == 1 ?
                                                    <View style={{ height: 5, borderRadius: 20, width: WIDTH * (82 / allFriendData[currentIndex]?.user_images.length), backgroundColor: imageIndex == indexs ? '#FFFFFF' : '#FFFFFF80', marginRight: WIDTH * (15 / allFriendData[currentIndex]?.user_images.length) }} />
                                                    :
                                                    <>
                                                        {allFriendData[currentIndex]?.user_images.length == 2 ?
                                                            <View style={{ height: 5, borderRadius: 20, width: WIDTH * (76 / allFriendData[currentIndex]?.user_images.length), backgroundColor: imageIndex == indexs ? '#FFFFFF' : '#FFFFFF80', marginRight: WIDTH * (15 / allFriendData[currentIndex]?.user_images.length) }} />
                                                            :
                                                            <View style={{ height: 5, borderRadius: 20, width: WIDTH * (73 / allFriendData[currentIndex]?.user_images.length), backgroundColor: imageIndex == indexs ? '#FFFFFF' : '#FFFFFF80', marginRight: WIDTH * (15 / allFriendData[currentIndex]?.user_images.length) }} />
                                                        }
                                                    </>
                                                }
                                            </>
                                        )
                                    })}
                                </View>
                                <TouchableOpacity activeOpacity={1}
                                    onPress={() => setIndexFun()}
                                >
                                    <Image source={{ uri: allFriendData[currentIndex]?.user_images[imageIndex]?.image?.media_file_url }} style={CommonStyles.topSwipeImage} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => Linking.openURL('https://' + allFriendData[currentIndex].linkedin_url)} style={CommonStyles.linkedinLogo}>
                                    <Image source={Images.linkedinLogo} />
                                </TouchableOpacity>
                                <CustomText
                                    text={item?.full_name}
                                    style={[TextStyles.bold18DarkBlue, SpaceStyles.top2]} numberOfLines={undefined}
                                />
                                <CustomText
                                    text={item?.current_position}
                                    style={[TextStyles.regular14DarkBlue]} numberOfLines={undefined}
                                />

                                {/* {isFirst && renderChoice()} */}
                            </View>
                        );
                    }).reverse()
                    }
                </View>
                <View style={[CommonStyles.whiteContainer]}>
                    <View style={SpaceStyles.rowWrap}>
                        {allFriendData[currentIndex]?.user_category?.map((i, index) => {
                            return renderCat(i, index)
                        })}
                        {allFriendData[currentIndex]?.user_intersts?.map((i, index) => {
                            return renderTags(i, index)
                        })}
                        {allFriendData[currentIndex]?.experience != null &&
                            <TouchableOpacity
                                style={[CommonStyles.tagView]}
                            >
                                <CustomText
                                    style={[TextStyles.bold13DarkBlue]}
                                    text={allFriendData[currentIndex]?.experience}
                                    numberOfLines={undefined}
                                />
                            </TouchableOpacity>
                        }
                    </View>
                    <CustomText
                        text={t('home.aboutYourself')}
                        style={[TextStyles.bold18DarkBlue, SpaceStyles.top1]} numberOfLines={undefined} />
                    <CustomText
                        text={allFriendData[currentIndex]?.about_us}
                        style={[TextStyles.regular14DarkBlue, SpaceStyles.top1]} numberOfLines={undefined}
                    />

                    <CustomText
                        text={t('home.kindOfPartnership')}
                        style={[TextStyles.bold18DarkBlue, SpaceStyles.top1]} numberOfLines={undefined} />
                    <CustomText
                        text={allFriendData[currentIndex]?.partnership_reason}
                        style={[TextStyles.regular14DarkBlue, SpaceStyles.top1]} numberOfLines={undefined} />
                </View>
            </ScrollView>
        </>
    );
}