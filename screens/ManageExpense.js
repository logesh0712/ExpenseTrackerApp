import { useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from '../constants/styles';

import ExpenseForm from '../components/ManageExpense/ExpenseForm';

// Redux:
import { useSelector, useDispatch } from 'react-redux';
import { addExpense, updateExpense, removeExpense } from '../store/redux/expense';

//NOTE
// If a component is loaded as a screen, then a property is sent by default by react-native.
// That is {route}
// Since it is screen component, we get navigation param as well.

function ManageExpense({route, navigation})
{
    const dispatch = useDispatch();
    
    const expenseId = route.params?.expenseId;

    // converting to boolean
    const isEditing = !!expenseId;
    
    useLayoutEffect(()=>{
        navigation.setOptions({
            title: (isEditing ? 'Edit expense' : 'Add expense')
        });
    },[navigation, isEditing]);

    var selectedExpense = undefined;
    if(isEditing)
    {
        const expenseList = useSelector((state)=> state.expenses.expenseList);
        selectedExpense = expenseList.find((expense) => expense.id === expenseId);
    }

    function deleteExpenseHandler()
    {
        dispatch(removeExpense(
            {
                'expenseId' : expenseId,
            }
        ));

        navigation.goBack();
    }

    function cancelHandler()
    {
        navigation.goBack();
    }

    function confirmHandler(expenseData)
    {
        if(isEditing)
        {
            expenseData['id'] = expenseId;
            dispatch(updateExpense(expenseData));
        }
        else
        {
            dispatch(addExpense(expenseData));
        }

        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            
            <ExpenseForm 
                submitButtonLabel={isEditing?"Update":"Add"} 
                onCancel={cancelHandler} 
                onSubmit={confirmHandler}
                defaultValues = {selectedExpense}
            >
            </ExpenseForm>

            

            {isEditing && (
                    <View style={styles.deleteContainer}>
                        <IconButton 
                            iconName="trash" 
                            size={25} 
                            color={GlobalStyles.colors.primary1}
                            onPress={deleteExpenseHandler}
                        ></IconButton>
                    </View>
                )
            }
        </View>
    );
}

export default ManageExpense;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 20,
        backgroundColor: GlobalStyles.colors.primary4
    },
    deleteContainer:{
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary1,
        alignItems: 'center'
    }
});