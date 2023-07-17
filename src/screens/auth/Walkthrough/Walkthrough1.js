import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const Walkthrough1 = () => {
    return (
        <View style={[styles.container]}>
             <View style={{height:"70%",}}>
                <Image style={{resizeMode:'contain', width:windowWidth, height:windowHeight * 2/3,}} source={require("../../../assets/walkthrough.png")}/>
             </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: windowHeight,
        width: windowWidth,
    }
})
