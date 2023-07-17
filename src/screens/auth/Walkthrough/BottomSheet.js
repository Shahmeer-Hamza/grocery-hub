import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useAnimatedGestureHandler,
  interpolate, withSpring
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';
import { primaryColor } from '../../../utils/Colors';


const BottomSheet = ({ children }) => {
  const SCREEN_HEIGHT = Dimensions.get("window").height;
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const translationY = useSharedValue(0);
  const allowMoveDown = useSharedValue(false);
  const [viewHeight, setviewHeight] = useState(0)

  const animatedViewRef = useRef(null);
  const handleLayout = () => {
    if (animatedViewRef.current) {
      animatedViewRef.current.measure((x, y, width, height) => {
        setviewHeight( height);
      });
    }
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startY = translationY.value;
      allowMoveDown.value = true; // Allow moving down when gesture starts
    },
    onActive: (event, ctx) => {
      if (allowMoveDown.value) {
        translationY.value = ctx.startY + event.translationY;
      } else {
        translationY.value = ctx.startY + event.translationY / 4; // Limit downward movement
      }
    },
    onEnd: (event) => {
      if (event.translationY > 100) {
        // If swipe distance is greater than 100, animate to fully slide up
        // translationY.value = withSpring(400);
        allowMoveDown.value = true; // Prevent moving down until explicitly swiped down
      } else {
        // Otherwise, animate back to initial position
        // translationY.value = withSpring(0);
        allowMoveDown.value = true; // Allow moving down after releasing the gesture
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      translationY.value,
      [0, -500],
      [0, -500],
      Animated.Extrapolate.CLAMP
    );
    return { transform: [{ translateY }] };
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View onLayout={handleLayout} ref={animatedViewRef} children={children} style={[styles.bottomSheet, animatedStyle, { top: SCREEN_HEIGHT > 500 ? SCREEN_HEIGHT - 550 : 120, height: SCREEN_HEIGHT }]}>

      </Animated.View>
    </PanGestureHandler>
  );
};
export default BottomSheet
const styles = StyleSheet.create({
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,

    backgroundColor: '#FFF',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },

    shadowOpacity: 0.1,
    shadowRadius: 4.65,
    elevation: 6,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 20,
  },
  forecolor: {
    color: "#666666",
    fontFamily: "PublicSans",
    fontSize: 18
  },
  heading: {
    fontWeight: "800",
    color: primaryColor,
    fontFamily: "PublicSans",
    fontSize: 28
  }
});
