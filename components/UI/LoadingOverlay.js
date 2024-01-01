import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

function LoadingOverlay(){
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={GlobalStyles.colors.primary1}></ActivityIndicator>
        </View>
    );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems : 'center',
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary5
    }
})