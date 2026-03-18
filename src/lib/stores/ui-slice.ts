import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  loader: {
    isOpen: boolean;
    message?: string;
  };
}

const initialState: UIState = {
  loader: {
    isOpen: false,
    message: undefined,
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showLoader: (state, action: PayloadAction<string | undefined>) => {
      state.loader.isOpen = true;
      state.loader.message = action.payload;
    },
    hideLoader: (state) => {
      state.loader.isOpen = false;
      state.loader.message = undefined;
    },
  },
});

export const { showLoader, hideLoader } = uiSlice.actions;
export default uiSlice.reducer;
