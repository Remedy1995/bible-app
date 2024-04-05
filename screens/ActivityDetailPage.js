import React from "react";
import { View, StyleSheet, Text, ImageBackground, Image } from "react-native";
import Title from "../components/Title";
import Card from "../components/TopCard";
import { data } from "../data";
import PageGradient from "../components/PageGradient";
import { FontAwesome } from '@expo/vector-icons';
import { AllUsersHooks } from "../Hooks/Hooks";
import Colors from "../util/Color";
import { AllTransactionHooks } from "../Hooks/Hooks";
const ActivityDetailPage = ({ route }) => {
    const {AllTransactions} = AllTransactionHooks();
    console.log(route.params.data_id)
    const filterSpecificTransaction = AllTransactions && AllTransactions[0]?.filter((user) => user._id === route.params.data_id);
  //  console.log('all transactions', filterSpecificTransaction)
    return (
        <><PageGradient >
            <ImageBackground imageStyle={styles.imageStyle} resizeMode='cover'
                style={styles.rootScreen}>
                <Image
                    source={require('../assets/fin.jpg')}
                    style={{ height: 700, width: 500, borderRadius: 0, marginTop: 0 }} />

            </ImageBackground>

        </PageGradient>
            <Card style={styles.card} >
                <Title style={[styles.title,{color :Colors.primaryColor800}]}>Activity Details</Title>

                {!filterSpecificTransaction ? "Loading" : filterSpecificTransaction.map((data) => (
                    <View key={data._id}>
                        <View style={styles.details} >
                            <View style={styles.transaction}><Text style={styles.transactionText}> Date</Text></View>
                            <View style={styles.transaction}><Text style={styles.transactionText}>{data.date}</Text></View>
                        </View>
                        <View style={styles.details}>
                            <View style={styles.transaction}><Text style={styles.transactionText}> Account Number</Text></View>
                            <View style={styles.transaction}><Text style={[styles.transactionText,{fontWeight: 'bold'}]}>{data.accountnumber}</Text></View>
                        </View>
                        <View style={styles.details}>
                            <View style={styles.transaction}><Text style={styles.transactionText}> Amount</Text></View>
                            <View style={styles.transaction}><Text style={[styles.transactionText,{fontWeight: 'bold'}]}>{"GHC".concat(data.amount).concat(".00")}</Text></View>
                        </View>
                        <View style={styles.details}>
                            <View style={styles.transaction}><Text style={styles.transactionText}>Details</Text></View>
                            <View style={styles.transaction}><Text style={styles.transactionText}>{data.transactiondetails}</Text></View>
                        </View>
                    </View>))}
            </Card>
        </>)
}

export default ActivityDetailPage;

const styles = StyleSheet.create({
    imageStyle: {
        width: 150,
        height: 150,
        borderRadius: 150,
        margin: 5
    },

    profileEditWrapper: {
        bottom: 50,
        left: 45,
        borderColor: 'white',
        borderWidth: 5,
        borderRadius: 150,
        width: 50, height: 50
    },
    profileInfoImageWrapper:
    {
        //borderColor: Colors.primaryColor800,
       // borderWidth: 5,
        //borderRadius: 150
    },
    card: {
        flex: 1,
        minHeight: 620,
        marginTop: 10,
        marginBottom: 180,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        marginLeft: 15,
        shadowColor: 'black',
        shadowOffset: { width: 10, height: 10 },
        shadowRadius: 6,
        shadowOpacity: 0.25,
        paddingBottom: 2,
        left : 2
    },
    details: {
        flexDirection: 'column',

    },
    transaction: {
        // flex: 1,
        marginLeft: 20,
        marginTop: 20
    },
    transactionText: {
        fontSize: 18,
        // flex : 1
    },
    title: {
        marginTop: 20,
        fontSize: 25,
        left: 40
    }
})


