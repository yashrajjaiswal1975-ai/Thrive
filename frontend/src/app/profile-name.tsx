import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';

export default function ProfileNameScreen() {
  const [name, setName] = useState('');

  const continueToAge = () => {
    if (name.trim().length === 0) return;

    router.push({
      pathname: '/age',
      params: { name: name.trim() },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>THRIVE</Text>

        <Text style={styles.title}>What is your name?</Text>

        <Text style={styles.subtitle}>
          We'll use your name to personalize your THRIVE experience.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor="#8A958E"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />

        <Pressable
          style={[
            styles.button,
            !name.trim() && styles.buttonDisabled,
          ]}
          onPress={continueToAge}
          disabled={!name.trim()}
        >
          <Text style={styles.buttonText}>Continue</Text>
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
  },

  buttonDisabled: {
    opacity: 0.45,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});