import { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    TextInput,
    ScrollView,
} from 'react-native';

type Reminder = {
    id: string;
    title: string;
    time: string;
    completed: boolean;
};

export default function RemindersScreen() {
    const [reminders, setReminders] = useState<Reminder[]>([
        {
            id: '1',
            title: 'Morning medicine',
            time: '8:00 AM',
            completed: false,
        },
        {
            id: '2',
            title: 'Morning walk',
            time: '10:00 AM',
            completed: false,
        },
        {
            id: '3',
            title: 'Memory exercise',
            time: '5:00 PM',
            completed: false,
        },
    ]);

    const [showAddForm, setShowAddForm] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newTime, setNewTime] = useState('');

    const toggleReminder = (id: string) => {
        setReminders((current) =>
            current.map((reminder) =>
                reminder.id === id
                    ? { ...reminder, completed: !reminder.completed }
                    : reminder
            )
        );
    };

    const addReminder = () => {
        if (!newTitle.trim() || !newTime.trim()) {
            return;
        }

        const reminder: Reminder = {
            id: Date.now().toString(),
            title: newTitle.trim(),
            time: newTime.trim(),
            completed: false,
        };

        setReminders((current) => [...current, reminder]);

        setNewTitle('');
        setNewTime('');
        setShowAddForm(false);
    };

    const deleteReminder = (id: string) => {
        setReminders((current) =>
            current.filter((reminder) => reminder.id !== id)
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.emoji}>🔔</Text>

            <Text style={styles.title}>Reminders</Text>

            <Text style={styles.subtitle}>
                Stay organized and never miss an important activity.
            </Text>

            <Text style={styles.sectionTitle}>Today's Reminders</Text>

            {reminders.length === 0 ? (
                <View style={styles.emptyCard}>
                    <Text style={styles.emptyEmoji}>📭</Text>
                    <Text style={styles.emptyTitle}>No reminders yet</Text>
                    <Text style={styles.emptyText}>
                        Add a reminder to keep your day organized.
                    </Text>
                </View>
            ) : (
                reminders.map((reminder) => (
                    <View
                        key={reminder.id}
                        style={[
                            styles.reminderCard,
                            reminder.completed && styles.completedCard,
                        ]}
                    >
                        <Pressable
                            style={styles.checkButton}
                            onPress={() => toggleReminder(reminder.id)}
                        >
                            <Text style={styles.checkText}>
                                {reminder.completed ? '✓' : '○'}
                            </Text>
                        </Pressable>

                        <View style={styles.reminderContent}>
                            <Text
                                style={[
                                    styles.reminderTitle,
                                    reminder.completed && styles.completedText,
                                ]}
                            >
                                {reminder.title}
                            </Text>

                            <Text style={styles.reminderTime}>
                                🕐 {reminder.time}
                            </Text>
                        </View>

                        <Pressable
                            style={styles.deleteButton}
                            onPress={() => deleteReminder(reminder.id)}
                        >
                            <Text style={styles.deleteText}>🗑️</Text>
                        </Pressable>
                    </View>
                ))
            )}

            {showAddForm && (
                <View style={styles.formCard}>
                    <Text style={styles.formTitle}>Add Reminder</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Reminder name"
                        placeholderTextColor="#8A9A9A"
                        value={newTitle}
                        onChangeText={setNewTitle}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Time (e.g. 7:30 PM)"
                        placeholderTextColor="#8A9A9A"
                        value={newTime}
                        onChangeText={setNewTime}
                    />

                    <View style={styles.formButtons}>
                        <Pressable
                            style={styles.cancelButton}
                            onPress={() => setShowAddForm(false)}
                        >
                            <Text style={styles.cancelText}>Cancel</Text>
                        </Pressable>

                        <Pressable
                            style={styles.saveButton}
                            onPress={addReminder}
                        >
                            <Text style={styles.saveText}>Save Reminder</Text>
                        </Pressable>
                    </View>
                </View>
            )}

            {!showAddForm && (
                <Pressable
                    style={({ pressed }) => [
                        styles.addButton,
                        pressed && styles.pressed,
                    ]}
                    onPress={() => setShowAddForm(true)}
                >
                    <Text style={styles.addButtonText}>＋ Add Reminder</Text>
                </Pressable>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 24,
        backgroundColor: '#F8F6EF',
        alignItems: 'stretch',
    },

    emoji: {
        fontSize: 52,
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 10,
    },

    title: {
        fontSize: 36,
        fontWeight: '700',
        color: '#163B4A',
        textAlign: 'center',
    },

    subtitle: {
        fontSize: 16,
        lineHeight: 24,
        color: '#65736B',
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 30,
    },

    sectionTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#163B4A',
        marginBottom: 14,
    },

    reminderCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        padding: 18,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: '#E5E1D7',
    },

    completedCard: {
        opacity: 0.65,
    },

    checkButton: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: '#EAF4E3',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },

    checkText: {
        fontSize: 25,
        color: '#4E7A52',
    },

    reminderContent: {
        flex: 1,
    },

    reminderTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#163B4A',
        marginBottom: 5,
    },

    completedText: {
        textDecorationLine: 'line-through',
    },

    reminderTime: {
        fontSize: 14,
        color: '#65736B',
    },

    deleteButton: {
        padding: 8,
        marginLeft: 8,
    },

    deleteText: {
        fontSize: 20,
    },

    addButton: {
        backgroundColor: '#4E7A52',
        borderRadius: 16,
        paddingVertical: 17,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 30,
    },

    addButtonText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '700',
    },

    pressed: {
        opacity: 0.8,
    },

    emptyCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        padding: 30,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E1D7',
    },

    emptyEmoji: {
        fontSize: 40,
        marginBottom: 10,
    },

    emptyTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#163B4A',
    },

    emptyText: {
        fontSize: 14,
        color: '#65736B',
        textAlign: 'center',
        marginTop: 6,
    },

    formCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        padding: 20,
        marginTop: 8,
        borderWidth: 1,
        borderColor: '#E5E1D7',
    },

    formTitle: {
        fontSize: 21,
        fontWeight: '700',
        color: '#163B4A',
        marginBottom: 16,
    },

    input: {
        borderWidth: 1,
        borderColor: '#D8D5CB',
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 13,
        fontSize: 16,
        color: '#163B4A',
        marginBottom: 12,
        backgroundColor: '#FAFAF7',
    },

    formButtons: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 5,
    },

    cancelButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: '#ECEAE2',
        alignItems: 'center',
    },

    cancelText: {
        color: '#53615B',
        fontSize: 15,
        fontWeight: '600',
    },

    saveButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: '#4E7A52',
        alignItems: 'center',
    },

    saveText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
    },
});