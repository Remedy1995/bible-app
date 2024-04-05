import { Text, View, StyleSheet, ImageBackground, Image, Platform, FlatList, Pressable } from "react-native";
import FlatListHeader from "../components/FlatListHeader";
import Colors from "../util/Color";
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
import { Dimensions } from "react-native";
const Home = ({ navigation }) => {
   const width = Dimensions.get('window').width;

   console.log('device width',width);
    // const NavigatePage = (Page) => {
    //     navigation.navigate(Page)
    // }
    return <PageGradient>
        <ImageBackground source={require('../assets/fin.jpg')} resizeMode='cover'
            style={styles.rootScreen}>
            <Card style={styles.moneyCard}>
                <View style={styles.InnerFirstText}>
                    <Title>Dashboard</Title>
                    <Image style={styles.image} source={require('../assets/money.jpg')} />
                    <View style={styles.notification}>
                        <Ionicons name="notifications" size={30} color={Colors.primaryColor400} />
                    </View>
                </View>
                <Text style={styles.welcomeText}>Hi, Japhet </Text>
                <View style={styles.balanceText}>
                    <Text style={styles.current}>Current Balance</Text>
                    <View style={styles.hideAmount}>
                        <Text style={styles.currentAmount}>
                            GHS23,000
                        </Text>
                        <FontAwesome name="eye" size={35} color={Colors.primaryColor700} style={styles.eyes} />
                    </View>
                </View>
            </Card>

            <View style={styles.transaction}>

                <View style={styles.eachtransaction}>
                    <Pressable style={({ pressed }) => [styles.transactionPress, pressed ? styles.buttonPress : null]} android_ripple={{ color: Colors.primaryColor900 }}>
                        <MaterialIcons name="send-to-mobile" size={35} color={Colors.primaryColor400} style={styles.icon} />
                        <Text style={styles.transactioninfo}>Send</Text>
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
                        <Text style={styles.transactioninfo}>Withdraw</Text>
                    </Pressable>
                </View>
                <View style={styles.eachtransaction}>
                    <Pressable android_ripple={{ color: Colors.primaryColor900 }} style={({ pressed }) => [styles.transactionPress, pressed ? styles.buttonPress : null]}>
                        <FontAwesome name="history" size={35} color={Colors.primaryColor400} style={styles.icon} />
                        <Text style={styles.transactioninfo}>Activity</Text>
                    </Pressable>
                </View>

            </View>

            <MiddleCard style={{ marginTop: SliceData(data) ? 20 : 3  }} >
                <FlatListHeader subHeader="Transactions" subHeaderActive="Recent" />
                <FlatList data={SliceData(data)} renderItem={(item) => RenderFlatList(item)} keyExtractor={(item) => item.id} />
            </MiddleCard>

        </ImageBackground>
    </PageGradient>


}

export default Home;

const styles = StyleSheet.create({
    headerStyle: {
        height: 200
    },
    imageStyle: {
        flex: 1,
        opacity: 0.3
    },
    InnerFirstText: {
        flexDirection: 'row'
    },
    welcomeText: {
        color: Colors.primaryColor700,
        fontSize: 32,
        fontWeight: 'bold',
        margin: 10,
        paddingTop: 0,
        marginLeft: 20,
        // textShadowColor: 'rgba(25,11,123,0.5)',
        // textShadowOffset: { width: 1, height: 1 },
        // textShadowRadius: 3,
    },
    balanceText: {
        marginLeft: 20
    },
    currentAmount: {
        fontSize: 30,
        color: Colors.primaryColor700,
        fontWeight: 'bold',
        lineHeight: 50,
        // textShadowColor: 'rgba(25,11,123,0.5)',
        // textShadowOffset: { width: 1, height: 1 },
        // textShadowRadius: 3,
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
        minHeight: 100,
        marginTop: 10,
        marginHorizontal: 20,
        borderRadius: 12,
        shadowColor: 'black',
        shadowOffset: { width: 10, height: 10 },
        shadowRadius: 6,
        shadowOpacity: 0.3,
        overflow: Platform.OS === "android" ? "hidden" : " visible",


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
        marginLeft: 20,
        backgroundColor: Colors.primaryColor700,
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
        // textShadowRadius: 3,
    },
    middleCardStyle: {
        marginTop: 10,
    },
    transactionPress: {
        width: 115,
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
    rootScreen: {
        flex: 1
    },
    moneyCard: {
        marginTop: 40,
        marginLeft: 15
    }
})
