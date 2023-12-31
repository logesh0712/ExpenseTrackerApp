import {Text, View, StyleSheet, Alert } from 'react-native';
import {useState} from 'react';
import Input from './Input'
import CalendarUI from '../UI/CalendarUI';
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";

function ExpenseForm({onCancel, onSubmit, submitButtonLabel, defaultValues})
{
    const [inputValues, setInputValues] = useState({
        amount: {
            value: defaultValues? defaultValues.amount.toString(): '',
            //isValid: defaultValues? true: false
            isValid: true
        },
        date: {
            value: defaultValues? getFormattedDate(defaultValues.date): '',
            //isValid: defaultValues? true: false
            isValid : true
        },
        description: {
            value: defaultValues?defaultValues.description.toString(): '',
            //isValid: defaultValues? true: false
            isValid: true
        }
    });

    function inputChangedHandler(inputIdentifier, enteredValue)
    {
        setInputValues((curInputValues)=> {
            return {
                ...curInputValues,
                [inputIdentifier] : {'value': enteredValue, isValid: true}
            }
        });
    }

    function submitHandler()
    {
        const expenseData = {
            amount : +inputValues.amount.value,
            date: new Date(inputValues.date.value),
            description: inputValues.description.value
        }
        
        const isAmountValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const isDateValid = expenseData.date.toString() !== 'Invalid Date';
        const isDescriptionValid = expenseData.description.trim().length > 0;

        if (isAmountValid && isDateValid && isDescriptionValid)
        {
            onSubmit(expenseData);
        }
        else
        {
            //Alert.alert('Invalid input', 'Please check your input values');
            setInputValues((curInputValues)=> {
                return {
                    amount: {value: curInputValues.amount.value, isValid: isAmountValid},
                    date: {value: curInputValues.date.value, isValid: isDateValid},
                    description: {value: curInputValues.description.value, isValid: isDescriptionValid}
                }
            });
        }
    }

    const formIsInvalid = (!inputValues.amount.isValid || !inputValues.description.isValid || !inputValues.date.isValid);
    

    return (
        <View>
            <View>
                <Input 
                    label="Amount"
                    textInputConfig={{
                        keyboardType: 'decimal-pad',
                        onChangeText: inputChangedHandler.bind(this, 'amount'),
                        value: inputValues.amount.value
                    }}
                    isValid = {inputValues.amount.isValid}
                ></Input>

                <Input 
                    label="Date"
                    textInputConfig={{
                        placeholder: "YYYY-MM-DD",
                        placeholderTextColor: 'grey',
                        maxLength: 10,
                        onChangeText: inputChangedHandler.bind(this, 'date'),
                        value: inputValues.date.value
                    }}
                    isValid = {inputValues.date.isValid}
                ></Input>
            </View>
            <Input 
                label="Description"
                textInputConfig={{
                    multiline: true,
                    autocorrect: false, // default is true
                    onChangeText: inputChangedHandler.bind(this, 'description'),
                    value : inputValues.description.value
                }}
                isValid = {inputValues.description.isValid}
            ></Input>

        {
            formIsInvalid && (
                <Text style={styles.errorText}> Invalid Inputs</Text>
            )
        }

        <View style={styles.buttonsContainer}>
                <Button style={styles.button} mode="flat" onPress={onCancel}>
                    Cancel
                </Button>
                <Button style={styles.button} mode="flat" onPress={submitHandler}>
                    {submitButtonLabel}

                </Button>

            </View>

        </View>
    );
}

export default ExpenseForm;


const styles = StyleSheet.create({
    buttonsContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button:{
        minWidth: 120,
        marginHorizontal: 8
    },
    errorText:{
        textAlign: 'center',
        color:'red',
        margin: 8
    }
});