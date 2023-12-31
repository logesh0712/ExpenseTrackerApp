import {View, Text, StyleSheet} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { GlobalStyles } from '../../constants/styles';

function ExpensesSummary({expenses, periodName})
{
    // Reduce will combine single value of an array
    const expenseSum = expenses.reduce((sum, expense) => {
        return sum + expense.amount;
    }, 0 // Initial value of sum which is passed initially
    );

    return (
        <View style={styles.container}>
            <Text style={styles.period}>
                {periodName}
            </Text>

            <Text style={styles.sum}>
                {expenseSum.toFixed(2)} /-Inr
            </Text>
        </View>
    );
}

export default ExpensesSummary;

const styles = StyleSheet.create({
    container:{
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary2,
        borderRadius : 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        
        //borderBottomColor: 'grey',
        //borderBottomWidth: 2,
        //marginHorizontal: 30,
        //margin: 10,
        //padding: 8,
        //backgroundColor: '',
        
        
        
    },
    period:{
        fontSize: 14,
        color: 'white'
    },
    sum:{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    }
});