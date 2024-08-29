import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// Data
import { githubUsername } from "../../services/data";



const initialState = {
    isLoading: true,
    error: "",
    data: [],
};

export const url = `https://api.github.com/users/${githubUsername}`;

export const fetchGitHubInfo = createAsyncThunk(
    "home/fetchGitHubInfo",
    async (_, { rejectWithValue }) => {
        try {

            const response = await fetch(url).then(function (res) {
                if (!res.ok) {
                    throw new Error(res.status.toString());
                }
                return res;
            });
            const data = await response.json();
            return data;
        } catch (err) {
            return rejectWithValue(
                `Error: ${(err as Error).message}, check username in data.tsx (currently ${githubUsername})`
            );
        }
    }
);

export const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGitHubInfo.pending, (state) => {
                state.isLoading = true;
                state.error = "";
            })
            .addCase(fetchGitHubInfo.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchGitHubInfo.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.error = action.payload as string;
                console.log(state.error);
            });
    },
});


export const selectIsLoading = (state: any) => state.home.isLoading;
export const selectError = (state: any) => state.home.error;
export const selectData = (state: any) => state.home.data;

export default homeSlice.reducer;
