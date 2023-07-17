import React, { useContext, useEffect, useReducer, useRef, useState } from 'react'
import {
    Pressable,
    StatusBar,
    StyleSheet,
    View,
    Text,
    LayoutChangeEvent,
    TouchableOpacity,
    Animated,
} from 'react-native'
// navigation
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { BottomTabBarProps, BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
// svg
import Svg, { Path } from 'react-native-svg'
// reanimated
// lottie
import HomeStackScreen from '../navigation/HomeStack'
import Wishlist from '../screens/wishlist'
import CartStackScreen from '../navigation/CartStack'
import AccountStackScreen from '../navigation/AccountStack'
import { Icon } from 'react-native-elements'
import { backgroundColor, primaryColor, primaryColorShaded, secondaryColor } from '../utils/Colors'
import { AuthContext } from '../navigation/AuthProvider'
// import CustomDrawerContent from './CustomDrawer'
import { createStackNavigator } from '@react-navigation/stack'
import CustomDrawerContent from './CustomDrawer'

// ------------------------------------------------------------------
const Stack = createStackNavigator()
const DrawerNav = ({ children, heading }) => {

    const [showMenu, setShowMenu] = useState(false);
    const moveToRight = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(1)).current

    return (
        <>
            <View style={{ flex: 1, backgroundColor: primaryColor }} >
                <Animated.View style={{ flex: 1, borderRadius: showMenu ? 20 : 0, backgroundColor: backgroundColor, position: "absolute", top: 0, bottom: 0, left: 0, right: 0, transform: [{ scale: scale }, { translateX: moveToRight }], opacity: showMenu ? 0.5 : 1 }} >
                    <View style={{ marginTop: 20, flexDirection: "row", alignItems: "center" }} >
                        <TouchableOpacity onPress={() => {
                            Animated.timing(scale, {
                                toValue: showMenu ? 1 : 0.8,
                                duration: 300,
                                useNativeDriver: true
                            }).start();
                            Animated.timing(moveToRight, {
                                toValue: showMenu ? 0 : 300,
                                useNativeDriver: true
                            }).start()
                            setShowMenu(true)
                        }} style={{ marginLeft: 20 }} >

                            <Icon name='menu' />
                        </TouchableOpacity>
                        <Text style={{ color: primaryColorShaded, fontSize: 18, fontWeight: '700', textAlign: "center", width: "80%", textTransform: "uppercase" }} >{heading}</Text>
                    </View>
                    {children}
                </Animated.View>
                {showMenu &&
                    <>
                        <View style={{ marginTop: 20, flexDirection: "row" }} >
                            <TouchableOpacity onPress={() => {
                                Animated.timing(scale, {
                                    toValue: showMenu ? 1 : 0.8,
                                    duration: 300,
                                    useNativeDriver: true
                                }).start();
                                Animated.timing(moveToRight, {
                                    toValue: showMenu ? 0 : 250,
                                    duration: 300,
                                    useNativeDriver: true
                                }).start()
                                setShowMenu(false)
                            }} style={{ marginLeft: 20 }} >

                                <Icon name='close' />
                            </TouchableOpacity>
                        </View>
                        <CustomDrawerContent />
                    </>
                }
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        height: 60
    },
    activeBackground: {
        position: 'absolute',
    },
    tabBarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    component: {
        height: 60,
        width: 60,
        marginTop: -15
    },
    componentCircle: {
        flex: 1,
        borderRadius: 30,
        backgroundColor: primaryColor,
    },
    iconContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,

        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        height: 36,
        width: 36,
    },
    tab_icon: {
        marginHorizontal: 10,
        paddingHorizontal: 10

    },
    icon_badge: {
        backgroundColor: 'red',
        color: '#fff',
        position: 'absolute',
        top: -6,
        right: -10,
        borderRadius: 20,
        width: 15,
        height: 15,
        fontWeight: 'bold',
        fontSize: 10,
        textAlign: 'center'
    }
})

export default DrawerNav;
