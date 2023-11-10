import React from 'react';
import {
  Image,
  Modal,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import PDImage from '../../../Common/Components/P_and_D_Image/PDImage';
import CustomText from '../../../Common/Components/Text/CustomText';
import { BaseStyle } from '../../../Common/constants/BaseStyle';
import { COLORS } from '../../../Common/constants/Colors';
import { Images } from '../../../Common/constants/Images';
import CommonStyles from '../../../Common/style/CommonStyles';
import SpaceStyles from '../../../Common/style/SpaceStyles';
import TextStyles from '../../../Common/style/TextStyles';

const MatchModal = ({
  visible,
  onClose,
  msg,
  setMsg,
  sendMsg,
  oppositeUser,
}: any) => {
  const userData = useSelector((state: any) => state.user.userData);
  console.log('userdata -> ', JSON.stringify(userData, null, 2));
  const oppositeUserImage =
    oppositeUser?.user_images?.[0]?.image?.media_file_url;
  const currentUserImage =
    userData?.data?.user_images?.[0]?.image?.media_file_url;

  return (
    <Modal visible={visible} onRequestClose={() => onClose?.()}>
      <LinearGradient
        style={[styles.container]}
        colors={['#F2F9FF', '#CEE8FF']}>
        {/* <PDImage images={[Images.Welcome_PUser, Images.Welcome_DUser]} /> */}
        <PDImage
          oppositeUser={oppositeUserImage}
          currentUser={currentUserImage}
        />

        <View style={styles.LetsTalkContainer}>
          <TouchableOpacity style={styles.icon} onPress={() => onClose?.()}>
            <Image
              source={Images.crossBlueIcon}
              resizeMode={'contain'}
              style={styles.icon}
            />
          </TouchableOpacity>
          <CustomText
            text={`Lets Talk Business`}
            style={[TextStyles.regularDongle48DarkBlue, { direction: 'rtl' }]}
          />
        </View>

        <View style={styles.PartnextTips}>
          <CustomText
            numberOfLines={undefined}
            text={`Partnext tips:`}
            style={[TextStyles.semiBold14DarkBlue]}
          />
          <View style={styles.Tips}>
            <Image source={Images.rightGreenArrow} resizeMode={'contain'} />
            <CustomText
              numberOfLines={undefined}
              text={`Leave your ego a side`}
              style={[TextStyles.regular14DarkBlue, SpaceStyles.left3]}
            />
          </View>
          <View style={styles.Tips}>
            <Image source={Images.rightGreenArrow} resizeMode={'contain'} />
            <CustomText
              numberOfLines={undefined}
              text={`Keep a positive attitude`}
              style={[TextStyles.regular14DarkBlue, SpaceStyles.left3]}
            />
          </View>
          <View style={styles.Tips}>
            <Image source={Images.rightGreenArrow} resizeMode={'contain'} />
            <CustomText
              numberOfLines={undefined}
              text={`Keep it simple`}
              style={[TextStyles.regular14DarkBlue, SpaceStyles.left3]}
            />
          </View>
        </View>

        <View style={styles.InputContainer}>
          <View
            style={[
              CommonStyles.textInputChatMatch,
              SpaceStyles.left1,
              {
                width: BaseStyle.DEVICE_WIDTH * 0.8,
                height: BaseStyle.DEVICE_HEIGHT * 0.065,
              },
            ]}>
            <TextInput
              style={styles.Input}
              placeholderTextColor={COLORS.DARK_BLUE}
              placeholder={'Write a massege...'}
              multiline={true}
              defaultValue={msg}
              value={msg}
              onChangeText={text => setMsg(text)}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: BaseStyle.DEVICE_WIDTH * 0.01,
              }}
              onPress={() => sendMsg?.()}>
              <Image resizeMode={'contain'} source={Images.sendIcon} />
              <Image
                resizeMode={'contain'}
                style={{
                  position: 'absolute',
                  alignSelf: 'center',
                  top: 10,
                }}
                source={Images.sendWhiteArrow}
              />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </Modal>
  );
};

export default MatchModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:
      Platform.OS == 'ios'
        ? BaseStyle.DEVICE_HEIGHT * 0.08
        : BaseStyle.DEVICE_HEIGHT * 0.05,
  },
  LetsTalkContainer: {
    flex: 3.5,
    paddingHorizontal: BaseStyle.DEVICE_WIDTH * 0.05,
  },
  PartnextTips: {
    width: BaseStyle.DEVICE_WIDTH * 0.73,
    alignSelf: 'center',
  },
  InputContainer: {
    flex: 1,
    alignSelf: 'center',
    paddingLeft: BaseStyle.DEVICE_WIDTH * 0.05,
  },
  Input: {
    ...SpaceStyles.left3,
    ...TextStyles.semiBold14DarkBlue,
    ...SpaceStyles.width62,
  },
  Tips: {
    ...SpaceStyles.rowFlex,
    ...SpaceStyles.top1,
  },
  icon: {
    width: BaseStyle.DEVICE_WIDTH * 0.05,
    height: BaseStyle.DEVICE_WIDTH * 0.05,
    marginBottom: BaseStyle.DEVICE_HEIGHT * 0.02,
  },
});
