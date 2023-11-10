import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import style from '../../AuthFont/style';
import Lable from '../../Common/constants/English';
import Button from '../Components/Button';
import Input from '../Components/Input';
import Link from '../Components/Link';
import { AuthStackParamList } from '../../Core/StackParamLists/AuthStackParamList';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Images } from '../../Common/constants/Images';
import { loginCall, otpCall } from '../../Core/Redux/Services/AuthServices';
import { setAccessToken } from '../../Common/constants/GlobalFunction';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

type props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'PhoneValidation'>;
  route: RouteProp<AuthStackParamList, 'PhoneValidation'>;
};

export default function PhoneValidation({ navigation, route }: props) {
  const { phoneNumber, countryCode, screen } = route.params;

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');

  const { t } = useTranslation();

  const checkVerification = async () => {
    if (text == '') {
      return setError(true);
    }
    const data = {
      country_code: countryCode,
      phone_no:
        phoneNumber.charAt(0) == '0' ? phoneNumber.slice(1) : phoneNumber,
      otp: text,
    };

    console.log('data :: ', data);

    setLoading(true);
    // fetch("https://api.part-next.com/api/auth/verify-otp/", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then(async (resAPI) => {
    //     const res = await resAPI.json();
    //     console.log("resAPI :: ", res);

    //     setLoading(false);
    //     setAccessToken(res?.data?.token);

    //     if (res?.code == 200) {
    //       await AsyncStorage.setItem("token", res?.data?.token);
    //       Toast.showWithGravity(res?.message, Toast.SHORT, Toast.BOTTOM);
    //       if (screen == "Login") {
    //         navigation.replace("AppStack");
    //       } else {
    //         navigation.replace("OnboardingToolTip");
    //       }
    //     } else {
    //       Toast.showWithGravity(res?.message, Toast.SHORT, Toast.BOTTOM);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log("error : ", err);
    //     setLoading(false);
    //   });
    await otpCall(data)
      .then(async (res: any) => {
        // const res = {
        //   data: {
        //     data: {
        //       id: 615,
        //       email: null,
        //       first_name: '',
        //       last_name: '',
        //       full_name: 'idan bachsr',
        //       phone_no: '549370601',
        //       is_active: true,
        //       is_deleted: false,
        //       country_code: '+972',
        //       image: null,
        //       token:
        //         'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo2MTUsInVzZXJuYW1lIjoiNTQ5MzcwNjAxIiwiZXhwIjoxNjc3MzE4NTUwLCJlbWFpbCI6bnVsbCwicGhvbmVfbm8iOiI1NDkzNzA2MDEifQ.sXWATjuCkYk9fPnzOAUAnqR0daX2cnlsOEtPQAoUt_g',
        //     },
        //     code: 200,
        //     status: 1,
        //     message: 'OTP verified successfully',
        //   },
        // };
        setLoading(false);
        console.log('screen -> ', JSON.stringify(screen, null, 2));
        console.log('OTP response -> ', JSON.stringify(res?.data, null, 2));
        Toast.showWithGravity(res?.data?.message, Toast.SHORT, Toast.BOTTOM);
        if (res?.data?.data?.token?.length > 0) {
          setAccessToken(res?.data?.data?.token);
          await AsyncStorage.setItem('token', res?.data?.data?.token);
          if (screen == 'Login') {
            navigation.replace('AppStack');
          } else {
            navigation.replace('OnboardingToolTip');
          }
        }
      })
      .catch(err => {
        setLoading(false);
        console.log('Error OTP -> ', err);
      });
  };

  const resendCode = () => {
    const data = {
      country_code: countryCode,
      phone_no:
        phoneNumber.charAt(0) == '0' ? phoneNumber.slice(1) : phoneNumber,
    };

    setLoading(true);
    loginCall(data)
      .then(async (res: any) => {
        setLoading(false);
        if (res?.data?.code == 200) {
          Toast.showWithGravity(res?.data?.message, Toast.SHORT, Toast.BOTTOM);
        } else {
          Toast.showWithGravity(res?.data?.message, Toast.SHORT, Toast.BOTTOM);
        }
      })
      .catch(err => {
        setLoading(false);
      });
  };

  return (
    <LinearGradient style={styles.container} colors={['#CEE8FF', '#F2F9FF']}>
      <SafeAreaView style={{ backgroundColor: '#CEE8FF' }} />
      <View style={styles.subView}>
        <TouchableOpacity
          style={{ marginVertical: 10 }}
          onPress={() => navigation.goBack()}>
          <Image source={Images.backIcon} style={styles.img} />
        </TouchableOpacity>
        <Text style={[style.primaryTitle, styles.title]}>
          {t('auth.phoneValidation')}
        </Text>
        <Input
          keyboardType="numeric"
          onChangeText={text => (setError(false), setText(text))}
          lable={Lable.PLEASE_ENTER_VALIDATION_CODE}
          errorText={error ? Lable.INVALID_CODE_MESSAGE : null}
          inputStyle={undefined}
          inputHeight={undefined}
          error={undefined}
          imageSource={undefined}
          onImagePress={undefined}
          multiline={undefined}
          height={undefined}
        />
        <Button
          title={t('common.next')}
          buttonStyle={styles.buttonStyle}
          onPress={() => checkVerification()}
          width={undefined}
          unFilled={false}
        />
        <View style={styles.view1}>
          <Text style={style.smallText}>{t('auth.didntCode')}</Text>
          <Link
            linkText={t('auth.resendCode')}
            onPress={() => resendCode()}
            linkStyle={undefined}
          />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: { textAlign: 'center', marginTop: 9, marginBottom: 23 },
  subView: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
  },
  img: {
    width: 11,
    height: 16,
    marginTop: 15,
  },
  buttonStyle: {
    marginTop: 50,
    marginBottom: 16,
  },
  view1: { alignSelf: 'center', flexDirection: 'row' },
});
