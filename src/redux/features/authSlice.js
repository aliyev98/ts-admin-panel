import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    step: "resetPassword",
    email: "",
    password: "",
    token: ""
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setStep: (state, action) => {
            state.step = action.payload;
        },
        prevStep: (state) => {
            if (state.step > 1) {
                state.step -= 1;
            }
        },
        resetStep: (state) => {
            state.step = 1;
            state.accountType = null;
            state.registrationMethod = null;
        },
        setEmail: (state, action) => {
            state.email = action.payload
        },
        setPassword: (state, action) => {
            state.password = action.payload
        },
        setToken: (state, action) => {
            state.token = action.payload
        }
    },
});

export const { setStep, resetStep, setEmail, setPassword, setToken } = authSlice.actions;
export default authSlice.reducer;
