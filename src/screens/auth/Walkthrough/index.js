import React, { useState, useEffect, useContext, useRef } from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

import {
  greyColorShaded,
  primaryColor,
  walkthroughBackground,
} from '../../../utils/Colors';

import { LogoInverse } from '../../../utils/Logos';
import { PrimaryButton } from '../../../components/Buttons';
import { InputField } from '../../../components/InputField';
import { AuthContext } from '../../../navigation/AuthProvider';

import Swiper from './Swiper';
import { Walkthrough1 } from './Walkthrough1';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RalewayRegular } from '../../../utils/fonts';
// import { AsyncStorage } from 'react-native'

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    image: require('../../../assets/walkthrough.png'),
    title: "Best place for groceries",
    subtitle: "Tired of going out and search for fresh products for your family?"
  },
  {
    id: '2',
    image: require('../../../assets/walkthrough2.png'),
    title: "Pick, Tick & Buy!",
    subtitle: "Now buy all of your home groceries at once with grocery HUB online!"
  },
  {
    id: '3',
    image: require('../../../assets/walkthrough3.png'),
    title: "Ready to order now?",
    subtitle: "Then don’t wait and get started with our special offers on exclusive items!"
  },
]

const Walkthrough = ({ navigation }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const ref = useRef(null)
  const { user,
    setWalkthrough,
    getWalkthrough
  } = useContext(AuthContext);
  // const navigation = useNavigation()

  const walkthroughCompleted = () => {
    AsyncStorage.setItem("_walkthrough", "1").then((res) => setWalkthrough(1)).then(() => getWalkthrough()).then(() => navigation.navigate("Login"))
  }

  const Slide = ({ item }) => {
    return <View style={{ alignItems: 'center', width, }}>
      <Image
        source={item.image}
        style={{ height: '72%', width, resizeMode: 'stretch' }}
      />
      <View style={{}}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: 20,
        }}>
          {slides.map(
            (_, i) => (
              <View key={i} style={[styles.indicator, currentSlideIndex == i && {
                backgroundColor: '#30a444'
              }]} />
            )
          )}

        </View>
      </View>
      <View style={{ alignItems: 'center', height: '25%', justifyContent: 'center' }}>
        <Text style={[styles.title]}>{item.title}</Text>
        <View style={{ width: '75%' }}>
          <Text style={{ color: greyColorShaded, fontFamily: RalewayRegular, fontWeight: 500, textAlign: 'center', lineHeight: 22, }}>{item.subtitle}</Text>
        </View>
      </View>

      {/* <View>
        <View style={{width:"100%",}}>
            <View style={{backgroundColor:"red",}}>
                 <Text style={{textAlign:"center",lineHeight:40}}>{item.title}</Text>
                 <Text style={{marginTop:12,textAlign:"center",}}>{item.subtitle}</Text>
            </View>
        </View>
      </View> */}
    </View>
  }
  const Footer = () => {
    return (
      <View style={{
        height: height * 0.10,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
        {currentSlideIndex == slides.length - 1 ?
          <View style={{ width: '85%', }}>
            <TouchableOpacity onPress={walkthroughCompleted} style={{ backgroundColor: '#30a444', width: '100%', height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 8 }}>
              <Text style={{ color: '#fff', fontFamily: RalewayRegular, fontWeight: 500, fontSize: 14, }}>
                Get Started
              </Text>
            </TouchableOpacity>
          </View> :
          <View style={{
            width: '85%',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <TouchableOpacity onPress={walkthroughCompleted} style={[styles.button]}>
              <Text style={{ color: greyColorShaded, }}>SKIP</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#30a444' }]} onPress={goToNextSlide}>
              <Text style={{ color: '#ffffff' }}>NEXT</Text>
            </TouchableOpacity>
          </View>}
      </View>
    )
  }
  const updateCurrentSlide = (slide) => {
    const contentOffsetX = slide.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width)
    setCurrentSlideIndex(currentIndex)
  }
  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current?.scrollToOffset({ offset });
      setCurrentSlideIndex(nextSlideIndex);
    }
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content" />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlide}
        pagingEnabled
        data={slides}
        contentContainerStyle={{ height: height * .85, }}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={
          ({ item }) => <Slide key={item?.id} item={item} />
        }
      />
      <Footer />
      {/* <View style={styles.container}>
        <Walkthrough1 />
      </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: walkthroughBackground,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  indicator: {
    width: 8,
    height: 8,
    marginHorizontal: 4,
    borderRadius: 50,
    backgroundColor: '#e3e3e3'

  },
  title: {
    color: '#000000',
    fontSize: 26,
    fontFamily: RalewayRegular,
    fontWeight: 600,
    marginVertical: 10,
    letterSpacing: 1,

  },
  button: {
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  logo: {
    fontWeight: 'bold',
    color: primaryColor,
    marginBottom: 20,
    height: 130,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
    marginBottom: 40,
    textAlign: 'center',
  },
  forgot: {
    color: 'white',
    fontSize: 11,
  },
  loginText: {
    color: 'white',
  },
  successMessage: {
    backgroundColor: '#D4EDDA',
    color: '#6E9D79',
    borderRadius: 3,
    borderWidth: 3,
    borderColor: '#C3E6CB',
  },
  errorMessage: {
    width: '70%',
    marginVertical: 10,
    backgroundColor: '#F8D7DA',
    color: '#721C24',
    borderRadius: 3,
    borderWidth: 3,
    borderColor: '#F5C6CB',
    padding: 6,
    paddingTop: 10,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
});

export default Walkthrough;
