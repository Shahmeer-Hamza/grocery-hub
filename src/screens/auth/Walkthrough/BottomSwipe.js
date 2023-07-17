import { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native"
import * as Animatable from 'react-native-animatable';
import { walkthroughBackground } from "../../../utils/Colors";
const BottomSwipe = ({ children }) => {
    const contentRef = useRef(null);

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.slideInDown(1000); // Duration of the animation in milliseconds
        }
    }, []);

    return (
        <View style={styles.container}>
            <Animatable.View
                ref={contentRef}
                style={styles.content}
                animation="slideInDown"
                duration={8000}
                useNativeDriver
            >
                {children}
            </Animatable.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: walkthroughBackground
    },
    content: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: walkthroughBackground
        // Additional styling for your content view
    },
});

export default BottomSwipe;
