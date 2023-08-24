import React from 'react'
import { Text, View, Dimensions, ImageBackground, StyleSheet, ScrollView, Image, Pressable } from 'react-native'
import DrawerNav from '../../components/BottomTab'
import { RalewayRegular } from '../../utils/fonts'
import { background, primaryColor } from '../../utils/Colors'

const { width, height } = Dimensions.get('screen')
const Categories = ({ navigation }) => {
  const navigateTo = (name) => navigation.navigate('Listing', { name: `${name}s`, listType: name })
  return (
    // <DrawerNav children={
    <View style={styles.container}>
      <View style={styles.header}>
        <ImageBackground source={require('../../assets/home-header.png')} resizeMode='stretch' style={{ width: width, height: '100%' }}>
        </ImageBackground>
      </View>
      <View>
        <View style={styles.headingContainer}>
          <Text style={[styles.pageHeading, { color: primaryColor }]}>ALL</Text>
          <Text style={styles.pageHeading}> CATEGORIES</Text>
        </View>
        <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 15, width: '90%', justifyContent: 'center' }}>
            <View style={{ width: 100, height: 120, }}>
              <Pressable onPress={() => navigateTo("Vegetables")}>
                <Image source={require('../../assets/vegetables-icon.png')} resizeMode='contain' style={{ width: '100%', height: '100%' }} />
              </Pressable>
            </View>
            <View style={{ width: 100, height: 120, }}>
              <Pressable onPress={() => navigateTo("Fruits")}>
                <Image source={require('../../assets/fruits-icon.png')} resizeMode='contain' style={{ width: '100%', height: '100%' }} />
              </Pressable>
            </View>
            <View style={{ width: 100, height: 120, }}>
              <Pressable onPress={() => navigateTo("Dairy")}>
                <Image source={require('../../assets/dairy-icon.png')} resizeMode='contain' style={{ width: '100%', height: '100%' }} />
              </Pressable>
            </View>
            <View style={{ width: 100, height: 120, }}>
              <Pressable onPress={() => navigateTo("Sweets")}>
                <Image source={require('../../assets/sweets-icon.png')} resizeMode='contain' style={{ width: '100%', height: '100%' }} />
              </Pressable>
            </View>
            <View style={{ width: 100, height: 120, }}>
              <Pressable onPress={() => navigateTo("Cleaning")}>
                <Image source={require('../../assets/cleaning-icon.png')} resizeMode='contain' style={{ width: '100%', height: '100%' }} />
              </Pressable>
            </View>
            <View style={{ width: 100, height: 120, }}>
              <Pressable onPress={() => navigateTo("Kitchen")}>
                <Image source={require('../../assets/kitchen-icon.png')} resizeMode='contain' style={{ width: '100%', height: '100%' }} />
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
    // }>
    // </DrawerNav>
  )
}

const styles = StyleSheet.create({
  container: {
    color: background,
    width: width,
    height: height,
  },
  header: {
    height: 100,
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  pageHeading: {
    color: '#222235',
    fontFamily: RalewayRegular,
    fontSize: 18,
    fontWeight: 600,
    lineHeight: 32,
    letterSpacing: 1.455,
  }
})
export default Categories;