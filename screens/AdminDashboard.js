
import * as  React from 'react';
import { Text, View, StyleSheet, ImageBackground, Platform, FlatList, Pressable } from "react-native";
// import FormButton from '../components/FormButton';
// import FlatListHeader from "../components/FlatListHeader";
import { Images } from '../imagesData';
import Colors from "../util/Color";
import { Ionicons } from "@expo/vector-icons";
import Carousel from 'react-native-reanimated-carousel';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
// import { data } from "../data";
import { Feather } from "@expo/vector-icons";
import {  useState } from "react";
import Title from "../components/Title";
import PageGradient from "../components/PageGradient";
import Card from "../components/TopCard";
// import DataCard from "../components/DataCard";
// import RenderFlatList from "../components/RenderFlatList";
// import MiddleCard from "../components/MiddleCard";
// import SliceData from "../util/helpers/SliceData";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomModal from '../components/CustomModal';
// import { TouchableOpacity } from "react-native-gesture-handler";
import { logoutUser } from '../redux/Reducers/Users';
import { useDispatch, useSelector } from 'react-redux';
// import CustomerDashboard from './CustomerDashboard';
import CustomDialogBox from '../components/CustomDialogBox';
import { UserNameHooks } from '../Hooks/Hooks';
import { AllTransactionHooks, UpdateAdminBalanceHooks } from '../Hooks/Hooks';
import { Image } from 'react-native';
const AdminDashboard = ({navigation}) => {
    const {  getUserName, fetchSpecificUserData } = UserNameHooks();
    const { AllTransactions } = AllTransactionHooks();
    // const allUsers = useSelector((state) => state.Allusers.registerUsers);

    const AllDepositsMade = AllTransactions && AllTransactions[0]?.filter((data) => data?.transactiondetails?.split(' ').includes('deposited')).map((data) => data?.amount);
    console.log('All Deposits that has been made', AllDepositsMade);

    const AllWithdrawalsMade = AllTransactions && AllTransactions[0]?.filter((data) => !data?.transactiondetails?.split(' ').includes('deposited')).map((data) => data?.amount);
    console.log('all withdrawals', AllWithdrawalsMade);

    const sumOfAllDepositsMade = AllDepositsMade?.reduce((a, b) => a + b, 0);
    const sumOfAllWithdrawalsMade = AllWithdrawalsMade?.reduce((a, b) => a + b, 0);
    console.log('all sum Deposits', sumOfAllDepositsMade);
    console.log('all withdrawals made', sumOfAllWithdrawalsMade);

    //checking currentBalance 
    const currentBalance = sumOfAllDepositsMade - sumOfAllWithdrawalsMade;

    console.log('current', currentBalance?.toLocaleString())

    const { currentAdminBalance } = UpdateAdminBalanceHooks();

    console.log('my ccc', currentAdminBalance)

    const dispatch = useDispatch();
    // const navigation = useNavigation();
    const [showModal, setModal] = useState(false);

    const showCustomModal = () => {
        setModal(!showModal);
    }
    React.useLayoutEffect(() => {
        navigation?.setOptions({
            headerRight: () => (
                <Pressable onPress={showCustomModal}>
                    <FontAwesome name="sign-out" size={26} color={Colors.primaryColor400} style={{ left: -30 }} />
                </Pressable>)
        });

        console.log('hello')
    }, [navigation])


    
    const width = Dimensions.get('window').width;

    const logOutUser = () => {
        dispatch(logoutUser());
    }


    return <PageGradient>
        <CustomModal modalOpen={showModal} setModalOpen={setModal} >
            <CustomDialogBox LeftButtonText="No" RightButtonText="Yes"
                queryText="Do you Wish to logout?"
                leftButtonHandler={() => setModal(!showModal)} rightButtonHandler={logOutUser} addtionalStyle={{ width: width <= 360 ? 320 : 370 }} />
        </CustomModal>
        {/* <ImageBackground imageStyle={styles.imageStyle} source={require('../assets/money.jpg')} resizeMode='cover'
            style={styles.rootScreen}> */}
        <Card style={{ top: -30, backgroundColor: Colors.primaryColor800, left: -1 }}>
            <View style={styles.InnerFirstText}>
                <Title style={{ color: Colors.primaryColor400 }}>Dashboard</Title>
                {/* <Image style={styles.image} source={require('../assets/money.jpg')} /> */}
                <View style={[styles.notification, { left: width > 360 ? -10 : -40 }]}>
                    <Ionicons name="notifications" size={30} color={Colors.primaryColor800} />
                </View>
            </View>
            <Text style={styles.welcomeText}>Hi,
            {
                fetchSpecificUserData && getUserName?.length > 0 ? getUserName : "Loading"} </Text>
            <View style={styles.balanceText}>
                <Text style={styles.current}>Current Balance</Text>
                <View style={styles.hideAmount}>
                    <Text style={styles.currentAmount}>
                        {/* {"GHS" + currentBalance?.toLocaleString()} */}
                        {isNaN(currentAdminBalance) ? "Loading..." : currentAdminBalance}
                    </Text>
                    <FontAwesome name="eye" size={35} color={Colors.primaryColor400} style={[styles.eyes, { position: 'absolute', right: width > 360 ? 35 : 40 }]} />
                </View>
            </View>
        </Card>


        <View style={[styles.transaction, { left: -1, top: -30 }]}>

            <View style={styles.eachtransaction}>
                <Pressable style={({ pressed }) => [styles.transactionPress, pressed ? styles.buttonPress : null]} android_ripple={{ color: Colors.primaryColor900 }}>
                    <MaterialIcons name="send-to-mobile" size={35} color={Colors.primaryColor400} style={styles.icon} />
                    <Text style={styles.transactioninfo}>Customers</Text>
                </Pressable>
            </View>

            {/* <View style={styles.eachtransaction}>
    <Pressable android_ripple={{ color: Colors.primaryColor900 }} style={({ pressed }) => [styles.transactionPress, pressed ? styles.buttonPress : null]}>
        <MaterialIcons name="mobile-friendly" size={35} color={Colors.primaryColor400} style={styles.icon} />
        <Text style={styles.transactioninfo}>Recieve</Text>
    </Pressable>
</View> */}


            <View style={styles.eachtransaction}>
                <Pressable android_ripple={{ color: Colors.primaryColor900 }} style={({ pressed }) => [styles.transactionPress, pressed ? styles.buttonPress : null]}>
                    <Entypo name="cycle" size={35} color={Colors.primaryColor400} style={styles.icon} />
                    <Text style={styles.transactioninfo}>  Deposits</Text>
                </Pressable>
            </View>
            <View style={styles.eachtransaction}>
                <Pressable android_ripple={{ color: Colors.primaryColor900 }} style={({ pressed }) => [styles.transactionPress, pressed ? styles.buttonPress : null]}>
                    <Feather name="activity" size={35} color={Colors.primaryColor400} style={styles.icon} />
                    <Text style={styles.transactioninfo}>Withdrawals</Text>
                </Pressable>
            </View>

        </View>


        <Carousel loop width={360} height={450} style={{ margin: 20, top: -40, borderRadius: 10 }}
            autoPlay={true} data={Images} scrollAnimationDuration={1000}
            onSnapToItem={(item) => console.log('index', item)}

            renderItem={({ item }) => (
                <View style={{
                    borderWidth: 0,
                    justifyContent: 'center'
                }}>

                    <Image source={{ uri: item["url"] }} style={{ width: width, height: 330 }} />

                    <Text style={{
                        backgroundColor: 'white', zIndex: 100, position: 'absolute', left: 50, fontSize: 20, color: Colors.primaryColor800, padding: 20, borderRadius: 10,
                        fontWeight: 'bold'
                    }}>{item["text"]}</Text>{ }
                </View>


            )} />





        {/* <View style={[styles.transaction, { left: -1 ,top : -80}]}>

<View style={styles.eachtransaction}>
    <Pressable style={({ pressed }) => [styles.transactionPress, pressed ? styles.buttonPress : null]} android_ripple={{ color: Colors.primaryColor900 }}>
        <MaterialIcons name="send-to-mobile" size={35} color={Colors.primaryColor400} style={styles.icon} />
        <Text style={styles.transactioninfo}>Agents</Text>
    </Pressable>
</View>
<View style={styles.eachtransaction}>
    <Pressable android_ripple={{ color: Colors.primaryColor900 }} style={({ pressed }) => [styles.transactionPress, pressed ? styles.buttonPress : null]}>
        <Entypo name="cycle" size={35} color={Colors.primaryColor400} style={styles.icon} />
        <Text style={styles.transactioninfo} numberOfLines={1}>Commissions</Text>
    </Pressable>
</View>
<View style={styles.eachtransaction}>
    <Pressable android_ripple={{ color: Colors.primaryColor900 }} style={({ pressed }) => [styles.transactionPress, pressed ? styles.buttonPress : null]}>
        <Feather name="activity" size={35} color={Colors.primaryColor400} style={styles.icon} />
        <Text style={styles.transactioninfo}>Others</Text>
    </Pressable>
</View>

</View> */}


        {/* <MiddleCard isDashboard={false} style={[styles.middleCardStyle, { width: width > 360 ? 365 : 315, left: 9, bottom: 25 }]} >
            <FlatListHeader subHeader="Transactions" subHeaderActive="Recent" />
          
            <FlatList data={SliceData(data)} renderItem={(item) => RenderFlatList(item)} keyExtractor={(item) => item.id} /> */}

        {/* </MiddleCard> */}

    </PageGradient>


}

