import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
} from 'react-native';

export default function ExploreScreen() {
  const showComingSoon = (feature: string) => {
    alert(`${feature} is coming soon! 🌱`);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.emoji}>🌱</Text>

        <Text style={styles.title}>Explore</Text>

        <Text style={styles.subtitle}>
          Discover activities and resources to support your daily wellbeing.
        </Text>
      </View>

      {/* Cognitive Activities */}
      <Text style={styles.sectionTitle}>Cognitive Activities</Text>

      <View style={styles.grid}>
        <Pressable
          style={({ pressed }) => [
            styles.card,
            pressed && styles.pressed,
          ]}
          onPress={() => showComingSoon('Memory Activities')}
        >
          <Text style={styles.cardEmoji}>🧠</Text>
          <Text style={styles.cardTitle}>Memory Activities</Text>
          <Text style={styles.cardDescription}>
            Simple activities to exercise memory and recall.
          </Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.card,
            pressed && styles.pressed,
          ]}
          onPress={() => showComingSoon('Focus & Attention')}
        >
          <Text style={styles.cardEmoji}>🎯</Text>

          <Text style={styles.cardTitle}>
            Focus & Attention
          </Text>

          <Text style={styles.cardDescription}>
            Activities to improve attention and concentration.
          </Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.card,
            pressed && styles.pressed,
          ]}
          onPress={() => showComingSoon('Sequence & Recall')}
        >
          <Text style={styles.cardEmoji}>🔢</Text>

          <Text style={styles.cardTitle}>
            Sequence & Recall
          </Text>

          <Text style={styles.cardDescription}>
            Practice remembering patterns and sequences.
          </Text>
        </Pressable>

        <Pressable

          style={({ pressed }) => [
            styles.card,
            pressed && styles.pressed,
          ]}
          onPress={() => showComingSoon('Focus Activities')}
        >
          <Text style={styles.cardEmoji}>🎯</Text>
          <Text style={styles.cardTitle}>Focus Activities</Text>
          <Text style={styles.cardDescription}>
            Activities designed to encourage attention and concentration.
          </Text>
        </Pressable>
      </View>
      {/* Wellness Activities */}
      <Text style={styles.sectionTitle}>
        Wellness Activities
      </Text>

      <View style={styles.grid}>
        <Pressable
          style={({ pressed }) => [
            styles.card,
            pressed && styles.pressed,
          ]}
          onPress={() => showComingSoon('Daily Wellness')}
        >
          <Text style={styles.cardEmoji}>🌿</Text>

          <Text style={styles.cardTitle}>
            Daily Wellness
          </Text>

          <Text style={styles.cardDescription}>
            Simple activities to support everyday wellbeing.
          </Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.card,
            pressed && styles.pressed,
          ]}
          onPress={() => showComingSoon('Relaxation')}
        >
          <Text style={styles.cardEmoji}>🧘</Text>

          <Text style={styles.cardTitle}>
            Relaxation
          </Text>

          <Text style={styles.cardDescription}>
            Calm activities for relaxation and mindfulness.
          </Text>
        </Pressable>
      </View>

      {/* Daily Wellness */}
      <Text style={styles.sectionTitle}>Daily Wellness</Text>
      <Pressable
        style={({ pressed }) => [
          styles.card,
          pressed && styles.pressed,
        ]}
        onPress={() => showComingSoon('Daily Routine')}
      >
        <Text style={styles.cardEmoji}>📅</Text>

        <Text style={styles.cardTitle}>
          Daily Routine
        </Text>

        <Text style={styles.cardDescription}>
          Keep track of simple daily activities and routines.
        </Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.card,
          pressed && styles.pressed,
        ]}
        onPress={() => showComingSoon('Healthy Habits')}
      >
        <Text style={styles.cardEmoji}>💚</Text>

        <Text style={styles.cardTitle}>
          Healthy Habits
        </Text>

        <Text style={styles.cardDescription}>
          Build simple habits for a healthy everyday life.
        </Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.wideCard,
          pressed && styles.pressed,
        ]}
        onPress={() => showComingSoon('Daily Wellness Tips')}
      >
        <View style={styles.iconCircle}>
          <Text style={styles.smallEmoji}>☀️</Text>
        </View>

        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle}>Daily Wellness Tips</Text>

          <Text style={styles.cardDescription}>
            Helpful suggestions for maintaining a healthy daily routine.
          </Text>
        </View>
      </Pressable>

      {/* Helpful Resources */}
      <Text style={styles.sectionTitle}>Helpful Resources</Text>
      <Pressable
  style={({ pressed }) => [
    styles.card,
    pressed && styles.pressed,
  ]}
  onPress={() => showComingSoon('Health Resources')}
