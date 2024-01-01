import {useState} from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useSelector } from 'react-redux';
import { getDateMinusDays, getFormattedDate} from '../util/date';
import { useEffect } from 'react';
import { fetchExpenses } from '../util/http';

//Redux:
import { useDispatch } from 'react-redux';
import { setExpenses } from '../store/redux/expense';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

function RecentExpenses()
{
    const[isFetching, seIsFetching] = useState(true);
    const[error,setError] = useState(null);

    const dispatch = useDispatch();

    const expenseListFromRedux = useSelector((state) => state.expenses.expenseList);
    
    // This method is executed only once when the page is loaded for first time.
    // In stack navigator when you open an another page, this page is currently not destroyed.
    // So when you come back to this page, old state is only available.
    // So we should update in redux context as well.
    useEffect(() => {
        async function getExpenses(){
            seIsFetching(true);
            try
            {
                const expensesFromDb = await fetchExpenses();
                
                // Add to local context in Redux
                var data = {
                    expenseListFromDb: expensesFromDb
                };
                dispatch(setExpenses(data));
            }
            catch(error){
                setError('Failed to fetch expenses. Error: ' + error.message);
            }
            
            seIsFetching(false);
        }

        getExpenses();
    }, []);

    const recentExpenses = expenseListFromRedux.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getFormattedDate(getDateMinusDays(today, 7));

        var dateField = getFormattedDate(new Date(expense.date));
        
        return dateField > date7DaysAgo;
    });

    function errorHandler()
    {
        setError(null);
    }

    if (error && !isFetching)
    {
        return (
            <ErrorOverlay message={error} onConfirm={errorHandler}></ErrorOverlay>
        );
    }

    if (isFetching)
    {
        return (
            <LoadingOverlay></LoadingOverlay>
        );
    }

    return (
        <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 days" fallbackText="No recent expenses">

        </ExpensesOutput>
    );
}

export default RecentExpenses;
