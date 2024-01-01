import {useState} from 'react';
import { useContext, useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from '../constants/styles';

import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

// Redux:
import { useSelector, useDispatch } from 'react-redux';
import { addExpense, updateExpense, removeExpense } from '../store/redux/expense';

//http
import {storeExpense, updateExpenseDb, deleteExpenseDb} from '../util/http';


//NOTE
// If a component is loaded as a screen, then a property is sent by default by react-native.
// That is {route}
// Since it is screen component, we get navigation param as well.

function ManageExpense({route, navigation})
{
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error,setError] = useState(null);
    const [formDataIfError, setFormDataIfError] = useState(undefined);
    //const [selectedExpense, setSelectedExpense] = useState(undefined);

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
        //setSelectedExpense(expenseList.find((expense) => expense.id === expenseId));
        selectedExpense = expenseList.find((expense) => expense.id === expenseId);
    }

    if(!isEditing && formDataIfError)
    {
        selectedExpense = formDataIfError;
    }

    async function deleteExpenseHandler()
    {
        setIsSubmitting(true);

        try
        {
            console.log("In delete " + expenseId);
            await deleteExpenseDb(expenseId);

            console.log("In delete done" + expenseId);
            dispatch(removeExpense(
                {
                    'expenseId' : expenseId,
                }
            ));
            navigation.goBack();
        }
        catch(error)
        {
            setError("Failed to delete the expense. Error: " + error.message);
        }

        setIsSubmitting(false);
    }

    function cancelHandler()
    {
        navigation.goBack();
    }

    async function confirmHandler(expenseDataInput)
    {
        setIsSubmitting(true);
        try
        {
            if(isEditing)
            {
                await updateExpenseDb(expenseId, expenseDataInput);
                // Dont send id to db. Instead send id to redux.
                expenseDataInput['id'] = expenseId;
                dispatch(updateExpense(expenseDataInput));
            }
            else
            {
                setFormDataIfError(expenseDataInput);
                const idResp = await storeExpense(expenseDataInput);
                const expenseDataInputWithId = {...expenseDataInput, 'id': idResp};
                dispatch(addExpense(expenseDataInputWithId));
                setFormDataIfError(undefined);
            }
            navigation.goBack();
        }
        catch(error)
        {
            setError("Failed to Add/Update expense. Error: " + error.message);
        }

        setIsSubmitting(false);
    }

    function errorHandler()
    {
        setError(null);
    }

    if (error && !isSubmitting)
    {
        return (
            <ErrorOverlay message={error} onConfirm={errorHandler}></ErrorOverlay>
        );
    }

    if (isSubmitting)
    {
        return (
            <LoadingOverlay></LoadingOverlay>
        );
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