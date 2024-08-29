import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// Data
import { githubUsername } from "../../services/data";

const initialState = {
  error: "",
  isLoading: true,
  data: [],
};



export const url = `https://api.github.com/users/${githubUsername}/repos?per_page=100`;

export const fetchGitHubReops = createAsyncThunk(
  "allProjects/fetchGitHubReops",
  async (_thunkApi, { rejectWithValue }) => {
    
    try {
        const response = await fetch(url).then(function (res) {
            if (!res.ok) {
                throw new Error(res.status.toString());
            }

            return res;
        });
        const data = await response.json();

        // add images default
        data.forEach((element:any) => {
            element.image = `https://via.placeholder.com/100/000000/FFFFFF/?text=${element.name}`;
        });
        
        return data;
    } catch (err:any) {
        return rejectWithValue(
            `Error: ${err.message}, check username in data.tsx (currently ${githubUsername})`
        );
    }
  }
);

export const allProjectsSlice = createSlice({
    name: "allProjects",
    initialState,
    reducers: {}, // Add an empty object for reducers
    extraReducers: (builder) => {
        builder
            .addCase(fetchGitHubReops.pending, (state) => {
                state.isLoading = true;
                state.error = "";
            })
            .addCase(fetchGitHubReops.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchGitHubReops.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string; // Add type annotation for 'action.payload'
                console.log(state.error);
            });
    },
});







export const selectIsLoading = (state: { allProjects: { isLoading: boolean } }) => state.allProjects.isLoading; // Add type annotation for 'state'
export const selectError = (state: { allProjects: { error: string } }) => state.allProjects.error; // Add type annotation for 'state'
export const selectData = (state: { allProjects: { data:[] } }) => state.allProjects.data; // Add type annotation for 'state'

export default allProjectsSlice.reducer;
