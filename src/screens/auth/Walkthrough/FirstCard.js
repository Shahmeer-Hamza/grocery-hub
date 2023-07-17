import React, { useEffect } from 'react'
import { Text, StyleSheet, Dimensions, View, Animated, TouchableOpacity } from "react-native"
import { primaryColor } from '../../../utils/Colors';
import { Image } from 'react-native';
import { PoppinsRegular } from '../../../utils/fonts';
import { Icon } from 'react-native-elements';
import BottomSwipe from './BottomSwipe';

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const FirstCard = ({ skipWalkthrough }) => {

    return (
        <>
            <BottomSwipe>
                <View style={styles.container}>
                    <TouchableOpacity style={{ display: "flex", alignItems: "flex-end", marginTop: 10, }} onPress={skipWalkthrough}>
                        <Image source={require("../../../assets/skip.png")} />
                    </TouchableOpacity>
                    <View style={styles?.imageContainer} >
                        <Image style={{ width: SCREEN_WIDTH * 0.8, height: SCREEN_HEIGHT * 0.5 }} resizeMode='contain' source={require("../../../assets/walkthrough/step1/step1.png")} />
                    </View>
                    <View style={styles?.stepDotsContainer} >
                        <Image style={styles?.stepDotIcon} source={require("../../../assets/walkthrough/step-dot-red.png")} />
                        <Image style={styles?.stepDotIcon} source={require("../../../assets/walkthrough/step-dot-white.png")} />
                        <Image style={styles?.stepDotIcon} source={require("../../../assets/walkthrough/step-dot-white.png")} />
                    </View>

                    <View style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: SCREEN_HEIGHT / 35,
                        height: "50%"
                    }}>
                        <Text style={{ ...styles?.heading }} >Choose Venue</Text>
                        <Text style={{ ...styles.forecolor }}>Choose your favourtie venue including Caterers, Decorators & Photographers from your home!</Text>

                        <View style={{ flexDirection: "row", alignItems: "center", position: "absolute", bottom: 180 }} >
                            <Text style={{ fontFamily: PoppinsRegular, fontWeight: 700, color: "#B3B3B3" }} >SWIPE UP</Text>
                            <Icon name='caret-up' type='font-awesome' size={20} color={"#B3B3B3"} style={{ marginLeft: 10 }} />
                        </View>
                    </View>
                </View>
            </BottomSwipe>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH,
        backgroundColor: "#fff",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        height: SCREEN_HEIGHT,
        paddingTop: 10,
        paddingHorizontal: SCREEN_WIDTH / 10,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        marginTop: 15
    },
    imageContainer: {
        // display: "flex",
        // flexDirection: "row",
        // justifyContent: "center",
        // height: 420,
        // flexWrap: "wrap"
    },
    stepDotsContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 20

    },
    stepDotIcon: {
        marginTop: 4
    },
    bottomSheet: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: SCREEN_HEIGHT - 50,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -3,
        },

        shadowOpacity: 0.1,
        shadowRadius: 4.65,
        elevation: 6,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 20,
        paddingHorizontal: 20
    },
    forecolor: {
        color: "#666666",
        fontFamily: "PublicSans",
        textAlign: "center",
        paddingTop: (SCREEN_HEIGHT > 700) ? 18 : 14,
        fontSize: (SCREEN_HEIGHT > 700) ? 18 : 14
    },
    heading: {
        fontWeight: "800",
        color: primaryColor,
        fontFamily: "PublicSans",
        fontSize: (SCREEN_HEIGHT > 700) ? 30 : 24
    }
});

export default FirstCard