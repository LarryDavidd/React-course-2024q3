import { fillFormState } from '@/pages/ReactHookForms/model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  ReactHookForms: fillFormState[];
};

const initialState: initialStateType = {
  ReactHookForms: []
};

const formsSlice = createSlice({
  name: 'MainPageSlice',
  initialState,
  reducers: {
    setReactHookForm: (
      state,
      action: PayloadAction<{
        newForm: fillFormState;
      }>
    ) => {
      const { newForm } = action.payload;
      state.ReactHookForms.push(newForm);
    }
  }
});

export const { setReactHookForm } = formsSlice.actions;

export default formsSlice.reducer;
