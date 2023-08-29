import { StyleSheet, Text, View, Image, Dimensions, ImageBackground, Pressable } from 'react-native'
import React from 'react'
import { background, primaryColorShaded, whitecolor } from '../../utils/Colors'
import { RalewayRegular } from '../../utils/fonts'

const { width, height } = Dimensions.get("window")
const DiscountItems = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.imageContainer}>
                    <Image style={{ resizeMode: "contain", width: width / 2, height: width / 2 }} source={require("../../assets/discount-img.png")} />
                </View>
                <View>
                    <Text style={styles.messageText}>No Discount Available Right Now</Text>
                </View>
                <View>
                    <Pressable style={styles.backButton} onPress={() => navigation.navigate('Dashboard')}>
                        <Text style={styles.backButtonText}>
                            BACK TO HOME
                        </Text>
                    </Pressable>
                </View>
            </View>
        </View>

        // <View style={{ height: height / 1, }}>
        //     <View style={{ justifyContent: "center", alignItems: "center" }}>
        //         <View style={{ justifyContent: "center", alignItems: "center", width: width / 2, height: "20%" }}>
        //             <Image style={{ resizeMode: "contain", width: width / 2.2, height: height / 2 }} source={require("../../assets/discount-img.png")} />
        //         </View>
        //     </View>
        //     <View style={{ justifyContent: "center", alignItems: "center" }}>
        //         <Text style={{ color: "#000" }}>No Discount Available Right Now</Text>
        //     </View>
        // </View>
    )
}

export default DiscountItems

const styles = StyleSheet.create({
    container: {
        backgroundColor: background,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    contentContainer: {
        // width: width * .8,
        // backgroundColor: "red",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 100,
    },
    imageContainer: {
        // backgroundColor: "aqua",
        justifyContent: "center",
        alignItems: "center",
    },
    messageText: {
        color: primaryColorShaded,
        fontFamily: RalewayRegular,
        fontSize: 16,
        fontWeight: 600,
        letterSpacing: 1,
        paddingBottom: 16,
    },
    backButton: {
        backgroundColor: "#30A444",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        width: 180,
        height: 50,
    },
    backButtonText: {
        color: whitecolor,
        fontFamily: RalewayRegular,
        fontSize: 14,
        fontWeight: 600,
        letterSpacing: 1,
    }
})