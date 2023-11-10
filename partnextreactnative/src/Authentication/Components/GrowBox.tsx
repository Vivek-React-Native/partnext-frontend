import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  Platform,
} from "react-native";
import style from "../../AuthFont/style";
import LinearGradient from "react-native-linear-gradient";
import { COLORS } from "../../Common/constants/Colors";
import Lable from "../../Common/constants/English";
import { Images } from "../../Common/constants/Images";
import CommonStyles from "../../Common/style/CommonStyles";
import CustomText from "../../Common/Components/Text/CustomText";
import TextStyles from "../../Common/style/TextStyles";
import SpaceStyles from "../../Common/style/SpaceStyles";
import { BaseStyle } from "../../Common/constants/BaseStyle";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type props = {
  onCancel: () => void;
  onAccept: () => void;
  user_images: any;
  currentPosition: any;
  name: any;
  image: any;
  userId: any;
  user_category: any;
  user_intersts: any;
  experience: any;
};
export default function GrowBox({
  onCancel,
  onAccept,
  image,
  currentPosition,
  name,
  navigation,
  userId,
  experience,
  user_category,
  user_intersts,
}: props) {
  const renderTags = (
    item: { name: any; intersts: any },
    index: React.Key | null | undefined
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
    index: React.Key | null | undefined
  ) => {
    return (
      <>
        <TouchableOpacity
          key={index}
          style={[
            CommonStyles.tagView,
            item?.category?.name == "I own a business"
              ? { borderColor: "#FFAB4A" + 90 }
              : item?.category?.name == "I own a startup"
              ? { borderColor: "#FFAB4A" + 90 }
              : item?.category?.name == "I have an idea"
              ? { borderColor: "#FFAB4A" + 90 }
              : item?.category?.name == "Grow an idea"
              ? { borderColor: "#FFAB4A" + 90 }
              : item?.category?.name == "Partnership on a startup"
              ? { borderColor: "#FFAB4A" + 90 }
              : item?.category?.name == "Partnership on existing business"
              ? { borderColor: "#FFAB4A" + 90 }
              : item?.category?.name == "Stratagic Partner"
              ? { borderColor: "#ABB8FF" }
              : item?.category?.name == "Active Partner"
              ? { borderColor: "#ABB8FF" }
              : { borderColor: "#ABB8FF" },
          ]}
        >
          <CustomText
            style={[TextStyles.bold13DarkBlue]}
            text={item?.category?.name}
            numberOfLines={undefined}
          />
        </TouchableOpacity>
      </>
    );
  };
  return (
    <View style={styles.growBox}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("UserProfileScreen", {
            userId: userId,
          })
        }
      >
        <View style={styles.growBox1}>
          <Image
            source={{ uri: image && image[0]?.image?.media_file_url }}
            style={styles.img3}
          />
          <View style={styles.growBox1_view}>
            <Text style={style.text2}>{name}</Text>
            <Text style={style.smallText}>{currentPosition}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={SpaceStyles.rowWrap}>
        {user_category?.map((i, index) => {
          return renderCat(i, index);
        })}
        {user_intersts?.map((i, index) => {
          return renderTags(i, index);
        })}
        {experience != null && experience !== undefined && (
          <TouchableOpacity style={[CommonStyles.tagView]}>
            <CustomText
              style={[TextStyles.bold13DarkBlue]}
              text={experience + " " + "years of experience"}
              numberOfLines={undefined}
            />
          </TouchableOpacity>
        )}
      </View>
      {/* <View style={styles.growBox2}>
        <LinearGradient
          style={{ borderRadius: 20, padding: 1.5 }}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          colors={['#FFAB4A', '#FFD833']}>
          <TouchableOpacity style={[styles.smallChip]} activeOpacity={1}>
            <Text style={style.smallText1}>{Lable.PARTNERSHIP_ON_STARTUP}</Text>
          </TouchableOpacity>
        </LinearGradient>
        <LinearGradient
          style={{ marginLeft: 12, borderRadius: 20, padding: 1.5 }}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          colors={['#9CA0FF', '#ABB8FF']}>
          <TouchableOpacity style={[styles.smallChip]} activeOpacity={1}>
            <Text style={style.smallText1}>{Lable.ACTIVE_PARTER}</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View> */}
      <View style={styles.growBox3}>
        <TouchableOpacity onPress={onCancel}>
          <Image source={Images.wrong_box} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onAccept}>
          <Image source={Images.hand} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  growBox: {
    // height: 206,
    backgroundColor: COLORS.WHITE,
    borderRadius: 18,
    padding: 10,
    justifyContent: "space-between",
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 15,
    marginVertical: 20,
  },
  growBox1: {
    flexDirection: "row",
  },
  growBox1_view: {
    marginLeft: 11,
    width: "50%",
  },
  growBox2: {
    flexDirection: "row",
  },
  growBox3: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  img3: {
    width: 84,
    height: 84,
    borderRadius: 15,
  },
  smallChip: {
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: COLORS.WHITE,
  },
  container: {
    flex: 1,
    backgroundColor: "#F2F9FF",
  },
});
