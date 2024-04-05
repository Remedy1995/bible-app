import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import RegisterCustomer from './screens/RegisterCustomer';
import { StyleSheet, Text, View } from 'react-native';
import AuthLogin from './screens/Authentication/AuthLogin';
import RequestedWithdrawals from './screens/RequestedWithDrawals';
import VerificationPhone from './screens/Authentication/VerificationPhone';
import UploadImage from './screens/UploadImage';
import Hello from './screens/Hello';
import UserDeposit from './screens/UserDeposit';
import VerificationCode from './screens/Authentication/VerificationCode';
import Home from './screens/Home';
import CustomerDashboard from './screens/CustomerDashboard';
// import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Deposit from './screens/Deposit';
import Settings from './screens/Settings';
import Activity from './screens/Activity';
import Customers from './screens/Customers';
import Admin from './screens/Admin';
import Colors from './util/Color';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AdminDashboard from './screens/AdminDashboard';
import store from './redux/store';
import ActivityDetailPage from './screens/ActivityDetailPage';
import CustomerDetailPage from './screens/CustomerDetailPage';
import Withdrawal from './screens/Withdrawal';
import { useDispatch, useSelector } from "react-redux";
// import { useSelector } from "react-redux";

export default function App() {

  // console.log('the uathenticated user is', data);
  const Drawer = createDrawerNavigator();
  const Stack = createNativeStackNavigator();
  const isAdmin = true;


  function CustomerDrawer() {
    return (
      <Drawer.Navigator screenOptions={{
        headerStyle: { backgroundColor: Colors.primaryColor800 },
        headerTintColor: Colors.primaryColor400,
        // sceneContainerStyle: {backgroundColor: Colors.primaryColor100},
        drawerContentStyle: { backgroundColor: Colors.primaryColor800 },
        drawerInactiveTintColor: 'white',
        drawerActiveTintColor: 'black',
        drawerActiveBackgroundColor: Colors.primaryColor400,

      }}>
        <Drawer.Screen name='CustomerDashboard' component={CustomerDashboard} options={{
          headerShown: true, headerTitleAlign: "center",
          title: 'Customer Dashboard', drawerIcon: ({ color, size }) => (<Ionicons name="list" color={color} size={size} />)
        }} />
        {/* <Drawer.Screen name='Register Customer' component={RegisterCustomer} options={{
          title: 'Customer Registration',
          drawerIcon: ({ color, size }) => (<Ionicons name="star" color={color} size={size} />)
        }} /> */}

        <Drawer.Screen name='Deposit Screen' component={UserDeposit} options={{
          title: 'Deposit',
          drawerIcon: ({ color, size }) => (<Ionicons name="star" color={color} size={size} />)

        }} />
        <Drawer.Screen name='Withdrawal Screen' component={Withdrawal} options={{
          title: 'Withdrawal',
          drawerIcon: ({ color, size }) => (<Ionicons name="star" color={color} size={size} />)

        }} />
        {/* <Drawer.Screen name='Customers Screen' component={Customers} options={{
          title: 'Customers',
          drawerIcon: ({ color, size }) => (<Ionicons name="star" color={color} size={size} />)

        }} /> */}
      </Drawer.Navigator>
    );
  }

  function AdminDrawer() {
    return (
      <Drawer.Navigator screenOptions={{
        headerStyle: { backgroundColor: Colors.primaryColor800 },
        headerTintColor: Colors.primaryColor400,
        // sceneContainerStyle: {backgroundColor: Colors.primaryColor100},
        drawerContentStyle: { backgroundColor: Colors.primaryColor800 },
        drawerInactiveTintColor: 'white',
        drawerActiveTintColor: 'black',
        drawerActiveBackgroundColor: Colors.primaryColor400,

      }}>
        <Drawer.Screen name='AdminDashboard' component={AdminDashboard} options={{
          headerTitleAlign: "center",
          title: 'Admin Dashboard', drawerIcon: ({ color, size }) => (<Ionicons name="list" color={color} size={size} />)
        }} />
        <Drawer.Screen name='Register Customer' component={RegisterCustomer} options={{
          title: 'Customer Registration',
          drawerIcon: ({ color, size }) => (<Ionicons name="star" color={color} size={size} />)
        }} />

        <Drawer.Screen name='Deposit Screen' component={Deposit} options={{
          title: 'Deposit',
          drawerIcon: ({ color, size }) => (<Ionicons name="star" color={color} size={size} />)

        }} />
         <Drawer.Screen name='Withdrawal Screen' component={Withdrawal} options={{
          title: 'Withdrawal',
          drawerIcon: ({ color, size }) => (<Ionicons name="star" color={color} size={size} />)

         }} /> 
        <Drawer.Screen name='Requested Withdrawal Screen' component={RequestedWithdrawals} options={{
          title: 'Requested Withdrawals',
          drawerIcon: ({ color, size }) => (<Ionicons name="star" color={color} size={size} />)

        }} />


        <Drawer.Screen name='Customers Screen' component={Customers} options={{
          title: 'Customers',
          drawerIcon: ({ color, size }) => (<Ionicons name="star" color={color} size={size} />)

        }} />
      </Drawer.Navigator>
    );
  }



  const BottomTab = createBottomTabNavigator();

  const CustomerTabs = () => {
    return (
      <BottomTab.Navigator initialRouteName='Home'
        screenOptions={{
          headerStyle: { backgroundColor: Colors.primaryColor800 },
          headerTintColor: 'white',
          tabBarActiveTintColor: Colors.primaryColor100,
          tabBarInactiveTintColor: Colors.primaryColor400,
          tabBarHideOnKeyboard: false,
          tabBarLabelStyle: {
            fontSize: 12,
            marginBottom: 4,
            fontWeight: '600'
          },
          tabBarStyle: {
            height: 70,
            backgroundColor: Colors.primaryColor800,
          },
          drawerStyle: {
            backgroundColor: 'blue',
          }
        }} >
        <BottomTab.Screen name='Home' component={CustomerDrawer} options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (<AntDesign name='home' size={30} color={color} />)
        }} />
        <BottomTab.Screen name='Activity' component={Activity} options={{
          headerShown: true,
          tabBarIcon: ({ color }) => (<Feather name='activity' size={30} color={color} />)
        }} />
        <BottomTab.Screen name='Settings' component={Settings} options={{
          headerShown: true,
          tabBarIcon: ({ color }) => (<Ionicons name='settings' size={30} color={color} />)
        }} />
      </BottomTab.Navigator>
    )
  }





  const AdminTabs = () => {
    return (
      <BottomTab.Navigator initialRouteName='Home'
        screenOptions={{
          headerStyle: { backgroundColor: Colors.primaryColor300 },
          headerTintColor: Colors.primaryColor400,
          tabBarActiveTintColor: Colors.primaryColor100,
          tabBarInactiveTintColor: Colors.primaryColor400,
          tabBarHideOnKeyboard: false,
          tabBarLabelStyle: {
            fontSize: 12,
            marginBottom: 4,
            fontWeight: '600'
          },
          tabBarStyle: {
            height: 70,
            backgroundColor: Colors.primaryColor800,
          },
          drawerStyle: {
            backgroundColor: 'blue',
          }
        }} >
        <BottomTab.Screen name='Home' component={AdminDrawer} options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (<AntDesign name='home' size={30} color={color} />)
        }} />
        <BottomTab.Screen name='Activity' component={Activity} options={{
          headerShown: true,
          tabBarIcon: ({ color }) => (<Feather name='activity' size={30} color={color} />)
        }} /> 
         <BottomTab.Screen name='Settings' component={Settings} options={{
          headerShown: true,
          tabBarIcon: ({ color }) => (<Ionicons name='settings' size={30} color={color} />)
        }} />
        {/* <BottomTab.Screen name='Settings' component={Settings} options={{
          headerShown: true,
          tabBarIcon: ({ color }) => (<Ionicons name='settings' size={30} color={color} />)
        }} /> */}
      </BottomTab.Navigator>
    )
  }




  //this function will redirect the user to a role type of screen based on the user logged in
  function RoleScreen() {
    const authenticatedData = useSelector((state) => state?.Allusers?.authenticated);
    const RedirectScreen = authenticatedData && authenticatedData?.map((data) => data.role).includes("customer");
    //by default redirect to the customer screen else redirect to the admin screen
    return RedirectScreen ? <CustomerStackScreen /> : <AdminStackScreen />;
  }

  //this function will redirect the user to the rolescreen if there has been a successful login 
  function AuthenticatedScreen() {
    const authenticatedData = useSelector((state) => state?.Allusers?.authenticated);
    const authenticated = useSelector((state) => state?.Allusers?.authenticated);
    return authenticated && authenticated?.length < 1 ? <AuthLogin /> : <RoleScreen />;
  }

  function CustomerStackScreen() {
    return (<Stack.Navigator>
      <Stack.Screen name='HomeScreen' options={{
        headerShown: false
      }} component={CustomerTabs} />
      <Stack.Screen name="Customer Details" component={CustomerDetailPage} options={{
        headerStyle: {
          backgroundColor: Colors.primaryColor800,
        },
        headerTitleStyle: {
          color: 'white'
        }
      }} />
      <Stack.Screen name="Activity Details" component={ActivityDetailPage} options={{
        headerStyle: {
          backgroundColor: Colors.primaryColor800,
        },
        headerTitleStyle: {
          color: 'white'
        }
      }} />

      <Stack.Screen name="Verification" component={VerificationCode} options={{
        headerStyle: {
          backgroundColor: Colors.primaryColor800,
        },
        headerTitleStyle: {
          color: 'white'
        }
      }} />
    </Stack.Navigator>)


  }

  const AdminStackScreen = () => {
    return (<Stack.Navigator>
      <Stack.Screen name='HomeScreen' options={{
        headerShown: false
      }} component={AdminTabs} />
      <Stack.Screen name="Customer Details" component={CustomerDetailPage} options={{
        headerStyle: {
          backgroundColor: Colors.primaryColor800,
        },
        headerTitleStyle: {
          color: 'white'
        }
      }} />
      <Stack.Screen name="Activity Details" component={ActivityDetailPage} options={{

        headerStyle: {
          backgroundColor: Colors.primaryColor800,
        }
        ,
        headerTitleStyle: {
          color: 'white'
        }
      }} />
      <Stack.Screen name="VerificationPhone" component={VerificationPhone} options={{
        headerShown: true,
        title: 'Verification',
        headerStyle: {
          backgroundColor: Colors.primaryColor800,
        },
        headerTitleStyle: {
          color: 'white'
        }
      }} />

      <Stack.Screen name="UploadImage" component={UploadImage} options={{
        headerStyle: {
          backgroundColor: Colors.primaryColor800,
        },
        headerTitleStyle: {
          color: 'white'
        }
      }} />
    </Stack.Navigator>
    )
  }

  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <StatusBar style='dark' />
          <AuthenticatedScreen />
          {/* <UploadImage/> */}
          {/* <AdminStackScreen/> */}
          {/* <AdminStackScreen/> */}
          {/* <AdminDashboard/> */}
          {/* <Withdrawal/> */}
        </NavigationContainer>
      </Provider>
      {/* <Toast /> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

