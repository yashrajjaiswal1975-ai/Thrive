import { useState } from 'react';
import {
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    View,
} from 'react-native';

export default function SettingsScreen() {
    const [notifications, setNotifications] = useState(true);
    const [dailyReminders, setDailyReminders] = useState(true);

    const showComingSoon = (feature: string) => {
        Alert.alert(feature, 'This feature will be available soon.');
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
        >
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.emoji}>⚙️</Text>

                <Text style={styles.title}>Settings</Text>

                <Text style={styles.subtitle}>
                    Manage your THRIVE experience.
                </Text>
            </View>

            {/* Preferences */}
            <Text style={styles.sectionTitle}>Preferences</Text>

            <View style={styles.card}>
                <View style={styles.row}>
                    <View style={styles.textContainer}>
                        <Text style={styles.itemTitle}>🔔 Notifications</Text>

                        <Text style={styles.description}>
                            Receive helpful app notifications.
                        </Text>
                    </View>

                    <Switch
                        value={notifications}
                        onValueChange={setNotifications}
                    />
                </View>

                <View style={styles.divider} />

                <View style={styles.row}>
                    <View style={styles.textContainer}>
                        <Text style={styles.itemTitle}>📅 Daily Reminders</Text>

                        <Text style={styles.description}>
                            Get reminders for your daily routine.
                        </Text>
                    </View>

                    <Switch
                        value={dailyReminders}
                        onValueChange={setDailyReminders}
                    />
                </View>
            </View>

            {/* Account */}
            <Text style={styles.sectionTitle}>Account</Text>

            <Pressable
                style={({ pressed }) => [
                    styles.card,
                    pressed && styles.pressed,
                ]}
                onPress={() => showComingSoon('Profile')}
            >
                <Text style={styles.itemTitle}>👤 Profile</Text>

                <Text style={styles.description}>
                    View and manage your personal information.
                </Text>
            </Pressable>

            {/* App */}
            <Text style={styles.sectionTitle}>App</Text>

            <Pressable
                style={({ pressed }) => [
                    styles.card,
                    pressed && styles.pressed,
                ]}
                onPress={() => showComingSoon('Language')}
            >
                <Text style={styles.itemTitle}>🌐 Language</Text>

                <Text style={styles.description}>
                    Choose your preferred language.
                </Text>
            </Pressable>

            <Pressable
                style={({ pressed }) => [
                    styles.card,
                    pressed && styles.pressed,
                ]}
                onPress={() => showComingSoon('Accessibility')}
            >
                <Text style={styles.itemTitle}>♿ Accessibility</Text>

                <Text style={styles.description}>
                    Adjust the app for easier and more comfortable use.
                </Text>
            </Pressable>

            {/* About */}
            <Text style={styles.sectionTitle}>About</Text>

            <Pressable
                style={({ pressed }) => [
                    styles.card,
                    pressed && styles.pressed,
                ]}
                onPress={() => showComingSoon('About THRIVE')}
            >
                <Text style={styles.itemTitle}>🌱 About THRIVE</Text>

                <Text style={styles.description}>
                    Learn more about the THRIVE platform.
                </Text>
            </Pressable>

            <Text style={styles.version}>THRIVE • Frontend Preview</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F5ED',
    },

    content: {
        padding: 24,
        paddingBottom: 50,
    },

    header: {
        alignItems: 'center',
        marginBottom: 30,
    },

    emoji: {
        fontSize: 54,
        marginBottom: 10,
    },

    title: {
        fontSize: 32,
        fontWeight: '800',
        color: '#183B35',
    },

    subtitle: {
        fontSize: 17,
        color: '#58736D',
        marginTop: 8,
        textAlign: 'center',
    },

    sectionTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#183B35',
        marginBottom: 12,
        marginTop: 10,
    },

    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        padding: 20,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: '#E4E5DD',

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 5,
        elevation: 2,
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    textContainer: {
        flex: 1,
        paddingRight: 15,
    },

    itemTitle: {
        fontSize: 19,
        fontWeight: '700',
        color: '#183B35',
    },

    description: {
        fontSize: 15,
        lineHeight: 22,
        color: '#617873',
        marginTop: 6,
    },

    divider: {
        height: 1,
        backgroundColor: '#E7E8E2',
        marginVertical: 18,
    },

    pressed: {
        opacity: 0.7,
        transform: [{ scale: 0.99 }],
    },

    version: {
        textAlign: 'center',
        color: '#8A9A96',
        fontSize: 13,
        marginTop: 20,
    },
});