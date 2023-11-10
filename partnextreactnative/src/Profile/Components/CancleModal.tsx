import React from "react";
import { View } from "react-native";
import Modal from "react-native-modal";
import CommonButton from "../../Common/Components/Button/CommonButton";
import CustomText from "../../Common/Components/Text/CustomText";
import CommonStyles from "../../Common/style/CommonStyles";
import SpaceStyles from "../../Common/style/SpaceStyles";
import TextStyles from "../../Common/style/TextStyles";
import { useTranslation } from 'react-i18next';

type props = {
    openFilterModal: boolean;
    setOpenFilterModal: Function;
};

const CancleModal = ({ openFilterModal, setOpenFilterModal }: props) => {

    const { t } = useTranslation();

    return (
        <Modal
            isVisible={openFilterModal}
            animationIn={'slideInUp'}
            animationOut='slideOutDown'
            onBackButtonPress={() => setOpenFilterModal(false)}
            onBackdropPress={() => setOpenFilterModal(false)}
        >
            <View style={CommonStyles.cancelModalView}>
                <CustomText
                    text={t('profile.cancelupgrade')}
                    style={[TextStyles.regularDongle48DarkBlue, SpaceStyles.alignSelf]}
                    numberOfLines={undefined}
                />
                <CustomText
                    text={t('profile.automaticallyrenew')}
                    style={[TextStyles.regular14DarkBlue, SpaceStyles.top1, SpaceStyles.alignSelf, SpaceStyles.spaceHorizontal]}
                    numberOfLines={undefined}
                />

                <CommonButton
                    containerStyle={SpaceStyles.top3}
                    title={t('profile.cancelupgrade')}
                    onPress={() => setOpenFilterModal(false)}
                    whiteButton={false}
                />
                <View style={SpaceStyles.top2}>
                    <CommonButton
                        containerStyle={undefined}
                        title={t('profile.keepupgrading')}
                        onPress={() => setOpenFilterModal(false)}
                        whiteButton={true}
                    />
                </View>
            </View>
        </Modal>
    );
};

export default CancleModal;