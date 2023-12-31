import { Text, View, StyleSheet} from 'react-native';
import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';
import { GlobalStyles } from '../../constants/styles';
import expense from '../../store/redux/expense';

// Redux


function ExpensesOutput({expenses, expensesPeriod, fallbackText})
{
    let content = <Text style={styles.infoText}> {fallbackText} </Text>;

    if(expenses.length > 0)
    {
        content = <ExpensesList expenses={expenses}></ExpensesList>;
    }

    return (
        <View style={styles.container}>
            <ExpensesSummary expenses={expenses} periodName={expensesPeriod}></ExpensesSummary>

            {content}
        </View>
    );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
    container:{
        //padding: 10,
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 0,
        backgroundColor: GlobalStyles.colors.primary5,
    },
    infoText:{
        color: GlobalStyles.colors.primary1,
        fontSize: 16,
        textAlign: 'center',
        margin: 10
    }
});