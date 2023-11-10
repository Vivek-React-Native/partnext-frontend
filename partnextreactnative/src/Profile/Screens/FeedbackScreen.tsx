import React, { useState } from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { AppStackParamList } from '../../Core/StackParamLists/AppStackParamList';
import CommonStyles from '../../Common/style/CommonStyles';
import SpaceStyles from '../../Common/style/SpaceStyles';
import CustomText from '../../Common/Components/Text/CustomText';
import TextStyles from '../../Common/style/TextStyles';
import { COLORS } from '../../Common/constants/Colors';
import CustomeTextInput from '../../Common/Components/TextInput/CustomeTextInput';
import CommonHeader from '../../Common/Components/Header/CommonHeader';
import CommonButton from '../../Common/Components/Button/CommonButton';
import { useTranslation } from 'react-i18next';
import { reportApiCall } from '../../Core/Redux/Services/ChatServices';
import { feedbackApiCall } from '../../Core/Redux/Services/ProfileServices';

type props = {
    navigation: NativeStackNavigationProp<AppStackParamList, 'FeedbackScreen'>;
    route: RouteProp<AppStackParamList, 'FeedbackScreen'>;
};

const FeedbackScreen = ({ navigation, route }: props) => {

    const { t } = useTranslation();

    const [reason, setReason] = useState(false)

    const createFeedback = () => {
        const data = {
            feedback: reason
        }
        feedbackApiCall(data)
            .then((res) => {
                navigation.navigate('FeedbackThankyouScreen')
            })
            .catch((err) => {
            });
    }

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={{ backgroundColor: COLORS.WHITE }} />
            <ScrollView style={[CommonStyles.container, { backgroundColor: COLORS.WHITE, marginTop: 0 }]}>
                <CommonHeader
                    onPressBack={() => navigation.goBack()}
                    text={t('profile.sendFeedback')}
                />

                <CustomText
                    text={t('profile.youropinion')}
                    style={[TextStyles.regular14DarkBlue, SpaceStyles.top3]}
                    numberOfLines={undefined}
                />
                <CustomeTextInput
                    defaultValue={''}
                    value={undefined}
                    placeholder={''}
                    containerStyle={[SpaceStyles.top1, { height: 120 }]}
                    containerInputText={{ textAlignVertical: 'top', paddingTop: 10, paddingBottom: 10, height: 120 }}
                    editable={true}
                    multiline={true}
                    onChangeText={(text) => setReason(text)}
                />

                <CommonButton
                    // onPress={() => navigation.navigate('FeedbackThankyouScreen')}
                    onPress={() => createFeedback()}
                    title={t('common.send')}
                    containerStyle={SpaceStyles.top5}
                    whiteButton={false}
                />
            </ScrollView>
        </View>
    );
};

export default FeedbackScreen;