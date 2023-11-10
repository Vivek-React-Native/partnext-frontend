import React, {useState} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import CustomText from '../../Common/Components/Text/CustomText';
import {COLORS} from '../../Common/constants/Colors';
import CommonStyles from '../../Common/style/CommonStyles';
import SpaceStyles from '../../Common/style/SpaceStyles';
import TextStyles from '../../Common/style/TextStyles';

type props = {
  containerStyle?: Object;
  onPress: () => void;
  data: any;
};

const UpgradePlanView = ({containerStyle, data, onPress}: props) => {
  const [selected, setSelected] = useState(-1);
  const handlePress = () => {
    onPress();
  };
  return (
    <View style={[SpaceStyles.rowWrap, containerStyle]}>
      {data?.map((i: any, index: number) => {
        return (
          <TouchableOpacity
            onPress={() => {
              setSelected(index);
              handlePress();
            }}
            style={[
              CommonStyles.planView,
              {
                borderWidth: selected === index ? 1 : 0,
                borderColor:
                  selected === index ? COLORS.NAVEY_BLUE : COLORS.BLUE,
              },
            ]}
            key={index}>
            <CustomText
              text={i?.name}
              style={[TextStyles.bold18DarkBlue]}
              numberOfLines={undefined}
            />
            <CustomText
              text={i?.actual_price + '₪'}
              style={[TextStyles.regular12DarkBlue]}
              numberOfLines={undefined}
            />
            {i?.offer ? (
              <View style={CommonStyles.saveAmountView}>
                <CustomText
                  text={i?.offer}
                  style={[TextStyles.bold13DarkBlue]}
                  numberOfLines={undefined}
                />
              </View>
            ) : (
              <View style={[CommonStyles.saveAmountView, {borderWidth: 0}]}>
                <CustomText
                  text={i?.offer}
                  style={[TextStyles.bold13DarkBlue]}
                  numberOfLines={undefined}
                />
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default UpgradePlanView;
