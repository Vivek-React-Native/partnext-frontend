import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { AppStackParamList } from '../../Core/StackParamLists/AppStackParamList';
import CommonStyles from '../../Common/style/CommonStyles';
import SpaceStyles from '../../Common/style/SpaceStyles';
import CustomText from '../../Common/Components/Text/CustomText';
import TextStyles from '../../Common/style/TextStyles';
import { COLORS } from '../../Common/constants/Colors';
import UpgradePlanView from '../Components/UpgradePlanView';
import LinearGradient from 'react-native-linear-gradient';
import CancleModal from '../Components/CancleModal';
import CommonHeader from '../../Common/Components/Header/CommonHeader';
import { getFriendSuggestionCall } from '../../Core/Redux/Services/HomeServices';
import {
  getAllSubscriptionCall,
  getSubscriptionStatusCall,
} from '../../Core/Redux/Services/ProfileServices';
import { useTranslation } from "react-i18next";

type props = {
  navigation: NativeStackNavigationProp<
    AppStackParamList,
    'AfterUpgradeScreen'
  >;
  route: RouteProp<AppStackParamList, 'AfterUpgradeScreen'>;
};

const AfterUpgradeScreen = ({ navigation, route }: props) => {
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [allPlane, setAllPlane] = useState([]);
  const [currentSubscription, setCurrentSubscription] = useState('');

  const { t } = useTranslation();

  useEffect(() => {
    getAllSubscription();
  }, []);
  useEffect(() => {
    getCurrentSubscription();
  }, []);

  const getCurrentSubscription = () => {
    getSubscriptionStatusCall()
      .then((res: any) => {
        setCurrentSubscription(res?.data?.data?.subscription);
      })
      .catch(err => { });
  };

  const getAllSubscription = () => {
    getAllSubscriptionCall()
      .then((res: any) => {
        setAllPlane(res?.data?.data);
      })
      .catch(err => { });
  };

  return (
    <View style={[CommonStyles.mainContainer, { backgroundColor: COLORS.WHITE }]}>
      <SafeAreaView style={{ backgroundColor: COLORS.WHITE }} />
      <CommonHeader
        onPressBack={() => navigation.goBack()}
        text={t('profile.partnextPremium')}
      />
      <ScrollView style={[CommonStyles.secondContainer]}>
        <LinearGradient
          colors={['#00ECB9', '#27C3C6']}
          start={{ x: 0.0, y: 0 }}
          end={{ x: 1.5, y: 0 }}
          style={[CommonStyles.myPlanStyle]}>
          <TouchableOpacity style={[CommonStyles.myPlanStyle]}>
            <CustomText
              text={currentSubscription?.name}
              style={TextStyles.bold18White}
              numberOfLines={undefined}
            />
            <View style={SpaceStyles.alignSpaceBlock}>
              <CustomText
                text={'69₪ p/m'}
                style={TextStyles.regular14}
                numberOfLines={undefined}
                key="1"
              />
              <CustomText
                text={'Total: 207₪'}
                style={TextStyles.regular14}
                numberOfLines={undefined}
                key="2"
              />
            </View>
            <TouchableOpacity
              onPress={() => setOpenFilterModal(true)}
              style={CommonStyles.cancelPlanButton}>
              <CustomText
                text={t('profile.Cancelthisplan')}
                style={TextStyles.regular14DarkBlue}
                numberOfLines={undefined}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </LinearGradient>

        <CustomText
          text={t('profile.ourplans')}
          style={[TextStyles.bold18DarkBlue, SpaceStyles.top3]}
          numberOfLines={undefined}
        />

        <UpgradePlanView onPress={() => { }} data={allPlane} />

        <CancleModal
          openFilterModal={openFilterModal}
          setOpenFilterModal={setOpenFilterModal}
        />
      </ScrollView>
    </View>
  );
};

export default AfterUpgradeScreen;
