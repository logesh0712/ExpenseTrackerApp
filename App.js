import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native';

// Navigators
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Icons
import { Ionicons } from '@expo/vector-icons';

// Components
import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import { GlobalStyles } from './constants/styles';
import IconButton from './components/UI/IconButton';
import PropertyScreen from './screens/PropertyScreen';

// Redux
import { Provider } from 'react-redux';
import {store} from './store/redux/store';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const CustomTabButton = (props) => (
  <TouchableOpacity
    {...props}
    style={
      props.accessibilityState.selected
        ? [props.style, { borderTopColor: GlobalStyles.colors.primary1, borderTopWidth: 3 }]
        : props.style
    }
  />
);

function ExpensesOverview(){
  return (
    <BottomTabs.Navigator
      screenOptions={({navigation})=>({
        headerStyle: {backgroundColor: GlobalStyles.colors.primary1},
        headerTintColor: 'white',
        //tabBarStyle: {borderTopWidth: 2},
        //tabBarSelectedItemStyle:{borderBottomWidth: 2,borderBottomColor: 'red'},
        tabBarActiveTintColor: GlobalStyles.colors.primary1,
        //tabBarActiveBackgroundColor : GlobalStyles.colors.primary1,
        tabBarInactiveTintColor: 'grey',
        headerRight: ({tintColor}) => (
          <IconButton iconName="add" size={25} color={tintColor} onPress={() => {navigation.navigate('ManageExpense')}}>
          </IconButton>
        ),
        headerLeft: ({tintColor}) => (
          <IconButton iconName="ellipsis-vertical-sharp" size={25} color={tintColor} onPress={() => {navigation.navigate('Properties')}}>
          </IconButton>
        ),
      })}
    >
      <BottomTabs.Screen 
        name="RecentExpenses" 
        component={RecentExpenses}
        options={{
          title:'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarButton: CustomTabButton,
          tabBarIcon: ({color, size}) => <Ionicons name="hourglass" size={size} color={color}></Ionicons>
        }}
      >
      </BottomTabs.Screen>

      <BottomTabs.Screen 
        name="AllExpenses" 
        component={AllExpenses}
        options={{
          title:'All Expenses',
          tabBarLabel: 'All',
          tabBarButton: CustomTabButton,
          tabBarIcon: ({color, size}) => <Ionicons name="calendar" size={size} color={color}></Ionicons>
        }}
      >
      </BottomTabs.Screen>

      


    </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />

      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator 
            screenOptions={{
              headerStyle: {backgroundColor: GlobalStyles.colors.primary1},
              headerTintColor: 'white'
            }}
          >
            
            <Stack.Screen 
              name="ExpensesOverview" 
              component={ExpensesOverview}
              options={{headerShown: false}}
            >
            </Stack.Screen>
            
            <Stack.Screen 
              name="ManageExpense" 
              component={ManageExpense}
              options={{
                //NOTE -  Only for IOS
                presentation: 'modal'
              }}
            >
            </Stack.Screen>

            <Stack.Screen name="Properties" component={PropertyScreen}>
            </Stack.Screen>

          </Stack.Navigator>
        </NavigationContainer>
        </Provider>
    </>
  );
}