>
  <Text style={styles.cardEmoji}>📚</Text>

  <Text style={styles.cardTitle}>
    Health Resources
  </Text>

  <Text style={styles.cardDescription}>
    Useful information and resources for everyday wellbeing.
  </Text>
</Pressable>

<Pressable
  style={({ pressed }) => [
    styles.card,
    pressed && styles.pressed,
  ]}
  onPress={() => showComingSoon('Caregiver Resources')}
>
  <Text style={styles.cardEmoji}>🤝</Text>

  <Text style={styles.cardTitle}>
    Caregiver Resources
  </Text>

  <Text style={styles.cardDescription}>
    Helpful resources for family members and caregivers.
  </Text>
</Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.wideCard,
          pressed && styles.pressed,
        ]}
        onPress={() => showComingSoon('Wellbeing Resources')}
      >
        <View style={styles.iconCircle}>
          <Text style={styles.smallEmoji}>📚</Text>
        </View>

        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle}>Wellbeing Resources</Text>

          <Text style={styles.cardDescription}>
            Explore useful information and resources for everyday wellbeing.
          </Text>
        </View>
      </Pressable>

      {/* Community */}
      <Text style={styles.sectionTitle}>Stay Connected</Text>

      <Pressable
        style={({ pressed }) => [
          styles.wideCard,
          pressed && styles.pressed,
        ]}
        onPress={() => showComingSoon('Community Features')}
      >
        <View style={styles.iconCircle}>
          <Text style={styles.smallEmoji}>🤝</Text>
        </View>

        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle}>Community</Text>

          <Text style={styles.cardDescription}>
            More ways to connect, participate and stay engaged.
          </Text>
        </View>
      </Pressable>

      {/* Bottom message */}
      <View style={styles.bottomMessage}>
        <Text style={styles.bottomEmoji}>🌿</Text>

        <Text style={styles.bottomTitle}>
          More features are coming!
        </Text>

        <Text style={styles.bottomText}>
          THRIVE is being built to make everyday life more engaging,
          organized and supportive.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F4EC',
  },

  content: {
    padding: 24,
    paddingTop: 50,
    paddingBottom: 40,
  },

  header: {
    alignItems: 'center',
    marginBottom: 32,
  },

  emoji: {
    fontSize: 48,
    marginBottom: 8,
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#24332D',
    textAlign: 'center',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 17,
    color: '#60746C',
    textAlign: 'center',
    lineHeight: 25,
    maxWidth: 600,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#24332D',
    marginBottom: 14,
    marginTop: 8,
  },

  grid: {
    gap: 16,
    marginBottom: 24,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 22,
    minHeight: 170,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E6E2D8',
    shadowColor: '#000000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  wideCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E6E2D8',
    shadowColor: '#000000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },

  cardEmoji: {
    fontSize: 42,
    marginBottom: 12,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#24332D',
    marginBottom: 6,
  },

  cardDescription: {
    fontSize: 15,
    color: '#60746C',
    lineHeight: 22,
  },

  iconCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#EAF3E7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },

  smallEmoji: {
    fontSize: 28,
  },

  cardTextContainer: {
    flex: 1,
  },

  bottomMessage: {
    backgroundColor: '#EAF3E7',
    borderRadius: 20,
    padding: 24,
    marginTop: 12,
    alignItems: 'center',
  },

  bottomEmoji: {
    fontSize: 38,
    marginBottom: 8,
  },

  bottomTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#24332D',
    textAlign: 'center',
    marginBottom: 8,
  },

  bottomText: {
    fontSize: 15,
    color: '#60746C',
    lineHeight: 22,
    textAlign: 'center',
  },
});