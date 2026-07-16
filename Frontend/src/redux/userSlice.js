import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    loading: true, // shuru me true — jab tak /me call complete na ho
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        removeUser: (state) => {
            state.user = null;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
});

export const { setUser, removeUser, setLoading } = userSlice.actions;
export default userSlice.reducer;