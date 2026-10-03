import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function CreateUsernameScreen() {
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [checking, setChecking] = useState(false);

  const continueToName = async () => {
    const cleanUsername = username.trim().toLowerCase();

    setErrorMessage('');

    if (!cleanUsername) {
      setErrorMessage('Please enter a username.');
      return;
    }

    if (cleanUsername.length < 3) {
      setErrorMessage(
        'Username must contain at least 3 characters.'
      );
      return;
    }

    setChecking(true);

    try {
      const { data, error } = await supabase.rpc(
        'is_username_available',
        {
          check_username: cleanUsername,
        }
      );

      console.log('Username check:', {
        username: cleanUsername,
        available: data,
        error,
      });

      if (error) {
        console.error(
          'Username check error:',
          error
        );

        setErrorMessage(
          'Unable to check username. Please try again.'
        );

        return;
      }

      if (!data) {
        setErrorMessage(
          'Username already exists. Please try a different user ID.'
        );

        return;
      }

      router.push({
        pathname: '/profile-name',
        params: {
          username: cleanUsername,
        },
      });
    } catch (error) {
      console.error(
        'Unexpected username check error:',
        error
      );

      setErrorMessage(
        'Something went wrong. Please try again.'
      );
    } finally {
      setChecking(false);
    }
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
          style={[
            styles.input,
            errorMessage && styles.inputError,
          ]}
          placeholder="Enter username"
          placeholderTextColor="#8A958E"
          value={username}
          onChangeText={(text) => {
            setUsername(text);
            setErrorMessage('');
          }}
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={30}
          editable={!checking}
        />

        {errorMessage ? (
          <Text style={styles.errorText}>
            {errorMessage}
          </Text>
        ) : null}

        <Pressable
          style={({ pressed }) => [
            styles.button,
            checking && styles.buttonDisabled,
            pressed && styles.pressed,
          ]}
          onPress={continueToName}
          disabled={checking}
        >
          {checking ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>
              Continue
            </Text>
          )}
        </Pressable>

        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
          disabled={checking}
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
    marginBottom: 30,
  },

  input: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D5DDD6',
    borderRadius: 14,
    paddingVertical: 17,
    paddingHorizontal: 18,
    fontSize: 17,
    color: '#26352D',
  },

  inputError: {
    borderColor: '#C94C4C',
  },

  errorText: {
    width: '100%',
    marginTop: 10,
    marginBottom: 5,
    color: '#C94C4C',
    fontSize: 14,
    lineHeight: 20,
  },

  button: {
    width: '100%',
    paddingVertical: 17,
    borderRadius: 14,
    backgroundColor: '#3F6B57',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 57,
    marginTop: 15,
  },

  buttonDisabled: {
    opacity: 0.6,
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

  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
});