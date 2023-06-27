import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { reportSlice } from './report-slice';

export const store = configureStore({
  reducer: { [reportSlice.name]: reportSlice.reducer },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * Selectors
 */
export const selectReport = (state: RootState) => state.report.report;
export const selectCurrencies = (state: RootState) => state.report.report?.getCurrencies() ?? [];
export const selectCurrency = (state: RootState) => state.report.currency;
