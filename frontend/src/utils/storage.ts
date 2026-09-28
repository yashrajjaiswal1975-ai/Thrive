import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_PROFILE_KEY = '@thrive_user_profile';

export type UserProfile = {
    name: string;
    age: number;
};

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