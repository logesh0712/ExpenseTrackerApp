import { Text, View, TextInput, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

function Input({label, textInputConfig, isValid}){
    const inputStyles = [styles.input];

    if (textInputConfig && textInputConfig.multiline)
    {
        inputStyles.push(styles.inputMultiLine);
    }

    return (
        <View style={styles.inputContainer}>
            <Text style={[styles.label, !isValid && styles.invalidLabel]}>{label}</Text>
            {/*<TextInput keyboardType={type} maxLength={maxLength}> </TextInput>*/}
            <TextInput style={[inputStyles, !isValid && styles.invalidInput]} {...textInputConfig}></TextInput>
        </View>
    );
}

export default Input;

const styles = StyleSheet.create({
    inputContainer:{
        marginHorizontal: 4,
        marginVertical: 8,
    },
    label:{
        fontSize: 12,
        color: GlobalStyles.colors.primary1,
        marginBottom: 4,
        fontWeight: 'bold'
    },
    input:{
        backgroundColor: GlobalStyles.colors.primary5,
        padding: 4,
        borderRadius: 6,
        fontSize: 18,
        color: GlobalStyles.colors.primary1,
    },
    inputMultiLine:{
        minHeight: 100,
        textAlignVertical: 'top'
    },
    invalidLabel:{
        color: '#b03030'
    },
    invalidInput:{
        backgroundColor: '#e3c1c1'
    }
});