import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

export default function ProfilePhotoScreen() {
  const { username, name, age } = useLocalSearchParams<{
    username?: string;
    name?: string;
    age?: string;
  }>();

  const [imageUri, setImageUri] = useState<string | null>(null);

  const choosePhoto = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        'Permission required',
        'Please allow photo library access to choose a profile photo.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const continueToApp = () => {
    if (!imageUri) {
      Alert.alert(
        'Photo required',
        'Please choose a profile photo first.'
      );
      return;
    }

    console.log('Signup data:', {
      username,
      name,
      age,
      photoUri: imageUri,
    });


  router.replace('/');

    // Supabase upload will be added in the next step.
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>

        <Text style={styles.logo}>THRIVE</Text>

        <Text style={styles.title}>
          Add your photo
        </Text>

        <Text style={styles.subtitle}>
          Choose a profile photo to personalize your THRIVE experience.
        </Text>

        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={styles.photo}
          />
        ) : (
          <View style={styles.photoPlaceholder}>
            <Text style={styles.photoIcon}>👤</Text>
          </View>
        )}

        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.pressed,
          ]}
          onPress={choosePhoto}
        >
          <Text style={styles.buttonText}>
            {imageUri ? 'Change Photo' : 'Choose Photo'}
          </Text>
        </Pressable>

        {imageUri && (
          <Pressable
            style={({ pressed }) => [
              styles.continueButton,
              pressed && styles.pressed,
            ]}
            onPress={continueToApp}
          >
            <Text style={styles.continueButtonText}>
              Continue
            </Text>
          </Pressable>
        )}

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
    marginBottom: 30,
  },

  photoPlaceholder: {
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: '#E4E9E4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },

  photo: {
    width: 170,
    height: 170,
    borderRadius: 85,
    marginBottom: 30,
  },

  photoIcon: {
    fontSize: 60,
  },

  button: {
    width: '100%',
    paddingVertical: 17,
    borderRadius: 14,
    backgroundColor: '#3F6B57',
    alignItems: 'center',
    marginBottom: 15,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },

  continueButton: {
    width: '100%',
    paddingVertical: 17,
    borderRadius: 14,
    backgroundColor: '#26352D',
    alignItems: 'center',
    marginBottom: 5,
  },

  continueButtonText: {
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