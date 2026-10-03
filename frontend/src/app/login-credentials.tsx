import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function LoginCredentialsScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async () => {
    if (loading) {
      return;
    }

    const cleanUsername =
      username.trim().toLowerCase();

    // -----------------------------
    // VALIDATION
    // -----------------------------

    if (!cleanUsername) {
      Alert.alert(
        'Username Required',
        'Please enter your username.'
      );
      return;
    }

    if (!password) {
      Alert.alert(
        'Password Required',
        'Please enter your password.'
      );
      return;
    }

    try {
      setLoading(true);

      // Same internal email format used during signup
      const authEmail =
        `${cleanUsername}@example.com`;

      // -----------------------------
      // SUPABASE LOGIN
      // -----------------------------

      const {
        data,
        error,
      } =
        await supabase.auth.signInWithPassword({
          email: authEmail,
          password,
        });

      // -----------------------------
      // LOGIN ERROR
      // -----------------------------

      if (error) {
        console.error(
          'Login error:',
          error
        );

        Alert.alert(
          'Login Failed',
          'Incorrect username or password.'
        );

        return;
      }

      // -----------------------------
      // CHECK USER
      // -----------------------------

      if (!data.user) {
        Alert.alert(
          'Login Failed',
          'Unable to log in. Please try again.'
        );

        return;
      }

      // -----------------------------
      // SUCCESS
      // -----------------------------

      console.log(
        'Login successful'
      );

      // User is now authenticated.
      // Go directly to THRIVE home.
      router.replace('/');

    } catch (error) {
      console.error(
        'Unexpected login error:',
        error
      );

      Alert.alert(
        'Something Went Wrong',
        'Unable to log in right now. Please try again.'
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>

        <Text style={styles.logo}>
          THRIVE
        </Text>

        <Text style={styles.title}>
          Log In
        </Text>

        <Text style={styles.subtitle}>
          Enter your username and password to continue.
        </Text>

        {/* USERNAME */}

        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#8A958E"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={30}
          editable={!loading}
        />

        {/* PASSWORD */}

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="#8A958E"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={64}
            editable={!loading}
          />

          <Pressable
            style={styles.showButton}
            onPress={() =>
              setShowPassword(!showPassword)
            }
            disabled={loading}
          >
            <Text style={styles.showText}>
              {showPassword
                ? 'Hide'
                : 'Show'}
            </Text>
          </Pressable>
        </View>

        {/* LOGIN BUTTON */}

        <Pressable
          style={({ pressed }) => [
            styles.button,

            (!username ||
              !password ||
              loading) &&
              styles.buttonDisabled,

            pressed &&
              styles.buttonPressed,
          ]}
          onPress={handleLogin}
          disabled={
            !username ||
            !password ||
            loading
          }
        >
          {loading ? (
            <ActivityIndicator
              color="#FFFFFF"
            />
          ) : (
            <Text style={styles.buttonText}>
              Log In
            </Text>
          )}
        </Pressable>

        {/* BACK */}

        <Pressable
          style={styles.backButton}
          onPress={() => router.replace('/login')}
          disabled={loading}
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

  passwordContainer: {
    width: '100%',
    position: 'relative',
    marginBottom: 25,
  },

  passwordInput: {
    width: '100%',
    height: 58,
    borderWidth: 1.5,
    borderColor: '#B8C5BC',
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingRight: 75,
    fontSize: 18,
    backgroundColor: '#FFFFFF',
    color: '#26352D',
  },

  showButton: {
    position: 'absolute',
    right: 15,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },

  showText: {
    color: '#3F6B57',
    fontSize: 15,
    fontWeight: '700',
  },

  button: {
    width: '100%',
    paddingVertical: 17,
    borderRadius: 14,
    backgroundColor: '#3F6B57',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 57,
  },

  buttonDisabled: {
    opacity: 0.55,
  },

  buttonPressed: {
    opacity: 0.8,
    transform: [
      {
        scale: 0.98,
      },
    ],
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