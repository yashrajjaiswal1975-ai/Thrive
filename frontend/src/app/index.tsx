import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';

import {
  getUserProfile,
  isLoggedIn,
} from '@/utils/storage';

export default function HomeScreen() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const loggedIn = await isLoggedIn();

      // Not logged in → Login
      if (!loggedIn) {
        router.replace('/login');
        return;
      }

      // Get saved profile
      const profile = await getUserProfile();

      if (profile?.name) {
        setName(profile.name);
      }

      setLoading(false);
    };

    checkUser();
  }, []);

  // Loading screen
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar barStyle="dark-content" />

        <Image
          source={require('../../assets/images/thrive-logo.png')}
          style={styles.loadingLogo}
          resizeMode="contain"
        />

        <Text style={styles.loadingText}>
          Loading...
        </Text>
      </View>
    );
  }

  const openProgress = () => {
    // Progress page will be connected later
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {/* ================= HEADER ================= */}

        <View style={styles.hero}>

          {/* THRIVE */}
          <Text style={styles.logoText}>
            THRIVE
          </Text>

          {/* Settings */}
          <Pressable
            style={({ pressed }) => [
              styles.settingsButton,
              pressed && styles.pressedSmall,
            ]}
            onPress={() => router.push('/settings')}
          >
            <Text style={styles.settingsIcon}>
              ⚙
            </Text>
          </Pressable>

          {/* Greeting */}
          <Text style={styles.greeting}>
            Hello, {name || 'user name'}! 👋
          </Text>

          {/* Logo */}
          <Image
            source={require('../../assets/images/thrive-logo.png')}
            style={styles.heroLogo}
            resizeMode="contain"
          />

          {/* Main heading */}
          <Text style={styles.heroTitle}>
            Your cognitive{'\n'}
            wellness companion
          </Text>

          <Text style={styles.heroSubtitle}>
            What would you like to do today?
          </Text>

        </View>


        {/* ================= MENU ================= */}

        <View style={styles.menuContainer}>

          {/* Cognitive Games */}
          <MenuButton
            icon="🧠"
            title="Cognitive Games"
            subtitle="Train your memory and focus"
            onPress={() => router.push('/games')}
          />

          {/* Reminders */}
          <MenuButton
            icon="🔔"
            title="Reminders"
            subtitle="Keep track of your daily tasks"
            onPress={() => router.push('/reminders')}
          />

          {/* Progress */}
          <MenuButton
            icon="📊"
            title="My Progress"
            subtitle="See your THRIVE journey"
            onPress={openProgress}
          />

          {/* Settings */}
          <MenuButton
            icon="⚙️"
            title="Settings"
            subtitle="Manage your THRIVE experience"
            onPress={() => router.push('/settings')}
          />

        </View>

      </ScrollView>
    </View>
  );
}


/* ================================================= */
/*                  MENU BUTTON                      */
/* ================================================= */

type MenuButtonProps = {
  icon: string;
  title: string;
  subtitle: string;
  onPress: () => void;
};

function MenuButton({
  icon,
  title,
  subtitle,
  onPress,
}: MenuButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.menuButton,
        pressed && styles.pressed,
      ]}
    >

      {/* Icon circle */}
      <View style={styles.iconCircle}>
        <Text style={styles.menuIcon}>
          {icon}
        </Text>
      </View>

      {/* Text */}
      <View style={styles.menuTextContainer}>
        <Text style={styles.menuTitle}>
          {title}
        </Text>

        <Text style={styles.menuSubtitle}>
          {subtitle}
        </Text>
      </View>

      {/* Arrow */}
      <Text style={styles.arrow}>
        ›
      </Text>

    </Pressable>
  );
}


/* ================================================= */
/*                    STYLES                         */
/* ================================================= */

const styles = StyleSheet.create({

  /* ---------- MAIN ---------- */

  container: {
    flex: 1,
    backgroundColor: '#F9F4EC',
  },

  scrollContent: {
    paddingBottom: 30,
  },


  /* ---------- HERO ---------- */

  hero: {
    marginHorizontal: 12,
    marginTop: 12,
    minHeight: 350,

    backgroundColor: '#C5F0ED',

    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
    borderTopLeftRadius: 70,
    borderTopRightRadius: 70,

    alignItems: 'center',

    paddingTop: 26,
    paddingBottom: 25,

    position: 'relative',
  },

  logoText: {
    fontSize: 43,
    fontWeight: '800',
    letterSpacing: 4,
    color: '#073B4C',

    marginBottom: 3,
  },

  settingsButton: {
    position: 'absolute',

    right: 18,
    top: 18,

    width: 44,
    height: 44,

    borderRadius: 22,

    backgroundColor: '#A9DDD9',

    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#4A7775',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,

    elevation: 3,
  },

  settingsIcon: {
    fontSize: 23,
    color: '#28636A',
  },

  greeting: {
    fontSize: 15,
    fontWeight: '600',

    color: '#073B4C',

    marginBottom: 8,
  },

  heroLogo: {
    width: 125,
    height: 125,

    marginVertical: 3,
  },

  heroTitle: {
    textAlign: 'center',

    fontSize: 21,
    lineHeight: 23,

    fontWeight: '800',

    color: '#073B4C',

    marginTop: 2,
  },

  heroSubtitle: {
    fontSize: 14,

    color: '#245763',

    marginTop: 14,

    fontWeight: '500',
  },


  /* ---------- MENU ---------- */

  menuContainer: {
    paddingHorizontal: 30,
    paddingTop: 16,
  },

  menuButton: {
    minHeight: 68,

    backgroundColor: '#C3ECE9',

    borderRadius: 34,

    marginBottom: 9,

    flexDirection: 'row',
    alignItems: 'center',

    paddingLeft: 9,
    paddingRight: 15,

    shadowColor: '#477A78',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.10,
    shadowRadius: 4,

    elevation: 2,
  },

  iconCircle: {
    width: 54,
    height: 54,

    borderRadius: 27,

    backgroundColor: '#FFFDF8',

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 13,
  },

  menuIcon: {
    fontSize: 27,
  },

  menuTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  menuTitle: {
    fontSize: 15,

    fontWeight: '800',

    color: '#073B4C',

    marginBottom: 2,
  },

  menuSubtitle: {
    fontSize: 11,

    color: '#35616A',

    lineHeight: 15,
  },

  arrow: {
    fontSize: 34,

    fontWeight: '300',

    color: '#073B4C',

    marginLeft: 8,

    marginTop: -4,
  },


  /* ---------- PRESS ---------- */

  pressed: {
    opacity: 0.78,

    transform: [
      {
        scale: 0.985,
      },
    ],
  },

  pressedSmall: {
    opacity: 0.7,

    transform: [
      {
        scale: 0.94,
      },
    ],
  },


  /* ---------- LOADING ---------- */

  loadingContainer: {
    flex: 1,

    backgroundColor: '#F9F4EC',

    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingLogo: {
    width: 100,
    height: 100,

    marginBottom: 15,
  },

  loadingText: {
    fontSize: 16,

    color: '#35616A',

    fontWeight: '500',
  },

});