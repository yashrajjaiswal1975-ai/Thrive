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

export default function CreateUsernameScreen() {
  const [username, setUsername] = useState('');

  const continueToName = () => {
    const cleanUsername = username.trim().toLowerCase();

    if (!cleanUsername) {
      Alert.alert(
        'Username Required',
        'Please enter a username.'
      );
      return;
    }

    if (cleanUsername.length < 3) {
      Alert.alert(
        'Username Too Short',
        'Username must contain at least 3 characters.'
      );
      return;
    }

    router.push({
      pathname: '/profile-name',
      params: {
        username: cleanUsername,
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>

        <Text style={styles.logo}>
          THRIVE
        </Text>

        <Text style={styles.title}>
          Create your username
        </Text>

        <Text style={styles.subtitle}>
          Choose a username you'll use to log in to THRIVE.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter username"
          placeholderTextColor="#8A958E"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={30}
          onSubmitEditing={continueToName}
          returnKeyType="next"
        />

        <Pressable
          style={({ pressed }) => [
            styles.button,
            !username.trim() && styles.buttonDisabled,
            pressed && styles.buttonPressed,
          ]}
          onPress={continueToName}
          disabled={!username.trim()}
        >
          <Text style={styles.buttonText}>
            Continue
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
    textAlign: 'center',
    marginBottom: 14,
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
  },

  buttonDisabled: {
    opacity: 0.45,
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