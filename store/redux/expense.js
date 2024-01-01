import { createSlice } from '@reduxjs/toolkit';

/*
const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'A pair of shoes',
        amount: 4000,
        date: new Date('2023-12-02')
    },
    {
        id: 'e10',
        description: 'dhim dress',
        amount: 20000,
        date: new Date('2023-12-27')
    }
];
*/

const expenseSlice = createSlice({
    name: 'expenses',
    initialState: {
        expenseList: []
    },
    reducers: {
        addExpense: (state, action) => {
            state.expenseList.push(action.payload);
        },
        setExpenses: (state, action) => {
            const dataInDesc = action.payload.expenseListFromDb.reverse();
            state.expenseList = dataInDesc;
        },
        updateExpense: (state, action) => {
            state.expenseList.forEach(
                (curExpense) => {
                    if(curExpense.id == action.payload.id)
                    {
                        curExpense.amount = action.payload.amount;
                        curExpense.date = action.payload.date;
                        curExpense.description = action.payload.description;
                    } 
                }
            );

        },
        removeExpense: (state, action) => {
            state.expenseList.splice(state.expenseList.indexOf(action.payload.expenseId), 1);
        }
    }
});

export const addExpense = expenseSlice.actions.addExpense;
export const setExpenses = expenseSlice.actions.setExpenses;
export const updateExpense = expenseSlice.actions.updateExpense;
export const removeExpense = expenseSlice.actions.removeExpense;

//addExpense(DUMMY_EXPENSES[0]);
//addExpense(DUMMY_EXPENSES[1]);

export default expenseSlice.reducer;