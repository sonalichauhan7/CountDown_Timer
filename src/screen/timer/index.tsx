import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import SafeAreaView from 'react-native-safe-area-view';
import { APP_IMAGES } from '../../assets/images';
import ThemeButton from '../../component/custom/button/theme_button';
import TimerList from '../../component/custom/item/timer_list';
import { Routes } from '../../navigation/route';
import { STRING } from '../../utils/string';
import styles from './style';

function Timer(): JSX.Element {
    const navigation = useNavigation<NavigationProp<any, any>>();
    const [timerList, setTimerList] = useState<any>([]);

    const calculateTime = (time: any, isFromEdit?: boolean, editItemIndex?: number) => {
        // console.log("In calculateTime ==>", time, isFromEdit, editItemIndex)
        let hours, minutes, seconds;
        hours = Math.floor(time / (60 * 60));

        let divisor_for_minutes = time % (60 * 60);
        minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        seconds = Math.ceil(divisor_for_seconds);

        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        // console.log("In calculateTime====>", hours + ":" + minutes + ":" + seconds)
        let obj = {
            "time": {
                "hours": hours,
                "minutes": minutes,
                "seconds": seconds,
            },
            "noOfSeconds": time,
            "isRunning": false,
            "isStop": false
        };
        let findIndex = timerList.findIndex((item: any, index: number) => index === editItemIndex);
        if (isFromEdit && findIndex >= 0) {
            timerList[findIndex] = obj;
            // console.log("After edit=====>", timerList[findIndex], findIndex)
        } else {
            timerList.push(obj)
        }
        setTimerList([...timerList]);
    }
    // console.log("Time is=====>", timerList)

    const onStopPress = (item: any, index: number) => {
        // console.log("onStopPress called====>", item);
        var findIndex = timerList.findIndex((item: any, itemIndendex: number) => itemIndendex === index);
        timerList[findIndex].isRunning = false;
        timerList[findIndex].isStop = true;
        setTimerList([...timerList]);
    }

    const onResumePress = (item: any, index: number) => {
        // console.log("onResumePress called====>", item);
        var findIndex = timerList.findIndex((item: any, itemIndendex: number) => itemIndendex === index);
        timerList[findIndex].isRunning = true;
        timerList[findIndex].isStop = false;
        setTimerList([...timerList]);
    }

    const onStartPress = (item: any, index: number) => {
        // console.log("onStartPress called====>", item);
        var findIndex = timerList.findIndex((item: any, itemIndendex: number) => itemIndendex === index);

        timerList[findIndex].isRunning = true;
        timerList[findIndex].isStop = false;
        timerList[findIndex].noOfSeconds = item.noOfSeconds;

        let timer = timerList[findIndex].noOfSeconds;
        let hours, minutes, seconds;
        const interVal = setInterval(() => {
            if (timer > 0 && timerList[findIndex].isRunning === true) {
                if (--timer <= 0) {
                    // console.log("If block===>", timer);
                    // console.log("Timer reaches 0");

                    let time = timerList[findIndex].noOfSeconds;
                    hours = Math.floor(time / (60 * 60));

                    let divisor_for_minutes = time % (60 * 60);
                    minutes = Math.floor(divisor_for_minutes / 60);

                    let divisor_for_seconds = divisor_for_minutes % 60;
                    seconds = Math.ceil(divisor_for_seconds);

                    hours = hours < 10 ? "0" + hours : hours;
                    minutes = minutes < 10 ? "0" + minutes : minutes;
                    seconds = seconds < 10 ? "0" + seconds : seconds;

                    let obj = {
                        "hours": hours,
                        "minutes": minutes,
                        "seconds": seconds,
                    };

                    timerList[findIndex].time = obj;
                    timerList[findIndex].noOfSeconds = timerList[findIndex].noOfSeconds;
                    timerList[findIndex].isRunning = false;
                    timerList[findIndex].isStop = false;

                    setTimerList([...timerList]);
                } else {
                    // console.log("Else block===>", timer);
                    hours = Math.floor(timer / (60 * 60));

                    let divisor_for_minutes = timer % (60 * 60);
                    minutes = Math.floor(divisor_for_minutes / 60);

                    let divisor_for_seconds = divisor_for_minutes % 60;
                    seconds = Math.ceil(divisor_for_seconds);

                    hours = hours < 10 ? "0" + hours : hours;
                    minutes = minutes < 10 ? "0" + minutes : minutes;
                    seconds = seconds < 10 ? "0" + seconds : seconds;

                    // console.log("when Start Timer calculateTime====>", hours + ":" + minutes + ":" + seconds)
                    let obj = {
                        "hours": hours,
                        "minutes": minutes,
                        "seconds": seconds,
                    };
                    timerList[findIndex].time = obj;
                    timerList[findIndex].noOfSeconds = timerList[findIndex].noOfSeconds;
                    timerList[findIndex].isRunning = true;
                    timerList[findIndex].isStop = false;
                    setTimerList([...timerList]);
                }

            }
        }, 1000)
        setTimerList([...timerList]);

        return () => clearInterval(interVal);
    }

    const renderBlankView = () => {
        return (
            <View style={styles.vBlankView}>
                <ThemeButton title={STRING.add_timer} onPress={onAddTimer} />
            </View>
        )
    }

    const onAddTimer = () => {
        // console.log("Add Timer called...");
        navigation.navigate(Routes.AddTimer, { getTime: handleTime });
    }

    const handleTime = (time: any, isFromEdit?: boolean, editItemIndex?: number) => {
        // console.log("Time from user===>", time)
        calculateTime(time, isFromEdit, editItemIndex)
    }

    const handleSecondPress = (item: any, index: number) => {
        // console.log("handleSecondPress called===>", item, index);
        onStopPress(item, index);
        navigation.navigate(Routes.AddTimer, { getTime: handleTime, editItem: { item: item, index: index }, isFromEdit: true });
    }

    const renderListView = () => {
        return (
            <FlatList
                data={timerList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => renderTimerList(item, index)}
                showsVerticalScrollIndicator={false}
                bounces={false}
            />
        )
    }

    const renderTimerList = (item: any, index: any) => {
        return (
            <TimerList
                item={item}
                index={index}
                onItemPress={!item.isRunning && !item.isStop ? onStartPress :
                    item.isRunning ? onStopPress : onResumePress}
                onSecondPress={() => handleSecondPress(item, index)} />
        )
    }

    const renderAddButton = () => {
        return (
            // <View style={{  alignItems:'flex-end' }}>
            <TouchableOpacity onPress={onAddTimer} activeOpacity={0.8} style={styles.toAdd}>
                <Image source={APP_IMAGES.ic_add_icon} resizeMode={'contain'} style={styles.iAddIcon} />
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={styles.vMainConatiner}>
            <View style={styles.vConatiner}>
                {timerList.length === 0 ? renderBlankView() : renderListView()}
                {timerList.length > 0 && renderAddButton()}
            </View >
        </SafeAreaView>
    )
};

export default Timer;