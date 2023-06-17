import {configureStore, Action} from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import sectorsReducer from './reducers/sectorsReducer';

export const store = configureStore({
    reducer: {
        sectors: sectorsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
