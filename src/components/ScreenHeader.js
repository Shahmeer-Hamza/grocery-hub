import React from 'react'
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { background, primaryColor } from '../utils/Colors'
import { Divider, Icon } from 'react-native-elements';
import { RalewayRegular } from '../utils/fonts';

const ScreenHeader = ({ navigation, name, type }) => {
    console.log('Screen Header Title', name)
    return (
        <View style={{ backgroundColor: background }}>
            <View>
                <ImageBackground
                    source={require('../assets/home-header1.png')}
                    resizeMode='stretch'
                    style={{
                        width: '100%',
                        height: 100,
                        justifyContent: "flex-end",
                        alignItems: "flex-start",
                    }}>
                    <TouchableOpacity onPress={() => {
                        try {
                            navigation.goBack()
                        } catch (error) {
                        }
                    }}>
                        <Icon
                            name="keyboard-backspace"
                            size={28}
                            color="#fff"
                            style={{
                                marginBottom: 20,
                                marginLeft: 20,
                            }} />
                    </TouchableOpacity>
                </ImageBackground>
            </View>
            <View style={{ flexDirection: 'row', marginVertical: 10, justifyContent: 'center' }}>
                {type && <Text style={[styles.pageHeader, { color: primaryColor }]}>ALL </Text>}
                <Text style={styles.pageHeader}>{name}</Text>
            </View>
        </View>
    )
}

export default ScreenHeader

const styles = StyleSheet.create({
    pageHeader: {
        color: '#222235',
        fontFamily: RalewayRegular,
        fontSize: 18,
        fontWeight: "600",
        lineHeight: 32,
        letterSpacing: 1.455,
        textTransform: 'uppercase',
    },
})