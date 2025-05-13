/* eslint-disable no-unused-vars */
import { create } from 'zustand';

import { ModalContentsType } from '@Constants/modalContent';

interface CommonState {
  showModal: boolean;
  modalContent: ModalContentsType;
  toggleModal: (payload?: ModalContentsType) => void;
  setModalContent: (payload: ModalContentsType) => void;
}

const initialState: CommonState = {
  showModal: false,
  modalContent: null,
  toggleModal: () => {},
  setModalContent: () => {},
};

export const useCommonStore = create<CommonState>()(set => ({
  ...initialState,
  toggleModal: payload =>
    set(state => ({
      showModal: !!payload,
      modalContent: payload || state.modalContent,
    })),
  setModalContent: payload => set(() => ({ modalContent: payload || null })),
}));
