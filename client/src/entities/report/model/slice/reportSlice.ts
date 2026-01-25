import type { Reports } from '../types/Reports';
import type { ServerError } from '../../../../shared/types/ServerError';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { getReports } from '../thunks/getReports';
import { rejectReport } from '../thunks/rejectReport';
import { banPost } from '../thunks/banPost';
import { banUser } from '../thunks/banUser';

interface ReportState {
  reports: Reports | null;
  isLoading: boolean;
  error: ServerError | null;
}

const initialState: ReportState = {
  reports: null,
  isLoading: false,
  error: null,
};

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    clearReportError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getReports.pending, (state, _action) => {
      state.isLoading = true;
    });
    builder.addCase(
      getReports.fulfilled,
      (state, action: PayloadAction<Reports>) => {
        state.reports = action.payload;
        state.isLoading = false;
      },
    );
    builder.addCase(getReports.rejected, (state, _action) => {
      state.reports = null;
      state.isLoading = false;
    });

    builder.addCase(rejectReport.pending, (state, _action) => {
      state.isLoading = true;
    });
    builder.addCase(
      rejectReport.fulfilled,
      (state, action: PayloadAction<Reports>) => {
        state.reports = action.payload;
        state.isLoading = false;
      },
    );
    builder.addCase(rejectReport.rejected, (state, _action) => {
      state.reports = null;
      state.isLoading = false;
    });

    builder.addCase(banPost.pending, (state, _action) => {
      state.isLoading = true;
    });
    builder.addCase(
      banPost.fulfilled,
      (state, action: PayloadAction<Reports>) => {
        state.reports = action.payload;
        state.isLoading = false;
      },
    );
    builder.addCase(banPost.rejected, (state, _action) => {
      state.reports = null;
      state.isLoading = false;
    });

    builder.addCase(banUser.pending, (state, _action) => {
      state.isLoading = true;
    });
    builder.addCase(
      banUser.fulfilled,
      (state, action: PayloadAction<Reports>) => {
        state.reports = action.payload;
        state.isLoading = false;
      },
    );
    builder.addCase(banUser.rejected, (state, _action) => {
      state.reports = null;
      state.isLoading = false;
    });
  },
});

export const reportReducer = reportSlice.reducer;
export const { clearReportError } = reportSlice.actions;
