import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome to</Text>
            <Text style={styles.logo}>THRIVE</Text>
          </View>

          <Pressable
            style={styles.settingsButton}
            onPress={() => router.push('/settings')}
          >
            <Text style={styles.settingsIcon}>⚙</Text>
          </Pressable>
        </View>

        {/* Welcome card */}
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>
            Ready for today?
          </Text>

          <Text style={styles.welcomeText}>
            Keep your mind active with simple games and daily activities.
          </Text>
        </View>

        {/* Main actions */}
        <Text style={styles.sectionTitle}>
          What would you like to do?
        </Text>

        <Pressable
          style={({ pressed }) => [
            styles.mainCard,
            pressed && styles.cardPressed,
          ]}
          onPress={() => router.push('/games')}
        >
          <View style={styles.iconCircle}>
            <Text style={styles.icon}>🎮</Text>
          </View>

          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>
              Play Games
            </Text>

            <Text style={styles.cardSubtitle}>
              Exercise your memory and attention
            </Text>
          </View>

          <Text style={styles.arrow}>›</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.mainCard,
            pressed && styles.cardPressed,
          ]}
          onPress={() => router.push('/reminders')}
        >
          <View style={styles.iconCircle}>
            <Text style={styles.icon}>🔔</Text>
          </View>

          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>
              Reminders
            </Text>

            <Text style={styles.cardSubtitle}>
              Keep track of important activities
            </Text>
          </View>

          <Text style={styles.arrow}>›</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.mainCard,
            pressed && styles.cardPressed,
          ]}
          onPress={() => {
            // Voice assistant will be connected later.
          }}
        >
          <View style={styles.iconCircle}>
            <Text style={styles.icon}>💬</Text>
          </View>

          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>
              Help & Assistant
            </Text>

            <Text style={styles.cardSubtitle}>
              Get help while using THRIVE
            </Text>
          </View>

          <Text style={styles.arrow}>›</Text>
        </Pressable>

        {/* Today's progress */}
        <View style={styles.progressCard}>
          <Text style={styles.progressTitle}>
            Today's Progress
          </Text>

          <Text style={styles.progressText}>
            Start a game to begin building your daily progress.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F4EC',
  },

  content: {
    padding: 24,
    paddingTop: 55,
    paddingBottom: 40,
    maxWidth: 700,
    width: '100%',
    alignSelf: 'center',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },

  greeting: {
    fontSize: 18,
    color: '#65736B',
    marginBottom: 2,
  },

  logo: {
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: 4,
    color: '#3F6B57',
  },

  settingsButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D5DDD7',
  },

  settingsIcon: {
    fontSize: 25,
  },

  welcomeCard: {
    backgroundColor: '#3F6B57',
    borderRadius: 20,
    padding: 24,
    marginBottom: 30,
  },

  welcomeTitle: {
    fontSize: 25,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },

  welcomeText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#EAF1EC',
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: '700',
    color: '#26352D',
    marginBottom: 15,
  },

  mainCard: {
    width: '100%',
    minHeight: 105,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    marginBottom: 15,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D9E0DB',
  },

  cardPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },

  iconCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#E8F0EA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },

  icon: {
    fontSize: 29,
  },

  cardContent: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#26352D',
    marginBottom: 5,
  },

  cardSubtitle: {
    fontSize: 15,
    lineHeight: 21,
    color: '#65736B',
  },

  arrow: {
    fontSize: 35,
    color: '#3F6B57',
    marginLeft: 8,
  },

  progressCard: {
    marginTop: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: '#D9E0DB',
  },

  progressTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#26352D',
    marginBottom: 7,
  },

  progressText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#65736B',
  },
});