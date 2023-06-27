import { createSlice } from '@reduxjs/toolkit';
import { PayoneerParser, PayoneerReport } from '@/report';

type ReportState = {
  report: PayoneerReport | null;
  currency: string | null,
};

const initialState: ReportState = {
  report: null,
  currency: null,
};

export const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    reset: () => initialState,
    createReport: (state, { payload }) => {
      state.report = (new PayoneerParser()).parse(payload);
    },
    setCurrency: (state, { payload }) => {
      state.currency = payload;
    },
  },
});

export const {
  setCurrency,
  createReport,
  reset,
} = reportSlice.actions;