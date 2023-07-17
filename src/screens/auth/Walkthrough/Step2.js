import React from 'react'
import { Text, StyleSheet, Dimensions, View, TouchableOpacity } from "react-native"
import { primaryColor } from '../../../utils/Colors';
import { Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { PoppinsRegular } from '../../../utils/fonts';

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const Step2 = ({ skipWalkthrough }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={{ display: "flex", alignItems: "flex-end" }} onPress={skipWalkthrough}>
                <Image source={require("../../../assets/skip.png")} />
            </TouchableOpacity>
            <View style={styles?.imageContainer} >
                <Image style={{ width: SCREEN_WIDTH * 0.8, height: SCREEN_HEIGHT * 0.5 }} resizeMode='contain' source={require("../../../assets/walkthrough/step2/step2.png")} />
            </View>

            <View style={styles?.stepDotsContainer} >
                <Image style={styles?.stepDotIcon} source={require("../../../assets/walkthrough/step-dot-white.png")} />
                <Image style={styles?.stepDotIcon} source={require("../../../assets/walkthrough/step-dot-red.png")} />
                <Image style={styles?.stepDotIcon} source={require("../../../assets/walkthrough/step-dot-white.png")} />
            </View>

            <View style={{
                display: "flex",
                alignItems: "center",
                marginTop: SCREEN_HEIGHT / 20,
                height: "50%"
            }}>
                <Text style={{ ...styles?.heading }} >Choose Venue</Text>
                <Text style={{ ...styles.forecolor }}>Choose your favourtie venue including Caterers, Decorators & Photographers from your home!</Text>

                <View style={{ flexDirection: "row" , alignItems: "center", position: "absolute", bottom: 80 }} >
                    <Text style={{ fontFamily: PoppinsRegular, fontWeight: 700, color: "#B3B3B3" }} >SWIPE UP</Text>
                    <Icon name='caret-up' type='font-awesome' size={20} color={"#B3B3B3"} style={{marginLeft: 10}} />
                </View>
            </View>
        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        height: SCREEN_HEIGHT - 200,
        width: SCREEN_WIDTH,
        paddingHorizontal: SCREEN_WIDTH / 10,
        marginTop: 40
    },
    imageContainer: {
        // display: "flex",
        // flexDirection: "row",
        // justifyContent: "center",
        // height: 420,
        // flexWrap: "wrap"
    },
    bottomView: {

    },
    stepDotsContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"

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
        paddingTop: 15,
        fontSize: SCREEN_HEIGHT / 40
    },
    heading: {
        fontWeight: "800",
        color: primaryColor,
        fontFamily: "PublicSans",
        fontSize: SCREEN_HEIGHT / 30
    }
});

export default Step2