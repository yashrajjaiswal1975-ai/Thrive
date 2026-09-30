import {
    StyleSheet,
    Text,
    View,
    Pressable,
    ScrollView,
    Alert,
} from 'react-native';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';

import {
    getUserProfile,
    logout,
    type UserProfile,
} from '@/utils/storage';

export default function SettingsScreen() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [dailyRemindersEnabled, setDailyRemindersEnabled] = useState(true);

    useEffect(() => {
        const loadProfile = async () => {
            const savedProfile = await getUserProfile();
            setProfile(savedProfile);
        };

        loadProfile();
    }, []);

    const handleProfilePress = () => {
        if (profile) {
            Alert.alert(
                'Your Profile',
                `Name: ${profile.name}\nAge: ${profile.age}`,
                [{ text: 'OK' }]
            );
        } else {
            Alert.alert(
                'Profile',
                'No profile information found.',
                [{ text: 'OK' }]
            );
        }
    };

    const handleLogout = () => {
        Alert.alert(
            'Log Out',
            'Are you sure you want to log out?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Log Out',
                    style: 'destructive',
                    onPress: async () => {
                        await logout();
                        router.replace('/login');
                    },
                },
            ]
        );
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.scrollContent}
        >
            <View style={styles.content}>

                {/* Header */}
                <View style={styles.header}>
                    <Pressable
                        onPress={() => router.back()}
                        style={styles.backButton}
                    >
                        <Text style={styles.backButtonText}>‹</Text>
                    </Pressable>

                    <View>
                        <Text style={styles.title}>
                            Settings
                        </Text>

                        <Text style={styles.subtitle}>
                            Manage your THRIVE experience
                        </Text>
                    </View>
                </View>

                {/* Profile */}
                <Text style={styles.sectionTitle}>
                    Profile
                </Text>

                <Pressable
                    style={({ pressed }) => [
                        styles.settingCard,
                        pressed && styles.pressed,
                    ]}
                    onPress={handleProfilePress}
                >
                    <View style={styles.iconContainer}>
                        <Text style={styles.icon}>👤</Text>
                    </View>

                    <View style={styles.settingContent}>
                        <Text style={styles.settingTitle}>
                            My Profile
                        </Text>

                        <Text style={styles.settingDescription}>
                            {profile
                                ? `${profile.name}, ${profile.age} years old`
                                : 'View your saved profile'}
                        </Text>
                    </View>

                    <Text style={styles.arrow}>
                        ›
                    </Text>
                </Pressable>

                {/* Preferences */}
                <Text style={styles.sectionTitle}>
                    Preferences
                </Text>

                {/* Notifications */}
                <View style={styles.settingCard}>
                    <View style={styles.iconContainer}>
                        <Text style={styles.icon}>
                            🔔
                        </Text>
                    </View>

                    <View style={styles.settingContent}>
                        <Text style={styles.settingTitle}>
                            Notifications
                        </Text>

                        <Text style={styles.settingDescription}>
                            Receive helpful notifications
                        </Text>
                    </View>

                    <Pressable
                        onPress={() =>
                            setNotificationsEnabled(
                                !notificationsEnabled
                            )
                        }
                        style={[
                            styles.toggle,
                            notificationsEnabled &&
                            styles.toggleActive,
                        ]}
                    >
                        <View
                            style={[
                                styles.toggleCircle,
                                notificationsEnabled &&
                                styles.toggleCircleActive,
                            ]}
                        />
                    </Pressable>
                </View>

                {/* Daily Reminders */}
                <View style={styles.settingCard}>
                    <View style={styles.iconContainer}>
                        <Text style={styles.icon}>
                            ⏰
                        </Text>
                    </View>

                    <View style={styles.settingContent}>
                        <Text style={styles.settingTitle}>
                            Daily Reminders
                        </Text>

                        <Text style={styles.settingDescription}>
                            Get reminders for your daily activities
                        </Text>
                    </View>

                    <Pressable
                        onPress={() =>
                            setDailyRemindersEnabled(
                                !dailyRemindersEnabled
                            )
                        }
                        style={[
                            styles.toggle,
                            dailyRemindersEnabled &&
                            styles.toggleActive,
                        ]}
                    >
                        <View
                            style={[
                                styles.toggleCircle,
                                dailyRemindersEnabled &&
                                styles.toggleCircleActive,
                            ]}
                        />
                    </Pressable>
                </View>

                {/* Logout */}
                <Pressable
                    style={({ pressed }) => [
                        styles.logoutButton,
                        pressed && styles.pressed,
                    ]}
                    onPress={handleLogout}
                >
                    <Text style={styles.logoutButtonText}>
                        Log Out
                    </Text>
                </Pressable>

                {/* About */}
                <Text style={styles.sectionTitle}>
                    About
                </Text>

                <View style={styles.aboutCard}>
                    <Text style={styles.aboutLogo}>
                        THRIVE
                    </Text>

                    <Text style={styles.aboutText}>
                        A cognitive wellness and memory assistance
                        platform designed to support your daily
                        mental well-being.
                    </Text>

                    <Text style={styles.version}>
                        Version 1.0.0
                    </Text>
                </View>

                {/* Footer */}
                <Text style={styles.footerText}>
                    Take care of your mind, one day at a time. 🌱
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

    scrollContent: {
        flexGrow: 1,
    },

    content: {
        width: '100%',
        maxWidth: 600,
        alignSelf: 'center',
        padding: 24,
        paddingTop: 50,
        paddingBottom: 40,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 35,
    },

    backButton: {
        width: 42,
        height: 42,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
        borderWidth: 1,
        borderColor: '#E0E5DF',
    },

    backButtonText: {
        fontSize: 34,
        lineHeight: 36,
        color: '#3F6B57',
        marginTop: -4,
    },

    title: {
        fontSize: 30,
        fontWeight: '700',
        color: '#26352D',
    },

    subtitle: {
        fontSize: 15,
        color: '#65736B',
        marginTop: 4,
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#26352D',
        marginBottom: 14,
        marginTop: 10,
    },

    settingCard: {
        width: '100%',
        minHeight: 78,
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E5DF',
    },

    iconContainer: {
        width: 46,
        height: 46,
        borderRadius: 14,
        backgroundColor: '#E8EFE9',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },

    icon: {
        fontSize: 24,
    },

    settingContent: {
        flex: 1,
    },

    settingTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#26352D',
        marginBottom: 4,
    },

    settingDescription: {
        fontSize: 14,
        color: '#65736B',
        lineHeight: 20,
    },

    arrow: {
        fontSize: 30,
        color: '#9AA59E',
        marginLeft: 10,
    },

    toggle: {
        width: 48,
        height: 28,
        borderRadius: 20,
        backgroundColor: '#D6DDD8',
        padding: 3,
        justifyContent: 'center',
    },

    toggleActive: {
        backgroundColor: '#3F6B57',
    },

    toggleCircle: {
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: '#FFFFFF',
        alignSelf: 'flex-start',
    },

    toggleCircleActive: {
        alignSelf: 'flex-end',
    },

    logoutButton: {
        width: '100%',
        paddingVertical: 16,
        borderRadius: 14,
        borderWidth: 2,
        borderColor: '#C85C5C',
        alignItems: 'center',
        marginTop: 18,
        marginBottom: 22,
    },

    logoutButtonText: {
        color: '#C85C5C',
        fontSize: 17,
        fontWeight: '700',
    },

    aboutCard: {
        backgroundColor: '#E8EFE9',
        borderRadius: 18,
        padding: 22,
    },

    aboutLogo: {
        fontSize: 22,
        fontWeight: '800',
        letterSpacing: 3,
        color: '#3F6B57',
        marginBottom: 10,
    },

    aboutText: {
        fontSize: 15,
        lineHeight: 23,
        color: '#65736B',
        marginBottom: 12,
    },

    version: {
        fontSize: 13,
        color: '#89958D',
    },

    footerText: {
        textAlign: 'center',
        fontSize: 14,
        color: '#89958D',
        marginTop: 22,
    },

    pressed: {
        opacity: 0.8,
        transform: [{ scale: 0.98 }],
    },
});