import React, { Component, useEffect, useState, useRef } from 'react';
import Header from '../../components/Header';
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    Dimensions,
    Text,
    TextInput,
    ScrollView,
    SafeAreaView, StatusBar,
    ImageBackground,
    FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { primaryColor, secondaryColorShaded, secondaryColor, primaryColorShaded, greyColorShaded, textColor } from '../../utils/Colors';
import { Avatar } from 'react-native-elements';
import { AuthContext } from '../../navigation/AuthProvider';
import { PoppinsBlack, PoppinsRegular, fontFamily } from '../../utils/fonts';
import AsyncStorage from '@react-native-community/async-storage';
import { firebaseStorageUrl } from '../../utils/storage';
import { ActivityIndicator, Card } from 'react-native-paper';
import { windowWidth } from '../../utils/WindowDimensions';
import { ImageSlider } from 'react-native-image-slider-banner';
import { InputField } from '../../components/InputField';
import DrawerNav from '../../components/BottomTab';
// import {} from 'react-native-gesture-handler';

const banners = [
    {
        id: 1,
        img: require('../../assets/promotion-banner.png')
    },
    {
        id: 2,
        img: require('../../assets/promotion-banner.png')
    },
    {
        id: 3,
        img: require('../../assets/promotion-banner.png')
    },
]

