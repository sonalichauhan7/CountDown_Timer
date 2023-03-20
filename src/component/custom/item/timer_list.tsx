import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, SIZES } from "../../../theme";
import { STRING } from "../../../utils/string";

interface ITimerListProps {
    item: any;
    index: number;
    onItemPress: (item: any, index: number) => void;
    onSecondPress: () => void;
}

function TimerList({ item, index, onItemPress, onSecondPress }: ITimerListProps): JSX.Element {
    // console.log("Item====>", item, "isRunning====>", item.isRunning, "isStop===>", item.isStop)
    return (
        <View style={styles.vContainer}>
            <View style={styles.vInnerContainer}>
                <TouchableOpacity onPress={onSecondPress} activeOpacity={0.8} style={styles.vBox}>
                    <Text style={styles.title}>{item.noOfSeconds}</Text>
                </TouchableOpacity>
                <View style={styles.vBox}>
                    <Text style={styles.title}>{item.time.hours}:{item.time.minutes}:{item.time.seconds}</Text>
                </View>
                <TouchableOpacity activeOpacity={0.8} style={styles.vBox} onPress={() => onItemPress(item, index)}>
                    <Text style={styles.title}>
                        {!item.isRunning && !item.isStop ? STRING.start :
                            item.isRunning ? STRING.stop : STRING.resume}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default TimerList;

const styles = StyleSheet.create({
    vContainer: {
        flex: 1,
        width: '100%',
        borderColor: COLORS.black,
        borderRadius: SIZES.countPixelRatio(20),
        borderWidth: SIZES.countPixelRatio(2),
        paddingVertical: SIZES.smartScale(20),
        marginVertical: SIZES.smartScale(20),
        // backgroundColor: 'red'
    },
    vInnerContainer: {
        flexDirection: 'row',
        // backgroundColor: 'pink',
        justifyContent: 'space-evenly'
    },
    vBox: {
        borderColor: COLORS.black,
        borderWidth: SIZES.countPixelRatio(2),
        height: SIZES.smartScale(40),
        width: SIZES.smartWidthScale(90),
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: COLORS.black,
        fontSize: SIZES.countPixelRatio(18),
        fontWeight: 'bold'
    }
})