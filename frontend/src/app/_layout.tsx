import { Stack } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  View,
} from 'react-native';

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);

  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.65)).current;

  useEffect(() => {
 Animated.parallel([
  Animated.timing(opacity, {
    toValue: 1,
    duration: 900,
    useNativeDriver: true,
  }),
  Animated.spring(scale, {
    toValue: 1,
    friction: 7,
    tension: 45,
    useNativeDriver: true,
  }),
]).start();

const timer = setTimeout(() => {
  Animated.timing(opacity, {
    toValue: 0,
    duration: 600,
    useNativeDriver: true,
  }).start(() => {
    setShowSplash(false);
  });
}, 1900);

    return () => clearTimeout(timer);
  }, [opacity, scale]);

  if (showSplash) {
    return (
      <View style={styles.splash}>
        <Animated.Image
          source={require('../../assets/images/thrive-logo.png')}
          style={[
            styles.logo,
            {
              opacity,
              transform: [{ scale }],
            },
          ]}
          resizeMode="contain"
        />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: '#F7F4EC',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 190,
    height: 190,
  },
});