const Home = ({ navigation, route }) => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
    const ref = useRef(null)
    const { user, getUser, setName, name } = React.useContext(AuthContext)
    const WINDOWWIDTH = Dimensions.get("screen").width
    const WINDOWHEIGHT = Dimensions.get("screen").height;

    const [isLoading, setLoading] = useState(true)

    const navigateTo = (name) => navigation.navigate('Listing', { name: `${name}s`, listType: name })

    useEffect(() => {
        AsyncStorage.getItem("username").then((name) => setName(name))
    }, [])

    const Slide = ({ item }) => {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: WINDOWWIDTH * .05 }}>
                <View style={{ borderRadius: 8, overflow: 'hidden' }}>
                    <Image source={item.img} resizeMode='contain' style={{ width: WINDOWWIDTH * .9, height: WINDOWHEIGHT * .17, }} />
                </View>
                {/* <Image style={{resizeMode:"center",width:"80%",height:120}} source={require("../../assets/promotion-banner.png")}/> */}
            </View>
        )
    }
    const updateCurrentSlide = (slide) => {
        const contentOffsetX = slide.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / WINDOWWIDTH)
        setCurrentSlideIndex(currentIndex)
    }

    return (
        <DrawerNav children={
            <>
                <View style={[styles.container]}>
                    <View style={[styles.header]}>
                        <ImageBackground style={{ justifyContent: 'flex-end', alignItems: 'center', width: '100%', height: '100%' }} resizeMode='stretch' source={require('../../assets/home-header.png')}>
                            <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', width: '90%' }}>
                                <View>
                                    <Text style={[styles.deliverText]}>Deliver to</Text>
                                </View>
                                <View>
                                    <Text style={[styles.locationText]}>Nazimabad, Karachi</Text>
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={{ paddingHorizontal: 30, paddingVertical: WINDOWHEIGHT / 50 }}>
                        <View style={styles.searchInputContainer}>
                            <TextInput style={[styles.searchInput]} placeholder='What are you looking for?' placeholderTextColor={'#454545'} />
                            <Icon name='search' size={24} color={'#454545'} />
                        </View>
                        {/* <InputField
                        placeholder="Enter your password"
                        placeholderTextColor={primaryColorShaded}
                    /> */}
                    </View>
                    <ScrollView>
                        <View style={{}}>
                            <FlatList
                                ref={ref}
                                onMomentumScrollEnd={updateCurrentSlide}
                                pagingEnabled
                                data={banners}
                                contentContainerStyle={{ height: WINDOWHEIGHT * .16, }}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                renderItem={
                                    ({ item }) => <Slide item={item} />
                                }
                            />
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 20,
                                marginTop: WINDOWHEIGHT / 50
                            }}>
                                {banners.map(
                                    (_, i) => (
                                        <View style={[styles.indicator, currentSlideIndex == i && {
                                            backgroundColor: '#30A444'
                                        }]} />
                                    )
                                )}
                            </View>
                            {/* <ImageSlider 
                     data={}
                     autoPlay={false}
    onItemChanged={(item) => console.log("item", item)}
    closeIconColor="#fff"
                     /> */}
                        </View>
                        <View style={{ marginTop: WINDOWHEIGHT / 40, paddingHorizontal: 20, }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontFamily: 'Raleway', fontSize: WINDOWWIDTH / 20, fontWeight: '600', color: textColor, letterSpacing: WINDOWHEIGHT * 0.001, marginBottom: WINDOWHEIGHT / 50 }}>
                                    Categories
                                </Text>
                                <Text style={{ fontFamily: 'Raleway', fontSize: 14, fontWeight: '500', color: primaryColor, letterSpacing: WINDOWHEIGHT * 0.001, marginBottom: WINDOWHEIGHT / 50, lineHeight: 22, }}>
                                    View All
                                </Text>
                            </View>
                            <ScrollView horizontal contentContainerStyle={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: 'center', marginHorizontal: 10, }} >
                                <TouchableOpacity onPress={() => navigateTo("Venue")} style={{ borderRadius: 20, marginHorizontal: 5 }}>
                                    <Image source={
                                        require("../../assets/vegetables-icon.png")
                                        //     {
                                        //     uri: `${firebaseStorageUrl}Home%2Fvenue.png?alt=media`,
                                        // }
                                    } style={{
                                        width: WINDOWWIDTH / 3.9, height: 120, borderRadius: 20
                                    }} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ borderRadius: 20, marginHorizontal: 5 }} onPress={() => navigateTo("Caterer")}  >
                                    <Image onLoadEnd={() => setLoading(false)} source={
                                        require("../../assets/fruits-icon.png")
                                        //     {
                                        //     uri: `${firebaseStorageUrl}Home%2Fcaterers2.png?alt=media`,
                                        // }
                                    } style={{
                                        width: WINDOWWIDTH / 3.9, height: 120, borderRadius: 20, display: !isLoading ? "flex" : "none"
                                    }} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ borderRadius: 20, marginHorizontal: 5 }} onPress={() => navigateTo("Decorator")} >
                                    <Image source={
                                        require("../../assets/dairy-icon.png")
                                        //     {
                                        //     uri: `${firebaseStorageUrl}Home%2Fdecorate.png?alt=media`,
                                        // }
                                    } style={{ width: WINDOWWIDTH / 3.9, height: 120, borderRadius: 20 }} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ borderRadius: 20, marginHorizontal: 5 }} onPress={() => navigateTo("Decorator")} >
                                    <Image source={
                                        require("../../assets/sweets-icon.png")
                                        //     {
                                        //     uri: `${firebaseStorageUrl}Home%2Fdecorate.png?alt=media`,
                                        // }
                                    } style={{ width: WINDOWWIDTH / 3.9, height: 120, borderRadius: 20 }} />
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                        <View style={{ marginTop: WINDOWHEIGHT / 40, paddingHorizontal: 20, }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontFamily: 'Raleway', fontSize: WINDOWWIDTH / 20, fontWeight: '600', color: textColor, letterSpacing: WINDOWHEIGHT * 0.001, marginBottom: WINDOWHEIGHT / 50 }}>
                                    Popular Products
                                </Text>
                                <Text style={{ fontFamily: 'Raleway', fontSize: 14, fontWeight: '500', color: primaryColor, letterSpacing: WINDOWHEIGHT * 0.001, marginBottom: WINDOWHEIGHT / 50, lineHeight: 22, }}>
                                    View All
                                </Text>
                            </View>
                            <ScrollView horizontal contentContainerStyle={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }} >
                                <Card style={[styles.shadow, styles.card]}>
                                    <View style={[styles.cardImage]}>
                                        <Image source={
                                            require("../../assets/fruits/banana-icon.png")
                                            //     {
                                            //     uri: `${firebaseStorageUrl}Home%2Fshan-decorator.png?alt=media`,
                                            // }
                                        } resizeMode='contain' style={{ width: 120, height: 85, borderRadius: 20, }} />
                                    </View>
                                    <Text style={{ fontFamily: 'Raleway', fontSize: WINDOWWIDTH / 20, fontWeight: '500', color: textColor, letterSpacing: WINDOWHEIGHT * 0.001, }}>
                                        Banana
                                    </Text>
                                    <Text style={{ fontFamily: 'Raleway', fontSize: WINDOWWIDTH / 30, fontWeight: '400', color: greyColorShaded, letterSpacing: WINDOWHEIGHT * 0.001, marginBottom: 10 }}>
                                        1 Dozen
                                    </Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5, alignItems: 'flex-end' }}>
                                        <Text style={{ fontSize: WINDOWWIDTH / 24, fontWeight: 400, color: primaryColor, fontFamily: 'play' }}>RS. 150</Text>
                                        <Text style={{ fontSize: WINDOWWIDTH / 28, fontWeight: 400, color: greyColorShaded, fontFamily: 'play', textDecorationLine: 'line-through' }}>RS. 190</Text>
                                        <TouchableOpacity style={[styles.addCartButton]}>
                                            <Icon name="add" size={18} color="#fff" />
                                        </TouchableOpacity>
                                    </View>
                                </Card>
                                <Card style={[styles.shadow, styles.card]}>
                                    <View style={[styles.cardImage]}>
                                        <Image source={
                                            require("../../assets/fruits/apple-icon.png")
                                            //     {
                                            //     uri: `${firebaseStorageUrl}Home%2Fkda-venue.png?alt=media`,
                                            // }
                                        } resizeMode='contain' style={{ width: 120, height: 85, borderRadius: 20, }} />
                                    </View>
                                    <Text style={{ fontFamily: 'Raleway', fontSize: WINDOWWIDTH / 20, fontWeight: '500', color: textColor, letterSpacing: WINDOWHEIGHT * 0.001, }}>
                                        Apple
                                    </Text>
                                    <Text style={{ fontFamily: 'Raleway', fontSize: WINDOWWIDTH / 30, fontWeight: '400', color: greyColorShaded, letterSpacing: WINDOWHEIGHT * 0.001, marginBottom: 10 }}>
                                        1 Kilogram
                                    </Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5, alignItems: 'flex-end' }}>
                                        <Text style={{ fontSize: WINDOWWIDTH / 24, fontWeight: 400, color: primaryColor, fontFamily: 'play' }}>RS. 120</Text>
                                        <Text style={{ fontSize: WINDOWWIDTH / 28, fontWeight: 400, color: greyColorShaded, fontFamily: 'play', textDecorationLine: 'line-through' }}>RS. 190</Text>
                                        <TouchableOpacity style={[styles.addCartButton]}>
                                            <Icon name="add" size={18} color="#fff" />
                                        </TouchableOpacity>
                                    </View>

                                </Card>
                                <Card style={[styles.shadow, styles.card]}>
                                    <View style={[styles.cardImage]}>
                                        <Image source={
                                            require("../../assets/fruits/strawberries.png")
                                            //     {
                                            //     uri: `${firebaseStorageUrl}Home%2Fhanif-caterers.png?alt=media`,
                                            // }
                                        } resizeMode='contain' style={{ width: 120, height: 85, borderRadius: 20, }} />
                                    </View>
                                    <Text style={{ fontFamily: 'Raleway', fontSize: WINDOWWIDTH / 20, fontWeight: '500', color: textColor, letterSpacing: WINDOWHEIGHT * 0.001, }}>
                                        strawberries
                                    </Text>
                                    <Text style={{ fontFamily: 'Raleway', fontSize: WINDOWWIDTH / 30, fontWeight: '400', color: greyColorShaded, letterSpacing: WINDOWHEIGHT * 0.001, marginBottom: 10 }}>
                                        1 Kilogram
                                    </Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5, alignItems: 'flex-end' }}>
                                        <Text style={{ fontSize: WINDOWWIDTH / 24, fontWeight: 400, color: primaryColor, fontFamily: 'play' }}>RS. 200</Text>
                                        <Text style={{ fontSize: WINDOWWIDTH / 28, fontWeight: 400, color: greyColorShaded, fontFamily: 'play', textDecorationLine: 'line-through' }}>RS. 290</Text>
                                        <TouchableOpacity style={[styles.addCartButton]}>
                                            <Icon name="add" size={18} color="#fff" />
                                        </TouchableOpacity>
                                    </View>
                                </Card>
                                <Card style={[styles.shadow, styles.card]}>
                                    <View style={[styles.cardImage]}>
                                        <Image source={
                                            require("../../assets/fruits/watermelons.png")
                                            //     {
                                            //     uri: `${firebaseStorageUrl}Home%2Fhanif-caterers.png?alt=media`,
                                            // }
                                        } resizeMode='contain' style={{ width: 120, height: 85, borderRadius: 20, }} />
                                    </View>
                                    <Text style={{ fontFamily: 'Raleway', fontSize: WINDOWWIDTH / 20, fontWeight: '500', color: textColor, letterSpacing: WINDOWHEIGHT * 0.001, }}>
                                        Watermelon
                                    </Text>
                                    <Text style={{ fontFamily: 'Raleway', fontSize: WINDOWWIDTH / 30, fontWeight: '400', color: greyColorShaded, letterSpacing: WINDOWHEIGHT * 0.001, marginBottom: 10 }}>
                                        1 kilogram
                                    </Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5, alignItems: 'flex-end' }}>
                                        <Text style={{ fontSize: WINDOWWIDTH / 24, fontWeight: 400, color: primaryColor, fontFamily: 'play' }}>RS. 200</Text>
                                        <Text style={{ fontSize: WINDOWWIDTH / 28, fontWeight: 400, color: greyColorShaded, fontFamily: 'play', textDecorationLine: 'line-through' }}>RS. 290</Text>
                                        <TouchableOpacity style={[styles.addCartButton]}>
                                            <Icon name="add" size={18} color="#fff" />
                                        </TouchableOpacity>
                                    </View>
                                </Card>
                                <Card style={[styles.shadow, styles.card]}>
                                    <View style={[styles.cardImage]}>
                                        <Image source={
                                            require("../../assets/fruits/pomegranate.png")
                                            //     {
                                            //     uri: `${firebaseStorageUrl}Home%2Fhanif-caterers.png?alt=media`,
                                            // }
                                        } resizeMode='contain' style={{ width: 120, height: 85, borderRadius: 20, }} />
                                    </View>
                                    <Text style={{ fontFamily: 'Raleway', fontSize: WINDOWWIDTH / 20, fontWeight: '500', color: textColor, letterSpacing: WINDOWHEIGHT * 0.001, }}>
                                        Pomegranate
                                    </Text>
                                    <Text style={{ fontFamily: 'Raleway', fontSize: WINDOWWIDTH / 30, fontWeight: '400', color: greyColorShaded, letterSpacing: WINDOWHEIGHT * 0.001, marginBottom: 10 }}>
                                        1 Kilogram
                                    </Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5, alignItems: 'flex-end' }}>
                                        <Text style={{ fontSize: WINDOWWIDTH / 24, fontWeight: 400, color: primaryColor, fontFamily: 'play' }}>RS. 200</Text>
                                        <Text style={{ fontSize: WINDOWWIDTH / 28, fontWeight: 400, color: greyColorShaded, fontFamily: 'play', textDecorationLine: 'line-through' }}>RS. 290</Text>
                                        <TouchableOpacity style={[styles.addCartButton]}>
                                            <Icon name="add" size={18} color="#fff" />
                                        </TouchableOpacity>
                                    </View>
                                </Card>
                                <Card style={[styles.shadow, styles.card]}>
                                    <View style={[styles.cardImage]}>
                                        <Image source={
                                            require("../../assets/fruits/avacardo.png")
                                            //     {
                                            //     uri: `${firebaseStorageUrl}Home%2Fhanif-caterers.png?alt=media`,
                                            // }
                                        } resizeMode='contain' style={{ width: 120, height: 85, borderRadius: 20, }} />
                                    </View>
                                    <Text style={{ fontFamily: 'Raleway', fontSize: WINDOWWIDTH / 20, fontWeight: '500', color: textColor, letterSpacing: WINDOWHEIGHT * 0.001, }}>
                                        Avacardo
                                    </Text>
                                    <Text style={{ fontFamily: 'Raleway', fontSize: WINDOWWIDTH / 30, fontWeight: '400', color: greyColorShaded, letterSpacing: WINDOWHEIGHT * 0.001, marginBottom: 10 }}>
                                        1 kilogram
                                    </Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5, alignItems: 'flex-end' }}>
                                        <Text style={{ fontSize: WINDOWWIDTH / 24, fontWeight: 400, color: primaryColor, fontFamily: 'play' }}>RS. 200</Text>
                                        <Text style={{ fontSize: WINDOWWIDTH / 28, fontWeight: 400, color: greyColorShaded, fontFamily: 'play', textDecorationLine: 'line-through' }}>RS. 290</Text>
                                        <TouchableOpacity style={[styles.addCartButton]}>
                                            <Icon name="add" size={18} color="#fff" />
                                        </TouchableOpacity>
                                    </View>
                                </Card>
                                <Card style={[styles.shadow, styles.card]}>
                                    <View style={[styles.cardImage]}>
                                        <Image source={
                                            require("../../assets/fruits/grapes.png")
                                            //     {
                                            //     uri: `${firebaseStorageUrl}Home%2Fhanif-caterers.png?alt=media`,
                                            // }
                                        } resizeMode='contain' style={{ width: 120, height: 85, borderRadius: 20, }} />
                                    </View>
                                    <Text style={{ fontFamily: 'Raleway', fontSize: WINDOWWIDTH / 20, fontWeight: '500', color: textColor, letterSpacing: WINDOWHEIGHT * 0.001, }}>
                                        Grapes
                                    </Text>
                                    <Text style={{ fontFamily: 'Raleway', fontSize: WINDOWWIDTH / 30, fontWeight: '400', color: greyColorShaded, letterSpacing: WINDOWHEIGHT * 0.001, marginBottom: 10 }}>
                                        1 Kilogram
                                    </Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5, alignItems: 'flex-end' }}>
                                        <Text style={{ fontSize: WINDOWWIDTH / 24, fontWeight: 400, color: primaryColor, fontFamily: 'play' }}>RS. 200</Text>
                                        <Text style={{ fontSize: WINDOWWIDTH / 28, fontWeight: 400, color: greyColorShaded, fontFamily: 'play', textDecorationLine: 'line-through' }}>RS. 290</Text>
                                        <TouchableOpacity style={[styles.addCartButton]}>
                                            <Icon name="add" size={18} color="#fff" />
                                        </TouchableOpacity>
                                    </View>
                                </Card>
                                <Card style={[styles.shadow, styles.card]}>
                                    <View style={[styles.cardImage]}>
                                        <Image source={
                                            require("../../assets/fruits/oranges.png")
                                            //     {
                                            //     uri: `${firebaseStorageUrl}Home%2Fhanif-caterers.png?alt=media`,
                                            // }
                                        } resizeMode='contain' style={{ width: 120, height: 85, borderRadius: 20, }} />
                                    </View>
                                    <Text style={{ fontFamily: 'Raleway', fontSize: WINDOWWIDTH / 20, fontWeight: '500', color: textColor, letterSpacing: WINDOWHEIGHT * 0.001, }}>
                                        Oranges
                                    </Text>
                                    <Text style={{ fontFamily: 'Raleway', fontSize: WINDOWWIDTH / 30, fontWeight: '400', color: greyColorShaded, letterSpacing: WINDOWHEIGHT * 0.001, marginBottom: 10 }}>
                                        1 Dozen
                                    </Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5, alignItems: 'flex-end' }}>
                                        <Text style={{ fontSize: WINDOWWIDTH / 24, fontWeight: 400, color: primaryColor, fontFamily: 'play' }}>RS. 200</Text>
                                        <Text style={{ fontSize: WINDOWWIDTH / 28, fontWeight: 400, color: greyColorShaded, fontFamily: 'play', textDecorationLine: 'line-through' }}>RS. 290</Text>
                                        <TouchableOpacity style={[styles.addCartButton]}>
                                            <Icon name="add" size={18} color="#fff" />
                                        </TouchableOpacity>
                                    </View>
                                </Card>
                            </ScrollView>
                        </View>
                    </ScrollView>
                </View>
            </>
        }>
        </DrawerNav>
    );
};

