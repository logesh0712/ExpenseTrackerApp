import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useSelector } from 'react-redux';
import { getDateMinusDays, getFormattedDate} from '../util/date';

function RecentExpenses()
{
    const expenseList = useSelector((state) => state.expenses.expenseList);

    const recentExpenses = expenseList.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getFormattedDate(getDateMinusDays(today, 7));

        var dateField = getFormattedDate(new Date(expense.date));
        
        return dateField > date7DaysAgo;
    });

    return (
        <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 days" fallbackText="No recent expenses">

        </ExpensesOutput>
    );
}

export default RecentExpenses;
