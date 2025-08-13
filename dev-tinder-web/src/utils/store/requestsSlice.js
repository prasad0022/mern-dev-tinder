import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
    name: "requests",
    initialState: null,
    reducers: {
        addRequests: (state, action) => action.payload,
        removeRequest: (state, action) => {
            return state.filter(req => req._id !== action.payload);
        },
        removeRequests: () => null
    }
});

export const { addRequests, removeRequests, removeRequest } = requestsSlice.actions;
export default requestsSlice.reducer;