const styles = StyleSheet.create({
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },
    loaderContainer: {
        width: '100%',
        height: '100%',
        position: "absolute",
        alignItems: 'flex-start',
        justifyContent: 'flex-start',

    },
    safeAreaView: {
        // flex: 1,
    },
    container: {
        width: '100%',
        height: '100%',
        zIndex: 1,
        flex: 1,
        // paddingTop: StatusBar.currentHeight,
        // paddingHorizontal: 20,
        backgroundColor: "#FFFFFF",
    },
    header: {
        width: '100%',
        height: 100,
    },
    deliverText: {
        color: '#3A3A3A',
        fontFamily: 'Raleway',
        fontSize: 12,
        fontWeight: 400,
        // lineHeight: 26.154,
    },
    locationText: {
        color: '#000',
        fontWeight: 500,
        // lineHeight: 26.154,
        letterSpacing: 1.189,
        fontFamily: 'Raleway',
        fontSize: 14,
    },
    searchInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F6F6F7',
        borderRadius: 8,
        paddingHorizontal: 10,
    },
    indicator: {
        width: 8,
        height: 8,
        marginHorizontal: 4,
        borderRadius: 50,
        backgroundColor: '#E3E3E3'
    },
    shadow: {
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 1,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 0.8,
        elevation: 5,

    },
    card: {
        marginHorizontal: 5,
        paddingHorizontal: 10,
        // paddingVertical: 5,
        // marginVertical: 5,
        // borderColor: '#000',
        // borderWidth: 1,
        marginBottom: 15,
        borderRadius: 8,
    },
    cardImage: {
        paddingHorizontal: 5,
        borderBottomColor: '#C9C9C9',
        borderBottomWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    discountPrice: {
        fontWeight: 400,
        color: primaryColor
    },
    addCartButton: {
        width: 22,
        height: 22,
        backgroundColor: '#2DA041',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    profilename: {
        fontFamily: 'Raleway',
        color: "#000",
        fontSize: 19,
        fontWeight: '800',
        letterSpacing: 1
    }
});
export default Home;
