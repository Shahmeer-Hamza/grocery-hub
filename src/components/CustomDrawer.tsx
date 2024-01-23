import { useState, useContext } from 'react';
import { Dimensions, StyleSheet, Text, Pressable, Image, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Logo } from '../utils/Logos';
import { background, primaryColor, secondaryColor, whitecolor } from '../utils/Colors';
import { useNavigation } from '@react-navigation/native';
import { RalewayRegular } from '../utils/fonts';
import { AuthContext } from '../navigation/AuthProvider';
import LinearGradient from 'react-native-linear-gradient';
import Logout from '../screens/account/actions/logout';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function CustomDrawerContent({ setShowMenu, closeDrawwer }) {
    const { logout, user, name } = useContext(AuthContext);
    const navigation = useNavigation()
    const [active, setActive] = useState("")

    const navigateTo = (pathname) => {
        setActive(pathname)
        navigation.getParent().navigate(pathname)
        // setShowMenu(false)
        closeDrawwer()
    }
    return (
        // <LinearGradient colors={['#52D068', '#229236 ']} style={{ flex: 1, }} >
        <View style={{ ...styles.container, }}>
            <View style={styles.cardContainer}>
                {/* <View style={{ paddingHorizontal: 30, paddingVertical: 30 }} >
                    <Logo width={220} height={70} />
                </View> */}
                <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 30, }}>
                    <View style={{ width: '85%', flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ width: 70, height: 70 }}>
                            <Image source={require('../assets/profile-icon.png')} resizeMode='contain' style={{ width: '100%', height: '100%' }} />
                        </View>
                        <View style={{ paddingLeft: 20, }}>
                            <Text style={{ color: whitecolor, fontFamily: RalewayRegular, fontSize: 12, fontWeight: '500' }}>Welcome</Text>
                            <Text style={{ color: whitecolor, fontFamily: RalewayRegular, fontSize: 24, fontWeight: '600' }}>{name??user?.username??user?.displayName}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ borderTopColor: whitecolor, borderTopWidth: 0.3, paddingVertical: 20, }}>
                    <Pressable style={[styles?.listItem, active == "Dashboard" && { backgroundColor: primaryColor, opacity: 0.9 }]} onPress={() => navigateTo("Dashboard")} >
                        {/* {active == "Dashboard" && <View style={{ width: 5, height: 50, backgroundColor: secondaryColor, position: "absolute", left: 0, borderTopRightRadius: 7, borderBottomRightRadius: 7 }} ></View>} */}
                        <View style={[{ paddingVertical: 10, ...styles?.listItem, paddingHorizontal: 40 }]} >
                            {/* <Image source={require("../assets/Vector.png")} /> */}
                            <Text style={styles?.listItemText} >Home</Text>
                        </View>
                    </Pressable>
                    <Pressable style={[styles?.listItem, active == "Cart" && { backgroundColor: primaryColor, opacity: 0.9 }]} onPress={() => navigateTo("Cart")} >
                        {/* {active == "Cart" && <View style={{ width: 5, height: 50, backgroundColor: secondaryColor, position: "absolute", left: 0, borderTopRightRadius: 7, borderBottomRightRadius: 7 }} ></View>} */}
                        <View style={[{ paddingVertical: 10, ...styles?.listItem, paddingHorizontal: 40 },]} >
                            {/* <Image source={require("../assets/Vector-1.png")} /> */}
                            <Text style={styles?.listItemText} >Cart</Text>
                        </View>
                    </Pressable>
                    <Pressable style={[styles?.listItem, active == "Discount" && { backgroundColor: primaryColor, opacity: 0.9 }]} onPress={() => navigateTo("Discount")} >
                        {/* {active == "Discount" && <View style={{ width: 5, height: 50, backgroundColor: secondaryColor, position: "absolute", left: 0, borderTopRightRadius: 7, borderBottomRightRadius: 7 }} ></View>} */}
                        <View style={[{ paddingVertical: 10, ...styles?.listItem, paddingHorizontal: 40 },]} >
                            {/* <Image source={require("../assets/Vector-1.png")} /> */}
                            <Text style={styles?.listItemText}>Discounts</Text>
                        </View>
                    </Pressable>
                </View>
                <View style={{ borderTopColor: whitecolor, borderTopWidth: 0.3, paddingVertical: 20, }}>
                    {/* <Pressable style={[styles?.listItem, active == "Wishlist" && { backgroundColor: primaryColor, opacity: 0.9 }]} onPress={() => navigateTo("Wishlist")} >
                        // {active == "Wishlist" && <View style={{ width: 5, height: 50, backgroundColor: secondaryColor, position: "absolute", left: 0, borderTopRightRadius: 7, borderBottomRightRadius: 7 }} ></View>}
                        <View style={[{ paddingVertical: 10, ...styles?.listItem, paddingHorizontal: 40 },]} >
                            <Image source={require("../assets/heart-icon.png")} />
                            <Text style={styles?.listItemText} >Favourites</Text>
                        </View>
                    </Pressable> */}
                    <Pressable style={[styles?.listItem, active == "Wishlist" && { backgroundColor: primaryColor, opacity: 0.9 }]} onPress={() => navigateTo("Order")} >
                        {/* {active == "Order" && <View style={{ width: 5, height: 50, backgroundColor: secondaryColor, position: "absolute", left: 0, borderTopRightRadius: 7, borderBottomRightRadius: 7 }} ></View>} */}
                        <View style={[{ paddingVertical: 10, ...styles?.listItem, paddingHorizontal: 40 },]} >
                            {/* <Image source={require("../assets/heart-icon.png")} /> */}
                            <Text style={styles?.listItemText} >My Orders</Text>
                        </View>
                    </Pressable>
                    <Pressable style={[styles?.listItem, active == "AccountStack" && { backgroundColor: primaryColor, opacity: 0.9 }]} onPress={() => navigateTo("AccountStack")} >
                        {/* {active == "AccountStack" && <View style={{ width: 5, height: 50, backgroundColor: secondaryColor, position: "absolute", left: 0, borderTopRightRadius: 7, borderBottomRightRadius: 7 }} ></View>} */}
                        <View style={[{ paddingVertical: 10, ...styles?.listItem, paddingHorizontal: 40 },]} >
                            {/* <Image source={require("../assets/account-icon.png")} /> */}
                            <Text style={styles?.listItemText} >My Account</Text>
                        </View>
                    </Pressable>
                </View>
                <View style={{ borderTopColor: whitecolor, borderTopWidth: 0.3, paddingVertical: 20, }}>
                    <Pressable style={[styles?.listItem, active == "Notifications" && { backgroundColor: primaryColor, opacity: 0.9 }]} onPress={() => logout()} >
                        <View style={[{ paddingVertical: 10, ...styles?.listItem, paddingHorizontal: 40 },]} >
                            {/* <Image source={require("../assets/logout-icon.png")} /> */}
                            <Text style={styles?.listItemText} >Logout</Text>
                        </View>
                    </Pressable>
                </View>
            </View>
        </View>
        // </LinearGradient>
    );
}
const styles = StyleSheet.create({
    container: {
        // padding: 16,
    },
    listItem: {
        flexDirection: "row",
        alignItems: "center",
    },
    listItemText: {
        color: whitecolor,
        fontFamily: RalewayRegular,
        marginLeft: 10,
        fontSize: 20,
        letterSpacing: 1,
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