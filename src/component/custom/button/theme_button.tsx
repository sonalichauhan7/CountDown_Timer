import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from "../../../theme";
import { STRING } from "../../../utils/string";

interface IThemeButtonProps {
    title: string;
    onPress: () => void;
}

function ThemeButton({ title, onPress }: IThemeButtonProps): JSX.Element {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.vButton}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
};

export default ThemeButton;

const styles = StyleSheet.create({
    vButton: {
        backgroundColor: COLORS.blue,
        width: '100%',
        borderRadius: SIZES.countPixelRatio(10),
        alignItems: 'center',
        paddingVertical: SIZES.smartScale(10)
    },
    title: {
        color: COLORS.white,
        fontSize: SIZES.countPixelRatio(15),
        fontWeight: 'bold'
    }
})