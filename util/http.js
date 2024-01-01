import axios from 'axios';

const BACKEND_URL = 'https://react-native-3e853-default-rtdb.firebaseio.com'

export async function storeExpense(expenseData)
{
    const response = await axios.post(
        BACKEND_URL + '/expenses.json',
        expenseData
    );
    //id
    const id = response.data.name;
    console.log("id from post " + id);
    return id;
}

// get is async one
export async function fetchExpenses()
{
    const response = await axios.get(BACKEND_URL + '/expenses.json');

    const expenses = [];

    for(const key in response.data)
    {
        const expenseObj = {
            id : key,
            amount : response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description
        }

        expenses.push(expenseObj);
    }

    return expenses;
}

export function updateExpenseDb(id, expenseData)
{
    // Template for update: /expenses/ID.json
    return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);

}

export function deleteExpenseDb(id)
{
    return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}
