import React from 'react'
import { Text, StyleSheet, Dimensions, View, TouchableOpacity, ProgressBarAndroid } from "react-native"
import { primaryColor, secondaryColor, walkthroughBackground } from '../../../utils/Colors';
import { Image } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const Step3 = ({ walkthroughCompleted }) => {
    const [isLoading, setLoading] = React.useState(false)

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <View style={styles?.imageContainer} >
                    <Image style={{ width: SCREEN_WIDTH * 0.8, height: SCREEN_HEIGHT * 0.5 }} resizeMode='contain' source={require("../../../assets/walkthrough/step3/step3.png")} />
                </View>
                <View style={styles?.stepDotsContainer} >
                    <Image style={styles?.stepDotIcon} source={require("../../../assets/walkthrough/step-dot-white.png")} />
                    <Image style={styles?.stepDotIcon} source={require("../../../assets/walkthrough/step-dot-white.png")} />
                    <Image style={styles?.stepDotIcon} source={require("../../../assets/walkthrough/step-dot-red.png")} />
                </View>

                <View style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: 20,
                }}>
                    <Text style={{ ...styles?.heading }} >Easy to Use</Text>
                    <Text style={{ ...styles.forecolor }}>It's that easy and safe to use!</Text>
                </View>
            </View>
            <View style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: SCREEN_HEIGHT/5, backgroundColor: walkthroughBackground }}>
                <TouchableOpacity style={{
                    ...styles?.startButton,
                    paddingVertical: SCREEN_HEIGHT/200,
                    width: "80%",
                    alignItems: "center"
                }} onPress={() => {
                    setLoading(true)
                    setTimeout(() => {
                        walkthroughCompleted()
                    }, 1000);
                }}>
                    <Text style={{ ...styles.heading, fontSize: 17, fontWeight: '600', color: "#fff",  paddingVertical: !isLoading ? SCREEN_HEIGHT/50 : 0, }} >
                        {
                              isLoading ? 
                            <ProgressBarAndroid color={"#fff"} styleAttr='Normal' />
                            : 
                            "GET STARTED"
                        }
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        backgroundColor: walkthroughBackground,
        height: SCREEN_HEIGHT,
        display: "flex",
        flexDirection: "column",

    },
    topContainer: {
        backgroundColor: "#fff",
        height: "75%",
        width: SCREEN_WIDTH,
        paddingHorizontal: SCREEN_WIDTH / 10,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    startButton: {
        backgroundColor: secondaryColor,

        borderRadius: 10,
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
        paddingTop: 5,
        fontSize: 16
    },
    heading: {
        fontWeight: "800",
        color: primaryColor,
        fontFamily: "PublicSans",
        fontSize: 24
    }
});

export default Step3