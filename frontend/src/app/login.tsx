import {
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';
import { router } from 'expo-router';
import { setLoggedIn } from '@/utils/storage';

export default function LoginScreen() {
  const handleLogin = async () => {
    await setLoggedIn();
    router.replace('/profile-name');
  };

  const handleSignUp = async () => {
    await setLoggedIn();
    router.replace('/profile-name');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>

        <Text style={styles.logo}>THRIVE</Text>

        <Text style={styles.title}>
          Welcome to THRIVE
        </Text>

        <Text style={styles.subtitle}>
          Your personal companion for cognitive wellness,
          daily reminders and mental exercises.
        </Text>

        {/* Login */}
        <Pressable
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && styles.pressed,
          ]}
          onPress={handleLogin}
        >
          <Text style={styles.primaryButtonText}>
            Log In
          </Text>
        </Pressable>

        {/* Sign Up */}
        <Pressable
          style={({ pressed }) => [
            styles.secondaryButton,
            pressed && styles.pressed,
          ]}
          onPress={handleSignUp}
        >
          <Text style={styles.secondaryButtonText}>
            Create New Account
          </Text>
        </Pressable>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F4EC',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  content: {
    width: '100%',
    maxWidth: 500,
    alignItems: 'center',
  },

  logo: {
    fontSize: 38,
    fontWeight: '800',
    letterSpacing: 4,
    color: '#3F6B57',
    marginBottom: 40,
  },

  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#26352D',
    marginBottom: 14,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 17,
    lineHeight: 26,
    color: '#65736B',
    textAlign: 'center',
    marginBottom: 40,
  },

  primaryButton: {
    width: '100%',
    paddingVertical: 17,
    borderRadius: 14,
    backgroundColor: '#3F6B57',
    alignItems: 'center',
    marginBottom: 15,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },

  secondaryButton: {
    width: '100%',
    paddingVertical: 17,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#3F6B57',
    alignItems: 'center',
  },

  secondaryButtonText: {
    color: '#3F6B57',
    fontSize: 18,
    fontWeight: '700',
  },

  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
});