export default AdminDashboard;

const styles = StyleSheet.create({
    headerStyle: {
        height: 200
    },
    imageStyle: {
        opacity: 0.3
    },
    InnerFirstText: {
        flexDirection: 'row'
    },
    welcomeText: {
        color: Colors.primaryColor400,
        fontSize: 32,
        fontWeight: 'bold',
        margin: 0,
        paddingTop: 0,
        marginLeft: 20,
        top: -10
        // textShadowColor: 'rgba(25,11,123,0.5)',
        // textShadowOffset: { width: 1, height: 1 },
        // textShadowRadius: 3,
    },
    balanceText: {
        marginLeft: 20
    },
    currentAmount: {
        fontSize: 30,
        color: Colors.primaryColor400,
        fontWeight: 'bold',
        lineHeight: 50,
        // textShadowColor: 'rgba(25,11,123,0.5)',
        // textShadowOffset: { width: 1, height: 1 },
        // textShadowRadius: 1,
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginLeft: 130,
        marginTop: 18,

    },
    transaction: {
        flexDirection: 'row',
        margin: 1,
        minHeight: 100,
        marginTop: 10,
        // backgroundColor: Colors.primaryColor400,
        marginHorizontal: 20,
        borderRadius: 12,
        // elevation: 4,
        // shadowColor: 'black',
        // shadowOffset: { width: 10, height: 10 },
        // shadowRadius: 6,
        shadowOpacity: 0.3,
        overflow: Platform.OS === "android" ? "hidden" : " visible",
        bottom: 30

    },
    eachtransaction: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primaryColor800,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 3,
        marginTop: 5,
        borderRadius: 10,
        borderColor: Colors.primaryColor400,
        borderWidth: 3,
        elevation: 4,
        shadowColor: 'green',
        shadowOffset: { width: 10, height: 20 },
        shadowRadius: 6,
        shadowOpacity: 0.25,
        overflow: Platform.OS === "android" ? "hidden" : " visible",
        height: 110
    }
    ,
    notification: {
        marginTop: 18,
        marginLeft: 200,
        backgroundColor: Colors.primaryColor400,
        width: 40,
        height: 40,
        borderRadius: 20,
        marginStart: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    hideAmount: {
        flexDirection: 'row'
    },
    eyes: {
        marginLeft: 135,
        marginTop: 10
    },
    transactioninfo: {
        fontWeight: 'bold',
        margin: 5,
        color: Colors.primaryColor400,
        fontSize: 16,
        textAlign: 'center',

    },
    current: {
        fontSize: 15,
        fontWeight: 'bold',
        // textShadowColor: 'rgba(25,11,123,0.5)',
        // textShadowOffset: { width: 1, height: 1 },
        // textShadowRadius: 1,
        color: Colors.primaryColor400
    },
    middleCardStyle: {
        bottom: 20
    },
    transactionPress: {
        width: 100,
        flex: 1,
        justifyContent: 'center',
        overflow: 'hidden'
    },
    icon: {
        textAlign: 'center'
    },
    buttonPress: {
        opacity: 0.5
    },


})
