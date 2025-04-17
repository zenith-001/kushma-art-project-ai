import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  isSidebarOpen: boolean;
  isModalOpen: boolean;
  modalContent: {
    type: string;
    data?: any;
  } | null;
  language: 'en' | 'ne';
}

const initialState: UIState = {
  isSidebarOpen: false,
  isModalOpen: false,
  modalContent: null,
  language: 'en',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    openModal: (state, action: PayloadAction<{ type: string; data?: any }>) => {
      state.isModalOpen = true;
      state.modalContent = action.payload;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.modalContent = null;
    },
    setLanguage: (state, action: PayloadAction<'en' | 'ne'>) => {
      state.language = action.payload;
    },
  },
});

export const { toggleSidebar, openModal, closeModal, setLanguage } = uiSlice.actions;

export default uiSlice.reducer; 