import { StyleSheet, Text, View, Pressable } from 'react-native';
import { router } from 'expo-router';

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>THRIVE</Text>

        <Text style={styles.title}>
          Welcome to THRIVE
        </Text>

        <Text style={styles.subtitle}>
          A gentle cognitive gaming and memory assistance platform
          designed to support everyday wellbeing.
        </Text>

        <Pressable
          style={styles.button}
          onPress={() => router.push('/login')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
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
    fontSize: 42,
    fontWeight: '800',
    letterSpacing: 4,
    color: '#3F6B57',
    marginBottom: 35,
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#26352D',
    textAlign: 'center',
    marginBottom: 18,
  },

  subtitle: {
    fontSize: 18,
    lineHeight: 28,
    color: '#65736B',
    textAlign: 'center',
    marginBottom: 45,
  },

  button: {
    width: '100%',
    paddingVertical: 17,
    borderRadius: 14,
    backgroundColor: '#3F6B57',
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});