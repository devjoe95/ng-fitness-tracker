import { createReducer, on } from '@ngrx/store';
import { endLoading, startLoading } from '../actions/ui.action';
import { initialState } from '../state';

export const uiReducer = createReducer(
  initialState,
  on(startLoading, (state) => {
    return { ...state, isLoading: true };
  }),
  on(endLoading, (state) => {
    return { ...state, isLoading: false };
  })
);
