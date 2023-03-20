import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../theme';

const styles = StyleSheet.create({
    vMainConatiner: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    vConatiner: {
        flex: 1,
        backgroundColor: COLORS.white,
        marginHorizontal: SIZES.smartWidthScale(20)
    },
    tInput: {
        backgroundColor: COLORS.white_one,
        color: COLORS.black,
        fontSize: SIZES.countPixelRatio(16),
        fontWeight: 'bold',
        borderRadius: SIZES.countPixelRatio(20),
        paddingHorizontal: SIZES.smartWidthScale(20),
        marginTop: SIZES.smartScale(20),
        borderWidth: SIZES.countPixelRatio(2),
    },
    vButton: {
        marginTop: SIZES.smartScale(20),
    }
});

export default styles;