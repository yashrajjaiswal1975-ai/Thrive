import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';

export default function LoginCredentialsScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const cleanUsername = username.trim();

    if (!cleanUsername || !password) {
      Alert.alert(
        'Missing Information',
        'Please enter your username and password.'
      );
      return;
    }

    // Supabase login will be connected here next.
    console.log('Login:', cleanUsername);

    Alert.alert(
      'Login',
      'Supabase login will be connected in the next step.'
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>

        <Text style={styles.logo}>THRIVE</Text>

        <Text style={styles.title}>
          Log In
        </Text>

        <Text style={styles.subtitle}>
          Enter your username and password to continue.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#8A958E"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#8A958E"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />

        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>
            Log In
          </Text>
        </Pressable>

        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>
            Back
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
    fontSize: 36,
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
    marginBottom: 35,
  },

  input: {
    width: '100%',
    height: 58,
    borderWidth: 1.5,
    borderColor: '#B8C5BC',
    borderRadius: 14,
    paddingHorizontal: 18,
    fontSize: 18,
    backgroundColor: '#FFFFFF',
    color: '#26352D',
    marginBottom: 18,
  },

  button: {
    width: '100%',
    paddingVertical: 17,
    borderRadius: 14,
    backgroundColor: '#3F6B57',
    alignItems: 'center',
    marginTop: 4,
  },

  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },

  backButton: {
    marginTop: 20,
    paddingVertical: 10,
  },

  backButtonText: {
    color: '#3F6B57',
    fontSize: 16,
    fontWeight: '600',
  },
});