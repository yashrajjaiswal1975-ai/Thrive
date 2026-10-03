import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function PasswordScreen() {
  const { username, name, age, photoUri } =
    useLocalSearchParams<{
      username?: string;
      name?: string;
      age?: string;
      photoUri?: string;
    }>();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] =
    useState('');

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const handleCreateAccount = async () => {
    // Prevent accidental double click
    if (loading) {
      return;
    }

    const cleanUsername =
      username?.trim().toLowerCase() || '';

    const cleanName =
      name?.trim() || '';

    const cleanAge =
      Number(age);

    // ---------------------------------------
    // VALIDATION
    // ---------------------------------------

    if (!cleanUsername) {
      Alert.alert(
        'Username Missing',
        'Please go back and enter your username.'
      );
      return;
    }

    if (!cleanName) {
      Alert.alert(
        'Name Missing',
        'Please go back and enter your name.'
      );
      return;
    }

    if (
      !cleanAge ||
      cleanAge < 1 ||
      cleanAge > 120
    ) {
      Alert.alert(
        'Invalid Age',
        'Please enter a valid age.'
      );
      return;
    }

    if (!photoUri) {
      Alert.alert(
        'Photo Missing',
        'Please go back and choose a profile photo.'
      );
      return;
    }

    if (!password) {
      Alert.alert(
        'Password Required',
        'Please create a password.'
      );
      return;
    }

    if (password.length < 8) {
      Alert.alert(
        'Password Too Short',
        'Password must contain at least 8 characters.'
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        'Passwords Do Not Match',
        'Please make sure both passwords are the same.'
      );
      return;
    }

    try {
      setLoading(true);

      // ---------------------------------------
      // CREATE INTERNAL EMAIL
      // ---------------------------------------

      const authEmail =
        `${cleanUsername}@example.com`;

      // ---------------------------------------
      // CREATE SUPABASE AUTH ACCOUNT
      // ---------------------------------------

      const {
        data: authData,
        error: authError,
      } = await supabase.auth.signUp({
        email: authEmail,
        password,
        options: {
          data: {
            username: cleanUsername,
            name: cleanName,
            age: cleanAge,
          },
        },
      });

      // ---------------------------------------
      // AUTH ERROR
      // ---------------------------------------

      if (authError) {
        console.error(
          'Supabase signup error:',
          authError
        );

        Alert.alert(
          'Account Creation Failed',
          authError.message
        );

        return;
      }

      // ---------------------------------------
      // CHECK USER
      // ---------------------------------------

      if (!authData.user) {
        Alert.alert(
          'Account Creation Failed',
          'Unable to create your account. Please try again.'
        );

        return;
      }

      const userId =
        authData.user.id;

      // ---------------------------------------
      // SAVE PROFILE
      // ---------------------------------------

      const {
        error: profileError,
      } = await supabase
        .from('profiles')
        .insert({
          user_id: userId,
          username: cleanUsername,
          name: cleanName,
          age: cleanAge,
          photo_url: null,
        });

      // ---------------------------------------
      // PROFILE ERROR
      // ---------------------------------------

      if (profileError) {
        console.error(
          'Profile creation error:',
          profileError
        );

        // Remove the session if profile creation
        // failed so the account isn't partially active.
        await supabase.auth.signOut();

        Alert.alert(
          'Profile Creation Failed',
          profileError.message
        );

        return;
      }

      // ---------------------------------------
      // SUCCESS
      // ---------------------------------------

      /*
       * Supabase signUp() has already created the
       * authenticated session because email
       * confirmation is disabled.
       *
       * Therefore we do NOT need to log in again.
       *
       * Go directly to the main THRIVE screen.
       */

      router.replace('/');

    } catch (error) {
      console.error(
        'Unexpected signup error:',
        error
      );

      Alert.alert(
        'Something Went Wrong',
        'Unable to create your account right now. Please try again.'
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
          Create your password
        </Text>

        <Text style={styles.subtitle}>
          Create a secure password you'll use to log in
          to THRIVE.
        </Text>

        {/* PASSWORD */}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Create password"
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

        {/* CONFIRM PASSWORD */}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            placeholderTextColor="#8A958E"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={
              !showConfirmPassword
            }
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={64}
            editable={!loading}
          />

          <Pressable
            style={styles.showButton}
            onPress={() =>
              setShowConfirmPassword(
                !showConfirmPassword
              )
            }
            disabled={loading}
          >
            <Text style={styles.showText}>
              {showConfirmPassword
                ? 'Hide'
                : 'Show'}
            </Text>
          </Pressable>
        </View>

        <Text style={styles.passwordHint}>
          Use at least 8 characters.
        </Text>

        {/* CREATE ACCOUNT */}

        <Pressable
          style={({ pressed }) => [
            styles.button,

            (!password ||
              !confirmPassword ||
              loading) &&
              styles.buttonDisabled,

            pressed &&
              styles.buttonPressed,
          ]}
          onPress={handleCreateAccount}
          disabled={
            !password ||
            !confirmPassword ||
            loading
          }
        >
          {loading ? (
            <ActivityIndicator
              color="#FFFFFF"
            />
          ) : (
            <Text style={styles.buttonText}>
              Create Account
            </Text>
          )}
        </Pressable>

        {/* BACK */}

        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
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

  inputContainer: {
    width: '100%',
    position: 'relative',
    marginBottom: 15,
  },

  input: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D5DDD6',
    borderRadius: 14,
    paddingVertical: 17,
    paddingHorizontal: 18,
    paddingRight: 75,
    fontSize: 17,
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

  passwordHint: {
    width: '100%',
    color: '#65736B',
    fontSize: 14,
    marginBottom: 25,
  },

  button: {
    width: '100%',
    paddingVertical: 17,
    borderRadius: 14,
    backgroundColor: '#26352D',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 57,
    marginBottom: 5,
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