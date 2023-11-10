import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CommonButton from '../../Common/Components/Button/CommonButton';
import CustomText from '../../Common/Components/Text/CustomText';
import { Images } from '../../Common/constants/Images';
import SpaceStyles from '../../Common/style/SpaceStyles';
import TextStyles from '../../Common/style/TextStyles';
import { useTranslation } from 'react-i18next';
import { BaseStyle } from '../../Common/constants/BaseStyle';
import PDImage from '../../Common/Components/P_and_D_Image/PDImage';

export default function MainScreen(props) {
  const { navigation } = props;
  const { t } = useTranslation();

  return (
    <LinearGradient style={styles.container} colors={['#F2F9FF', '#CEE8FF']}>
      <View style={styles.PartnextContainer}>
        <Image
          source={Images.partNextLogo}
          resizeMode={'contain'}
          style={styles.PartnextImage}
        />
        <View style={styles.PartnextItems}>
          <Image
            source={Images.rightGreenArrow}
            resizeMode={'contain'}
            style={styles.icon}
          />
          <CustomText
            numberOfLines={undefined}
            text={t('auth.businessopportunitiesMain')}
            style={[TextStyles.regular14DarkBlue, SpaceStyles.left3]}
          />
        </View>
        <View style={styles.PartnextItems}>
          <Image
            source={Images.rightGreenArrow}
            resizeMode={'contain'}
            style={styles.icon}
          />
          <CustomText
            numberOfLines={undefined}
            text={t('auth.partnerships')}
            style={[TextStyles.regular14DarkBlue, SpaceStyles.left3]}
          />
        </View>
        <View style={styles.PartnextItems}>
          <Image
            source={Images.rightGreenArrow}
            resizeMode={'contain'}
            style={styles.icon}
          />
          <CustomText
            numberOfLines={undefined}
            text={t('auth.connections')}
            style={[TextStyles.regular14DarkBlue, SpaceStyles.left3]}
          />
        </View>
      </View>
      <PDImage />

      <CommonButton
        onPress={() => navigation.navigate('Registration')}
        title={'Start'}
        whiteButton={false}
      />

      <TouchableOpacity
        style={{ alignSelf: 'center' }}
        onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={[TextStyles.regular14DarkBlue]}>
          Already have an account?
          <Text style={{ textDecorationLine: 'underline' }}> Login</Text>
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F9FF',
    paddingVertical:
      Platform.OS == 'ios'
        ? BaseStyle.DEVICE_HEIGHT * 0.04
        : BaseStyle.DEVICE_HEIGHT * 0.02,
  },
  img: {
    width: 11,
    height: 16,
    marginVertical: 15,
  },
  PartnextContainer: {
    paddingTop: BaseStyle.DEVICE_HEIGHT * 0.05,
    paddingHorizontal: BaseStyle.DEVICE_WIDTH * 0.05,
    flex: 1,
  },
  PartnextImage: {
    width: BaseStyle.DEVICE_WIDTH * 0.5,
    height: BaseStyle.DEVICE_HEIGHT * 0.07,
  },
  icon: {
    width: BaseStyle.DEVICE_WIDTH * 0.045,
    height: BaseStyle.DEVICE_WIDTH * 0.045,
  },
  PartnextItems: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: BaseStyle.DEVICE_HEIGHT * 0.005,
  },
});
