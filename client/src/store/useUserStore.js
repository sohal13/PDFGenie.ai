import { create } from 'zustand';

// Zustand store to manage user state
const useUserStore = create((set) => ({
    user: null,  // Initial state for the user
    setUser: (user) => set({ user }),  // Action to update the user state
    clearUser: () => set({ user: null }),  // Action to clear the user data (e.g., logout)
}));

export default useUserStore;
