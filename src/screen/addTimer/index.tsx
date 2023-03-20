import React, { useState, useEffect } from "react";
import { View, TextInput, Keyboard } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { COLORS } from "../../theme";
import { STRING } from "../../utils/string";
import ThemeButton from "../../component/custom/button/theme_button";
import Toast from 'react-native-simple-toast';
import styles from "./style";
import { NavigationProp, useNavigation } from "@react-navigation/native";

interface IAddTimerProps {
    route: any
}

function AddTimer({ route }: IAddTimerProps): JSX.Element {
    const { getTime, editItem, isFromEdit } = route.params;
    const navigation = useNavigation<NavigationProp<any, any>>();
    const [time, setTime] = useState('');

    useEffect(() => {
        // console.log("EDIT ITEM is: ", editItem)
        setTime(editItem ? editItem.item.noOfSeconds : '')
    }, [])

    const onAddTime = () => {
        if (time == '' || time.length <= 0) {
            Toast.show(STRING.please_enter_seconds, 1)
        } else {
            navigation.goBack();
            getTime(time, isFromEdit && isFromEdit, editItem && editItem.index);
            setTime('');
        }
    }

    return (
        <SafeAreaView style={styles.vMainConatiner}>
            <View style={styles.vConatiner}>
                <TextInput
                    style={styles.tInput}
                    placeholder={STRING.enter_time}
                    placeholderTextColor={COLORS.black_op}
                    value={time}
                    onChangeText={(value) => { setTime(value) }}
                    keyboardType={'numeric'}
                    onSubmitEditing={() => Keyboard.dismiss()} />
                <View style={styles.vButton}>
                    <ThemeButton title={STRING.add_timer} onPress={onAddTime} />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default AddTimer;
