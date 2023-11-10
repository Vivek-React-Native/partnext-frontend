import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Images } from '../../constants/Images';
import { BaseStyle } from '../../constants/BaseStyle';

interface Props {
  oppositeUser?: string | undefined;
  currentUser?: string | undefined;
}

const PDImage = ({ oppositeUser, currentUser }: Props) => {
  return (
    <View style={styles.PartnextImageContainer}>
      <View style={styles.Welcome_P}>
        <Image
          source={oppositeUser ? { uri: oppositeUser } : Images.Welcome_PUser}
          resizeMode={'cover'}
          style={styles.Welcome_PUser}
        />
        <Image
          source={Images.Welcome_P}
          resizeMode={'stretch'}
          style={styles.image100}
        />
      </View>
      <View style={styles.Welcome_D}>
        <Image
          source={currentUser ? { uri: currentUser } : Images.Welcome_DUser}
          resizeMode={'cover'}
          style={styles.Welcome_DUser}
        />
        <Image
          source={Images.Welcome_D}
          resizeMode={'stretch'}
          style={styles.image100}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  PartnextImageContainer: {
    width: BaseStyle.DEVICE_WIDTH,
    height: BaseStyle.DEVICE_HEIGHT * 0.87,
    position: 'absolute',
    top: BaseStyle.DEVICE_HEIGHT * 0.06,
  },
  Welcome_P: {
    width: '54%',
    height: '70%',
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  Welcome_D: {
    width: '54%',
    height: '70%',
    top: 0,
    right: 0,
    position: 'absolute',
  },
  image100: {
    width: '100%',
    height: '100%',
  },
  Welcome_PUser: {
    width: '71%',
    height: '34%',
    position: 'absolute',
    top: BaseStyle.DEVICE_HEIGHT * 0.04,
    left: BaseStyle.DEVICE_WIDTH * 0.08,
    borderTopRightRadius: BaseStyle.DEVICE_WIDTH * 0.1,
    borderBottomRightRadius: BaseStyle.DEVICE_WIDTH * 0.1,
  },
  Welcome_DUser: {
    width: '71%',
    height: '34%',
    position: 'absolute',
    bottom: BaseStyle.DEVICE_HEIGHT * 0.04,
    right: BaseStyle.DEVICE_WIDTH * 0.08,
    borderBottomLeftRadius: BaseStyle.DEVICE_WIDTH * 0.1,
    borderTopLeftRadius: BaseStyle.DEVICE_WIDTH * 0.1,
  },
});

export default PDImage;
