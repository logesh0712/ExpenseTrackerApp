import { Text, View, Pressable, StyleSheet, Image } from "react-native";
//NOTE - why useNavigation?
//NOTE - {navigation} prop is by default sent to all screen components.
//NOTE - But not to other components.
//NOTE - In order to use {navigation} from other components, below hook (useNavigation) should be used.
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";


function ExpenseItem({id, description, amount, date})
{
    const navigation = useNavigation();

    function expensePressHandler()
    {
        navigation.navigate('ManageExpense',{
            expenseId: id
        });
    }

    const imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg/800px-Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg';

    var dateField = getFormattedDate(new Date(date));
    
    return (
        <Pressable onPress={expensePressHandler} style={({pressed}) => pressed && styles.pressed}>
            <View style={styles.outerContainer}>
                <View style={styles.leftContainer}>
                    <Image source={{uri:imageUrl}} style={styles.image}></Image>
                </View>

                <View style={styles.middleContainer}>
                    <Text style={[styles.textBase, styles.description]}>{description}</Text>
                    <Text style={styles.textBase}>{dateField}</Text>
                </View>

                <View style={styles.rightContainer}>
                    <Text style={styles.amount}>{amount.toFixed(2)}</Text>
                </View>
            </View>
        </Pressable>
    );
}

export default ExpenseItem;

const styles = StyleSheet.create({
    pressed:{
        opacity: 0.75
    },
    outerContainer:{
        backgroundColor: GlobalStyles.colors.primary4,
        flexDirection: 'row',
        //Padding creates space 
        padding: 10,
        marginVertical: 3,
        justifyContent:'space-between',
        borderRadius: 5,
        elevation: 2,
        shadowColor: GlobalStyles.colors.primary1,
        shadowRadius: 1,
        shadowOffset: { width: 1, height: 1},
        shadowOpacity: 0.4
    },
    middleContainer:{
        //"flex: 1"Takes the space of all available
        flex: 1,
        marginHorizontal: 20
    },
    rightContainer:{
        paddingHorizontal: 10,
        paddingVertical: 4,
        //backgroundColor: 'red',
        //backgroundColor:'white',
        backgroundColor: GlobalStyles.colors.primary5,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 80
    },
    textBase:{
        color: 'black',
        //Below will only work if parent container's style has "flex:1"
        textAlign: 'left'

    },
    description:{
        fontSize: 18,
        marginBottom: 4,
        //fontWeight: 'bold',
    },
    amount:{
        //color: GlobalStyles.colors.primary1,
        color: 'black',
        //fontWeight: 'bold',
    },
    image:{
        width: 50,
        height: 50,
        borderRadius: 25
    }
});