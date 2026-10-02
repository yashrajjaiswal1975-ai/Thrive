import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

export default function AgeScreen() {
  const { username, name } = useLocalSearchParams<{
    username?: string;
    name?: string;
  }>();

  const [age, setAge] = useState('');

  const continueToPhoto = () => {
    const trimmedAge = age.trim();
    const numericAge = Number(trimmedAge);

    if (!trimmedAge) {
      return;
    }

    if (
      !Number.isInteger(numericAge) ||
      numericAge < 1 ||
      numericAge > 120
    ) {
      Alert.alert(
        'Invalid Age',
        'Please enter a valid age between 1 and 120.'
      );
      return;
    }

    if (!username || !name) {
      Alert.alert(
        'Error',
        'Profile information is missing. Please start again.'
      );
      return;
    }

    router.push({
      pathname: '/profile-photo',
      params: {
        username,
        name,
        age: String(numericAge),
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
          How old are you{name ? `, ${name}` : ''}?
        </Text>

        <Text style={styles.subtitle}>
          This helps us personalize your THRIVE experience.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your age"
          placeholderTextColor="#8A958E"
          value={age}
          onChangeText={setAge}
          keyboardType="number-pad"
          maxLength={3}
          onSubmitEditing={continueToPhoto}
          returnKeyType="next"
        />

        <Pressable
          style={({ pressed }) => [
            styles.button,
            !age.trim() && styles.buttonDisabled,
            pressed && styles.buttonPressed,
          ]}
          onPress={continueToPhoto}
          disabled={!age.trim()}
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