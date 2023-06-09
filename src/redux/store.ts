import {configureStore, Action} from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import productsReducer from './reducers/productsReducer';
import sectorsReducer from './reducers/sectorsReducer';

export const store = configureStore({
    reducer: {
        products: productsReducer,
        sectors: sectorsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
