import { configureStore } from '@reduxjs/toolkit';

import expenseReducer from './expense';

export const store = configureStore({
    reducer: {
        expenses : expenseReducer
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});