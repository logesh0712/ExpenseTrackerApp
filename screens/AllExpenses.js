import { Text } from "react-native";
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useSelector } from 'react-redux';

function AllExpenses()
{
    const expenseList = useSelector((state) => state.expenses.expenseList);
    
    return (
        <ExpensesOutput expenses={expenseList} expensesPeriod="Total" fallbackText="No expenses">

        </ExpensesOutput>
    );
}

export default AllExpenses;
