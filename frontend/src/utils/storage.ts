import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_PROFILE_KEY = '@thrive_user_profile';
const AUTH_KEY = '@thrive_logged_in';
const REMINDERS_KEY = '@thrive_reminders';

export type UserProfile = {
    name: string;
    age: number;
};

export type Reminder = {
    id: string;
    title: string;
    time: string;
    completed: boolean;
};

// ==================== USER PROFILE ====================

export async function saveUserProfile(profile: UserProfile) {
    try {
        await AsyncStorage.setItem(
            USER_PROFILE_KEY,
            JSON.stringify(profile)
        );
    } catch (error) {
        console.error('Failed to save user profile:', error);
    }
}

export async function getUserProfile(): Promise<UserProfile | null> {
    try {
        const storedProfile = await AsyncStorage.getItem(USER_PROFILE_KEY);

        if (!storedProfile) {
            return null;
        }

        return JSON.parse(storedProfile) as UserProfile;
    } catch (error) {
        console.error('Failed to load user profile:', error);
        return null;
    }
}

export async function clearUserProfile() {
    try {
        await AsyncStorage.removeItem(USER_PROFILE_KEY);
    } catch (error) {
        console.error('Failed to clear user profile:', error);
    }
}

// ==================== REMINDERS ====================

export async function saveReminders(reminders: Reminder[]) {
    try {
        await AsyncStorage.setItem(
            REMINDERS_KEY,
            JSON.stringify(reminders)
        );
    } catch (error) {
        console.error('Failed to save reminders:', error);
    }
}

export async function getReminders(): Promise<Reminder[]> {
    try {
        const storedReminders = await AsyncStorage.getItem(REMINDERS_KEY);

        if (!storedReminders) {
            return [];
        }

        return JSON.parse(storedReminders) as Reminder[];
    } catch (error) {
        console.error('Failed to load reminders:', error);
        return [];
    }
}

export async function clearReminders() {
    try {
        await AsyncStorage.removeItem(REMINDERS_KEY);
    } catch (error) {
        console.error('Failed to clear reminders:', error);
    }
}

// ==================== AUTHENTICATION ====================

export async function setLoggedIn() {
    try {
        await AsyncStorage.setItem(AUTH_KEY, 'true');
    } catch (error) {
        console.error('Failed to save login status:', error);
    }
}

export async function isLoggedIn(): Promise<boolean> {
    try {
        const value = await AsyncStorage.getItem(AUTH_KEY);
        return value === 'true';
    } catch (error) {
        console.error('Failed to check login status:', error);
        return false;
    }
}

export async function logout() {
    try {
        await AsyncStorage.removeItem(AUTH_KEY);
    } catch (error) {
        console.error('Failed to logout:', error);
    }
}