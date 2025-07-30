import { create } from "zustand"

export const useErrorStore = create((set) => ({
  errorMessage: null,
  setErrorMessage: (error) => set({ errorMessage: error }),
  clearErrorMessage: () => set({ errorMessage: null })
}))