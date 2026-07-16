import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchResult: null,   
  searchLoading: false,
  searchError: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchResult: (state, action) => {
      state.searchResult = action.payload;
      state.searchError = null;
    },
    setSearchLoading: (state, action) => {
      state.searchLoading = action.payload;
    },
    setSearchError: (state, action) => {
      state.searchError = action.payload;
      state.searchResult = null;
    },
    clearSearch: (state) => {
      state.searchResult = null;
      state.searchError = null;
    },
  },
});

export const { setSearchResult, setSearchLoading, setSearchError, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;