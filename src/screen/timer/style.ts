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
    vBlankView: {
        flex: 1,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center'
    },
    toAdd: {
        width: SIZES.countPixelRatio(100),
        height: SIZES.countPixelRatio(100),
        marginBottom: SIZES.smartScale(20),
        marginRight: SIZES.smartScale(20),
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        // backgroundColor: "pink",
        position: 'absolute',
        right: 0,
        bottom: 0,
        zIndex: 1
    },
    iAddIcon: {
        height: SIZES.countPixelRatio(75),
        width: SIZES.countPixelRatio(75)
    }
});

export default styles;