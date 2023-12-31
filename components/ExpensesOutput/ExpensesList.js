import { FlatList, StyleSheet, ScrollView } from "react-native";
import ExpenseItem from './ExpenseItem';

function renderExpenseItem(itemData)
{
    return (
        <ExpenseItem {...itemData.item}>

        </ExpenseItem>
    );
}

function ExpensesList({expenses})
{
    return (
        
            <FlatList
                data={expenses}
                renderItem={renderExpenseItem}
                keyExtractor={(item) => item.id}
            >

            </FlatList>
        
    );
}

export default ExpensesList;

const styles = StyleSheet.create({
    container:{
        //alignItems: 'center',
        //justifyContent: 'center',
        //borderBottomColor: 'grey',
        //borderBottomWidth: 2,
        marginHorizontal: 30,
        margin: 40,
        //flex: 1
    },
    text:{
        textAlign: 'center'
    }
});