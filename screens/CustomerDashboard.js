import React from "react";
import Carousel from 'react-native-reanimated-carousel';
import { Images } from "../imagesData";
import { Text, View, StyleSheet, ImageBackground, Image, Platform, FlatList, Pressable } from "react-native";
import FlatListHeader from "../components/FlatListHeader";
import Colors from "../util/Color";
import ActivityRenderFlatList from "../components/ActivityRenderFlatList";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { data } from "../data";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import Title from "../components/Title";
import PageGradient from "../components/PageGradient";
import Card from "../components/TopCard";
import DataCard from "../components/DataCard";
import RenderFlatList from "../components/RenderFlatList";
import MiddleCard from "../components/MiddleCard";
import SliceData from "../util/helpers/SliceData";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { logoutUser } from "../redux/Reducers/Users";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../components/CustomModal";
import CustomDialogBox from "../components/CustomDialogBox";
import { AllCustomersService } from "../Services/Services";
import { fetchUsers, } from "../redux/Reducers/Users";
import { UserNameHooks, AccountNumberHooks, DepositorInfoHooks, UpdateCustomerBalance } from "../Hooks/Hooks";
import { AllTransactionHooks } from "../Hooks/Hooks";
import { useMemo } from "react";
const CustomerDashboard = () => {
//     const {AllTransactions} = AllTransactionHooks();
//    var sliceData = AllTransactions[0]?.slice(0,2).sort;

   //console.log('slice ',sliceData)
    const { errorUsername, getUserName, fetchSpecificUserData } = UserNameHooks();

    const recentBal = useSelector((state) => state.AllAccounts.customerAccountBalance);
    console.log('recent Bal',recentBal);
   
    //if there is no specifc data for a particular user let search in the array if the user exist and display balance 
    //for that user
    const allUsers = useSelector((state) => state.Allusers.registerUsers);

   //const AllBalance = useSelector((state)=>state.AllAccounts.customerAccountBalance);

//    const searchBalance = recentBal.filter((user)=> user.accountnumber === allUsers[allUsers.length - 1]["username"] );
//    console.log('all Deposits',AllBalance);

    console.log('get error', errorUsername)
    const { digitalBalance } = UpdateCustomerBalance();
    console.log('my digital balance', digitalBalance)
    const dispatch = useDispatch();
    const navigation = useNavigation();
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
    }, [navigation]);

    const width = Dimensions.get('window').width;
    const logOutUser = () => {
        dispatch(logoutUser());
    }

    return <PageGradient>
        <View style={{ backgroundColor: Colors.primaryColor400, marginTop: width > 360 ? 0 : 20 }}>
            {/* <ImageBackground imageStyle={styles.imageStyle} source={require('../assets/money.jpg')} resizeMode='cover'
            style={styles.rootScreen}> */}
            <CustomModal modalOpen={showModal} setModalOpen={setModal} additionalStyle={{ paddingBottom: 500 }} >
                <CustomDialogBox LeftButtonText="No" RightButtonText="Yes"
                    queryText="Do you Wish to logout?"
                    leftButtonHandler={() => setModal(!showModal)} rightButtonHandler={logOutUser} addtionalStyle={{ width: width <= 360 ? 320 : 370 }} />
            </CustomModal>

            <View style={{ top: -10 }}>
                <Card style={{
                    bottom: 25, backgroundColor: Colors.primaryColor800, height: 170,
                    marginRight: 25,left : 2
                }}>
                    <View style={styles.InnerFirstText}>
                        <Title style={{ color: Colors.primaryColor400 }}>Dashboard</Title>
                        {/* <Image style={styles.image} source={require('../assets/money.jpg')} /> */}
                        <View style={[styles.notification, { left: width > 360 ? -20   : -50 }]}>
                            <Ionicons name="notifications" size={30} color={Colors.primaryColor800} />
                        </View>
                    </View>
                    <Text style={styles.welcomeText}>Hi, {
                        fetchSpecificUserData.length && getUserName?.length > 0 ? getUserName : "Loading"} </Text>
                    <View style={styles.balanceText}>
                        <Text style={styles.current}>Current Balance</Text>
                        <View style={styles.hideAmount}>
                            <Text style={styles.currentAmount}>
                                {/* {balance && balance} */}
                                {/* {fetchSpecificUserData.length < 1 ?"GHA00" :  (digitalBalance.length === 0 ? "GHC0.00" : digitalBalance)} */}
                                {/* recentBal &&recentBal[recentBal.length-1]["balance"] */}
                                {/* {balance.length < 1 ? "Loading" : "GHS".concat(currentBalance[0]?.toLocaleString('en-US'))} */}
                                {/* {getRecentTransaction[0]} */}

                               {digitalBalance.length === 0
    ? "0.00"
    : digitalBalance?.length === 1
    ? digitalBalance + ".00"
    : digitalBalance && digitalBalance?.endsWith(".00")
    ? digitalBalance
    : digitalBalance + ".00"
                               }
                            </Text>
                          <FontAwesome name="eye" size={35} color={Colors.primaryColor400} style={[styles.eyes, { top : -25,right: width  > 360 ? 40: 20 ,position :'absolute'}]} />
                        </View>
                    </View>
                </Card>

                <View style={[styles.transaction, { left: -1 }]}>

                    <View style={styles.eachtransaction}>
                        <Pressable style={({ pressed }) => [styles.transactionPress, pressed ? styles.buttonPress : null]} android_ripple={{ color: Colors.primaryColor900 }}>
                            <MaterialIcons name="send-to-mobile" size={35} color={Colors.primaryColor400} style={styles.icon} />
                            <Text style={styles.transactioninfo}>Deposit</Text>
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
                            <Text style={styles.transactioninfo}>Withdrawal</Text>
                        </Pressable>
                    </View>
                    <View style={styles.eachtransaction}>
                        <Pressable android_ripple={{ color: Colors.primaryColor900 }} style={({ pressed }) => [styles.transactionPress, pressed ? styles.buttonPress : null]}>
                            <Feather name="activity" size={35} color={Colors.primaryColor400} style={styles.icon} />
                            <Text style={styles.transactioninfo}>Activity</Text>
                        </Pressable>
                    </View>

                </View>

                <MiddleCard isDashboard={false} style={[styles.middleCardStyle, { width: width > 360 ? 365 : 315 }]} >
                    <FlatListHeader subHeader="Transactions" subHeaderActive="Recent" style={{ bottom: 40, borderRadius: 10, left: width > 360 ? 9 : -9, width: width > 360 ? 360 : 320 }} />
                    <View style={styles.flatlistContainer}>

                        <View style={{ left: width > 360 ? -8 : -4  }}>

                             {/* <FlatList data={SliceData(data)} renderItem={(item) => ActivityRenderFlatList(item)} keyExtractor={(item) => item.id} /> */}
                            </View> 
                    </View>
                </MiddleCard> 
              




                <Carousel loop width={360} height={450} style={{ margin: 20, top: -55, borderRadius: 10 ,left : 5}}
            autoPlay={true} data={Images} scrollAnimationDuration={1000}
            onSnapToItem={(item) => console.log('index', item)}

            renderItem={({ item }) => (
                <View style={{
                    borderWidth: 0,
                    justifyContent: 'center'
                }}>

                    <Image source={{ uri: item["url"] }} style={{ width: width, height: 300 }} />

                    <Text style={{
                        backgroundColor: 'white', zIndex: 100, position: 'absolute', left: 50, fontSize: 20, color: Colors.primaryColor800, padding: 20, borderRadius: 10,
                        fontWeight: 'bold'
                    }}>{item["text"]}</Text>{ }
                </View>


            )} />
            </View>
        </View>
    </PageGradient>


}

export default CustomerDashboard;
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({

    flatlistContainer: {
        bottom: width > 360 ? 50 : 40,
        left: width > 360 ? 0 : -7
    },

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
        fontSize: 27,
        fontWeight: 'bold',
        margin: 10,
        bottom: 20,
        marginLeft: 20,
        color: Colors.primaryColor400
        // textShadowColor: 'rgba(25,11,123,0.5)',
        // textShadowOffset: { width: 1, height: 1 },
        // textShadowRadius: 3,
    },
    balanceText: {
        marginLeft: 20
    },
    currentAmount: {
        fontSize: 25,
        color: Colors.primaryColor400,
        fontWeight: 'bold',
        // lineHeight: 20,
        bottom: 20
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
        overflow: Platform.OS === "android" ? "hidden" : " visible"
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
        color: Colors.primaryColor400,
        bottom: 23
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
    }
})
