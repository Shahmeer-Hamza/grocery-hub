import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Logo } from '../utils/Logos';
import { secondaryColor, walkthroughBackground } from '../utils/Colors';
import { AuthContext } from './AuthProvider';


const RedSplash = ({ navigation }) => {
    const { walkthrough } = useContext(AuthContext)

    useEffect(() => {
        setTimeout(() => {
            if (walkthrough == 1)
                navigation.navigate("Login")
            else
                navigation.navigate("Walkthrough")
        }, 1000);
    }, [walkthrough])

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor={secondaryColor} />
            <View style={{
                display: "flex",
                backgroundColor: "#fff",
                flex: 1,
                alignItems: 'center',
                alignContent: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                height: '100%',
                width: '100%',
                position: 'absolute',
                zIndex: 11111,
            }}>
                <View>
                    <Logo width={100} height={100} />
                </View>
            </View>
        </>
    );
};

export default RedSplash