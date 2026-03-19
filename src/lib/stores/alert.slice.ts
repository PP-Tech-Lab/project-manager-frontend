import { createSlice } from '@reduxjs/toolkit';

export interface AlertState {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  customContent?: React.ReactNode;
  type?: 'error' | 'success' | 'info';
  open: boolean;
}

const initialState: AlertState = {
  title: undefined,
  description: undefined,
  confirmText: undefined,
  cancelText: undefined,
  customContent: undefined,
  type: undefined,
  open: false
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert: (state, action) => {
      state.title = action.payload.title;
      state.description = action.payload.description;
      state.confirmText = action.payload.confirmText;
      state.cancelText = action.payload.cancelText;
      state.customContent = action.payload.customContent;
      state.type = action.payload.type;
      state.open = true;
    },
    hideAlert: (state) => {
      state.title = undefined;
      state.description = undefined;
      state.confirmText = undefined;
      state.cancelText = undefined;
      state.customContent = undefined;
      state.type = undefined;
      state.open = false;
    }
  }
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;
