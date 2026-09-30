import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    ScrollView,
} from 'react-native';

export default function GamesScreen() {
    const showComingSoon = () => {
        alert('Games are coming soon! 🧠');
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
        >
            <Text style={styles.emoji}>🧠</Text>

            <Text style={styles.title}>Cognitive Games</Text>

            <Text style={styles.subtitle}>
                Exercise your memory, attention and thinking skills.
            </Text>

            {/* Memory Game */}
            <Pressable
                style={({ pressed }) => [
                    styles.gameCard,
                    pressed && styles.pressed,
                ]}
                onPress={() => alert('Memory Match game coming soon! 🧩')}
            >
                <Text style={styles.gameEmoji}>🧩</Text>

                <View style={styles.gameContent}>
                    <Text style={styles.gameTitle}>Memory Match</Text>
                    <Text style={styles.gameDescription}>
                        Match the cards and exercise your memory.
                    </Text>
                </View>
            </Pressable>

            {/* Attention Game */}
            <Pressable
                style={({ pressed }) => [
                    styles.gameCard,
                    pressed && styles.pressed,
                ]}
                onPress={showComingSoon}
            >
                <Text style={styles.gameEmoji}>🎯</Text>

                <View style={styles.gameContent}>
                    <Text style={styles.gameTitle}>Focus Challenge</Text>
                    <Text style={styles.gameDescription}>
                        Test your attention and concentration.
                    </Text>
                </View>
            </Pressable>

            {/* Sequence Game */}
            <Pressable
                style={({ pressed }) => [
                    styles.gameCard,
                    pressed && styles.pressed,
                ]}
                onPress={showComingSoon}
            >
                <Text style={styles.gameEmoji}>🔢</Text>

                <View style={styles.gameContent}>
                    <Text style={styles.gameTitle}>Remember the Sequence</Text>
                    <Text style={styles.gameDescription}>
                        Remember and repeat the correct sequence.
                    </Text>
                </View>
            </Pressable>

            {/* Coming Soon */}
            <View style={styles.infoBox}>
                <Text style={styles.infoEmoji}>🌱</Text>

                <Text style={styles.infoTitle}>
                    More games are coming!
                </Text>

                <Text style={styles.infoText}>
                    THRIVE will gradually add personalized cognitive exercises
                    based on your progress.
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

    emoji: {
        fontSize: 48,
        textAlign: 'center',
        marginBottom: 12,
    },

    title: {
        fontSize: 30,
        fontWeight: '700',
        color: '#24332D',
        textAlign: 'center',
    },

    subtitle: {
        fontSize: 16,
        lineHeight: 24,
        color: '#65736B',
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 28,
    },

    gameCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',

        borderWidth: 1,
        borderColor: '#E4E1D8',

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 5,
        elevation: 2,
    },

    gameEmoji: {
        fontSize: 40,
        marginRight: 16,
    },

    gameContent: {
        flex: 1,
    },

    gameTitle: {
        fontSize: 19,
        fontWeight: '700',
        color: '#24332D',
        marginBottom: 5,
    },

    gameDescription: {
        fontSize: 14,
        lineHeight: 20,
        color: '#65736B',
    },

    pressed: {
        opacity: 0.8,
        transform: [{ scale: 0.98 }],
    },

    infoBox: {
        backgroundColor: '#EAF1E8',
        borderRadius: 20,
        padding: 20,
        marginTop: 8,
        alignItems: 'center',
    },

    infoEmoji: {
        fontSize: 32,
        marginBottom: 8,
    },

    infoTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#24332D',
        marginBottom: 6,
        textAlign: 'center',
    },

    infoText: {
        fontSize: 14,
        lineHeight: 21,
        color: '#65736B',
        textAlign: 'center',
    },
});