import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../index'

// Define a type for the slice state
interface TasksState {
  formData: object,
  formDataState: number,
}

// Define the initial state using that type
const initialState: TasksState = {
  formData: {},
  formDataState: 0
}

export const tasksSlice = createSlice({
  name: 'tasks',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setFormData: (state, action: PayloadAction<object>) => {
      state.formData = action.payload;
      state.formDataState += 1;
    },
    clearFormData: (state, action: PayloadAction<object>) => {
      state.formData = {};
      state.formDataState += 1;
    }
  }
})

export const { setFormData, clearFormData } = tasksSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectFormData = (state: RootState) => state.tasks.formData
export const selectFormDataState = (state: RootState) => state.tasks.formDataState

export default tasksSlice.reducer
