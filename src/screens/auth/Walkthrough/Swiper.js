import React, { useContext, useRef } from "react";
import {
    Animated,
    Text,
    View,
    Image,
    StyleSheet,
    Dimensions,
    DevSettings,
    ScrollView
} from "react-native";

import {
    ParallaxSwiper,
    ParallaxSwiperPage
} from "react-native-parallax-swiper";
import { primaryColor, secondaryColor, walkthroughBackground } from "../../../utils/Colors";
import FirstCard from "./FirstCard";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { AuthContext, storage } from "../../../navigation/AuthProvider";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { AsyncStorage } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import BottomSwipe from "./BottomSwipe";

const { width, height } = Dimensions.get("window");

export default function Swiper() {
    const { user,
        setWalkthrough,
        getWalkthrough
    } = useContext(AuthContext);
    const navigation = useNavigation()

    const walkthroughCompleted = () => {
        AsyncStorage.setItem("_walkthrough", "1").then((res) => setWalkthrough(1)).then(() => getWalkthrough()).then(() => navigation.navigate("Login"))
    }

    return (
        // <ScrollView>
        <ParallaxSwiper
            speed={0.5} // Adjust the parallax scrolling speed as desired
            vertical
            showsVerticalScrollIndicator={false}>
                
            <ParallaxSwiperPage
                BackgroundComponent={
                    <Image
                        style={styles.backgroundImage}
                        source={{ uri: "" }}
                    />
                }
            
                ForegroundComponent={
                    <View style={{ ...styles.container, backgroundColor: walkthroughBackground }}>
                            <FirstCard skipWalkthrough={walkthroughCompleted} />
                        </View>
                }
            />
            <ParallaxSwiperPage
                BackgroundComponent={
                    <Image
                        style={styles.backgroundImage}
                        source={{ uri: "" }}
                    />
                }
                ForegroundComponent={
                    <View style={{ ...styles.container, backgroundColor: "#fff" }}>
                        <Step2 skipWalkthrough={walkthroughCompleted} />
                    </View>
                }
            />
            <ParallaxSwiperPage
                parallaxTilt={50}
                flipVertical={false}
                BackgroundComponent={
                    <Image
                        style={styles.backgroundImage}
                        source={{ uri: "" }}
                    />
                }
                ForegroundComponent={
                    <View style={{ ...styles.container, backgroundColor: "#fff" }}>
                        <Step3 walkthroughCompleted={walkthroughCompleted} />
                    </View>
                }
            />

        </ParallaxSwiper>
        // </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%"
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    backgroundImage: {
        width,
        height,

    },
    foregroundTextContainer: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
    },
    foregroundText: {
        fontSize: 34,
        fontWeight: "700",
        letterSpacing: 0.41,
        color: "#000"
    }
});