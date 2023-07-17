import { useState } from 'react';
import { Dimensions, StyleSheet, Text, Pressable, Image, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Logo } from '../utils/Logos';
import { secondaryColor, whitecolor } from '../utils/Colors';
import { useNavigation } from '@react-navigation/native';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function CustomDrawerContent({ }) {
    const navigation = useNavigation()
    const [active, setActive] = useState("")

    const navigateTo = (pathname) => {
        setActive(pathname)
        navigation.getParent().navigate(pathname)
    }

    return (
        <View style={{ ...styles.container, }}>
            <View style={styles.cardContainer}>
                {/* <View style={{ paddingHorizontal: 30, paddingVertical: 30 }} >
                    <Logo width={220} height={70} />
                </View> */}
                <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{width: '85%', flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{width: 70, height: 70}}>
                            <Image source={require('../assets/profile-icon.png')} resizeMode='contain' style={{width: '100%', height: '100%'}} />
                        </View>
                        <View style={{ paddingLeft: 20, }}>
                            <Text style={{ color: whitecolor, fontFamily: 'Raleway', fontSize: 12, fontWeight: '500'}}>Welcome</Text>
                            <Text style={{ color: whitecolor, fontFamily: 'Raleway', fontSize: 24, fontWeight: '600'}}>Sheheryar Noor</Text>
                        </View>
                    </View>
                </View>
                <Pressable style={styles?.listItem} onPress={() => navigateTo("Home")} >
                    {active == "Home" && <View style={{ width: 5, height: 50, backgroundColor: secondaryColor, position: "absolute", left: 0, borderTopRightRadius: 7, borderBottomRightRadius: 7 }} ></View>}
                    <View style={{ paddingVertical: 20, ...styles?.listItem, paddingHorizontal: 40 }} >
                        {/* <Image source={require("../assets/Vector.png")} /> */}
                        <Text style={styles?.listItemText} >Dashboard</Text>
                    </View>
                </Pressable>
                <Pressable style={styles?.listItem} onPress={() => navigateTo("Wishlist")} >
                    {active == "as" && <View style={{ width: 5, height: 50, backgroundColor: secondaryColor, position: "absolute", left: 0, borderTopRightRadius: 7, borderBottomRightRadius: 7 }} ></View>}
                    <View style={{ paddingVertical: 20, ...styles?.listItem, paddingHorizontal: 40 }} >
                        {/* <Image source={require("../assets/Vector-1.png")} /> */}
                        <Text style={styles?.listItemText} >Appointments</Text>
                    </View>
                </Pressable>
                <Pressable style={styles?.listItem} onPress={() => navigateTo("Wishlist")} >
                    {active == "Wishlist" && <View style={{ width: 5, height: 50, backgroundColor: secondaryColor, position: "absolute", left: 0, borderTopRightRadius: 7, borderBottomRightRadius: 7 }} ></View>}
                    <View style={{ paddingVertical: 20, ...styles?.listItem, paddingHorizontal: 40 }} >
                        {/* <Image source={require("../assets/heart-icon.png")} /> */}
                        <Text style={styles?.listItemText} >Favourites</Text>
                    </View>
                </Pressable>
                <Pressable style={styles?.listItem} onPress={() => navigateTo("Wishlist")} >
                    {active == "Notifications" && <View style={{ width: 5, height: 50, backgroundColor: secondaryColor, position: "absolute", left: 0, borderTopRightRadius: 7, borderBottomRightRadius: 7 }} ></View>}
                    <View style={{ paddingVertical: 20, ...styles?.listItem, paddingHorizontal: 40 }} >
                        {/* <Image source={require("../assets/notification-icon.png")} /> */}
                        <Text style={styles?.listItemText} >Notifications</Text>
                    </View>
                </Pressable>
                <Pressable style={styles?.listItem} onPress={() => navigateTo("Account")} >
                    {active == "Account" && <View style={{ width: 5, height: 50, backgroundColor: secondaryColor, position: "absolute", left: 0, borderTopRightRadius: 7, borderBottomRightRadius: 7 }} ></View>}
                    <View style={{ paddingVertical: 20, ...styles?.listItem, paddingHorizontal: 40 }} >
                        {/* <Image source={require("../assets/account-icon.png")} /> */}
                        <Text style={styles?.listItemText} >Account</Text>
                    </View>
                </Pressable>
                <Pressable style={styles?.listItem} onPress={() => navigateTo("Logout")} >
                    {active == "Notifications" && <View style={{ width: 5, height: 50, backgroundColor: secondaryColor, position: "absolute", left: 0, borderTopRightRadius: 7, borderBottomRightRadius: 7 }} ></View>}
                    <View style={{ paddingVertical: 20, ...styles?.listItem, paddingHorizontal: 40 }} >
                        {/* <Image source={require("../assets/logout-icon.png")} /> */}
                        <Text style={styles?.listItemText} >Logout</Text>
                    </View>
                </Pressable>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        // padding: 16,
    },
    listItem: {
        flexDirection: "row",
        alignItems: "center"
    },
    listItemText: {
        color: secondaryColor, marginLeft: 10, fontSize: 18, letterSpacing: 0.2
    },
    navigationContainer: {
    },
    drawerCloseButton: {
        alignSelf: "flex-end",
    },
    cardContainer: {
        // paddingVertical: 50,
    },
    card: {
        width: (windowWidth / 2) - 15,
        height: 150,
        margin: 6
    },
    cardHeading: {
        fontSize: windowWidth / 20,
        fontWeight: "700",
        textTransform: "uppercase",
        textAlign: "center",
        textAlignVertical: "center",
        display: "flex",
        paddingHorizontal: 7,
        height: 150
    }
});

export default CustomDrawerContent