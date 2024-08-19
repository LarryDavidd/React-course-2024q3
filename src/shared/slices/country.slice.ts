import { createSlice } from '@reduxjs/toolkit';
import { COUNTRIES } from '../constants/constats';

const initialState = COUNTRIES;

const CountrySlice = createSlice({
  name: 'CountrySlice',
  initialState,
  reducers: {}
});

export default CountrySlice.reducer;
