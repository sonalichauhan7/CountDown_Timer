import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import ModalBox from 'react-native-modalbox';
import { APP_IMAGES } from "../../../assets/images";
import { COLORS, SIZES } from "../../../theme";
import { STRING } from "../../../utils/string";
import ThemeButton from "../button/theme_button";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    getTime: (time: any) => void;
}

function AddTimerModal({ isOpen, onClose, getTime }: IProps): JSX.Element {
    const [time, setTime] = useState('');

    const onAddTime = () => {
        getTime(time);
        onClose();
        setTime('');
    }
    return (
        <ModalBox
            style={styles.modalConatiner}
            isOpen={isOpen}
            onClosed={onClose}
            animationDuration={300}
            position="bottom"
            backButtonClose={true}
            coverScreen={true}
            swipeToClose={true}
        >
            <View>
                <TouchableOpacity style={styles.vClose} activeOpacity={0.8} onPress={() => { onClose(); setTime('') }}>
                    <Image source={APP_IMAGES.ic_circle_close} style={styles.iClose} resizeMode={'contain'} />
                </TouchableOpacity>
            </View>
            <View style={styles.vConatiner}>
                <TextInput
                    style={styles.tInput}
                    placeholder={STRING.enter_time}
                    placeholderTextColor={COLORS.black_op}
                    value={time}
                    onChangeText={(value) => { setTime(value) }}
                    keyboardType={'numeric'}
                    onSubmitEditing={() => { Keyboard.dismiss() }} />
                <View style={styles.vButton}>
                    <ThemeButton title={STRING.add_timer} onPress={onAddTime} />
                </View>

            </View>

        </ModalBox>
    )
}

export default AddTimerModal;

const styles = StyleSheet.create({
    modalConatiner: {
        backgroundColor: 'pink',
        height: SIZES.smartScale(400),
        borderTopLeftRadius: SIZES.countPixelRatio(20),
        borderTopRightRadius: SIZES.countPixelRatio(20)
    },
    vClose: {
        alignItems: 'center',
        marginTop: SIZES.smartScale(-50)
    },
    iClose: {
        height: SIZES.countPixelRatio(45),
        width: SIZES.countPixelRatio(45)
    },
    vConatiner: {
        // height: SIZES.smartScale(400),
        backgroundColor: 'red',
        marginHorizontal: SIZES.smartWidthScale(20)
    },
    tInput: {
        backgroundColor: COLORS.white_one,
        color: COLORS.black,
        borderRadius: SIZES.countPixelRatio(20),
        paddingHorizontal: SIZES.smartWidthScale(20),
        marginTop: SIZES.smartScale(20)
    },
    vButton: {
        marginTop: SIZES.smartScale(20),
    }
})