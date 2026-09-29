import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
} from 'react-native';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { getUserProfile } from '@/utils/storage';

export default function HomeScreen() {
  const [name, setName] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      const profile = await getUserProfile();

      if (profile?.name) {
        setName(profile.name);
      }
    };

    loadProfile();
  }, []);

  const showComingSoon = () => {

  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.content}>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>THRIVE</Text>

            <Text style={styles.greeting}>
              Hello{name ? `, ${name}` : ''}! 👋
            </Text>

            <Text style={styles.subtitle}>
              Let's make today a great day.
            </Text>
          </View>
        </View>

        {/* Main Game Card */}
        <Pressable
          style={({ pressed }) => [
            styles.mainCard,
            pressed && styles.pressed,
          ]}
          onPress={() => router.push('/games')}
        >
          <Text style={styles.cardEmoji}>🧠</Text>

          <View style={styles.cardContent}>
            <Text style={styles.mainCardTitle}>
              Cognitive Games
            </Text>

            <Text style={styles.mainCardText}>
              Exercise your memory, attention and thinking skills.
            </Text>

            <View style={styles.startButton}>
              <Text style={styles.startButtonText}>
                Play Games
              </Text>
            </View>
          </View>
        </Pressable>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>
          Quick Access
        </Text>

        <View style={styles.grid}>

          <Pressable
            style={({ pressed }) => [
              styles.actionCard,
              pressed && styles.pressed,
            ]}
            onPress={() => router.push('/games')}
          >
            <Text style={styles.actionEmoji}>🎮</Text>
            <Text style={styles.actionTitle}>Games</Text>
            <Text style={styles.actionText}>
              Train your mind
            </Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.actionCard,
              pressed && styles.pressed,
            ]}
            onPress={() => router.push('/reminders')}
          >
            <Text style={styles.actionEmoji}>🔔</Text>
            <Text style={styles.actionTitle}>Reminders</Text>
            <Text style={styles.actionText}>
              Stay organized
            </Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.actionCard,
              pressed && styles.pressed,
            ]}
            onPress={showComingSoon}
          >
            <Text style={styles.actionEmoji}>📊</Text>
            <Text style={styles.actionTitle}>Progress</Text>
            <Text style={styles.actionText}>
              See your journey
            </Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.actionCard,
              pressed && styles.pressed,
            ]}
            onPress={() => router.push('/settings')}
          >
            <Text style={styles.actionEmoji}>⚙️</Text>
            <Text style={styles.actionTitle}>Settings</Text>
            <Text style={styles.actionText}>
              Manage your app
            </Text>
          </Pressable>

        </View>

        {/* Daily encouragement */}
        <View style={styles.encouragement}>
          <Text style={styles.encouragementEmoji}>🌱</Text>

          <View style={styles.encouragementContent}>
            <Text style={styles.encouragementTitle}>
              Keep going!
            </Text>

            <Text style={styles.encouragementText}>
              A little practice every day can make a difference.
            </Text>
          </View>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F4EC',
  },

  scrollContent: {
    flexGrow: 1,
  },

  content: {
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
    padding: 24,
    paddingTop: 55,
    paddingBottom: 40,
  },

  header: {
    marginBottom: 30,
  },

  logo: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 3,
    color: '#3F6B57',
    marginBottom: 18,
  },

  greeting: {
    fontSize: 32,
    fontWeight: '700',
    color: '#26352D',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 17,
    color: '#65736B',
    lineHeight: 25,
  },

  mainCard: {
    backgroundColor: '#3F6B57',
    borderRadius: 22,
    padding: 24,
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },

  cardEmoji: {
    fontSize: 48,
    marginRight: 18,
  },

  cardContent: {
    flex: 1,
  },

  mainCardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },

  mainCardText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#E8F0EB',
    marginBottom: 18,
  },

  startButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },

  startButtonText: {
    color: '#3F6B57',
    fontSize: 15,
    fontWeight: '700',
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#26352D',
    marginBottom: 16,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 14,
  },

  actionCard: {
    width: '48%',
    minHeight: 145,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E0E5DF',
    justifyContent: 'center',
  },

  actionEmoji: {
    fontSize: 32,
    marginBottom: 10,
  },

  actionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#26352D',
    marginBottom: 5,
  },

  actionText: {
    fontSize: 14,
    color: '#65736B',
  },

  encouragement: {
    marginTop: 28,
    padding: 20,
    borderRadius: 18,
    backgroundColor: '#E8EFE9',
    flexDirection: 'row',
    alignItems: 'center',
  },

  encouragementEmoji: {
    fontSize: 32,
    marginRight: 14,
  },

  encouragementContent: {
    flex: 1,
  },

  encouragementTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#3F6B57',
    marginBottom: 4,
  },

  encouragementText: {
    fontSize: 14,
    lineHeight: 21,
    color: '#65736B',
  },

  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
});