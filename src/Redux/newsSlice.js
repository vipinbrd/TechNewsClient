import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    filteredNews: [],
    showSearchResults: false,
    searchTerm: '', // Add searchTerm to state
};

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        setFilteredNews: (state, action) => {
            state.filteredNews = action.payload;
        },
        setShowSearchResults: (state, action) => {
            state.showSearchResults = action.payload;
        },
        setSearchTerm: (state, action) => { // Add reducer to set searchTerm
            state.searchTerm = action.payload;
        },
        clearSearchTerm: (state) => { // Reducer to clear searchTerm
            state.searchTerm = '';
        },
    },
});

export const { setFilteredNews, setShowSearchResults, setSearchTerm, clearSearchTerm } = newsSlice.actions;

export default newsSlice.reducer;
