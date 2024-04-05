import React from "react";
import { View, StyleSheet, Text, ImageBackground, Image } from "react-native";
import Title from "../components/Title";
import Card from "../components/TopCard";
import { data } from "../data";
import PageGradient from "../components/PageGradient";
import { FontAwesome } from '@expo/vector-icons';
import { AllUsersHooks } from "../Hooks/Hooks";
import Colors from "../util/Color";
const CustomerDetailPage = ({ route }) => {
    const { Allusers, error } = AllUsersHooks();
    let customers = Allusers[0];
    console.log('mu customers', customers)
    let paymentData = []
    console.log(route.params.data_id)
    const filterSpecificUser = customers.filter((user) => user._id === route.params.data_id);
    console.log('all customers', filterSpecificUser)

    //console.log(paymentData)
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
                <Title style={[styles.title,{color :Colors.primaryColor800}]}>Customer Details</Title>

                {!filterSpecificUser ? "Loading" : filterSpecificUser.map((data) => (
                    <View key={data._id}>


                        <View style={styles.profileInfo}>
                            <View style={styles.profileInfoImageWrapper}>
                                <Image source={{ uri: data.file }} style={[styles.imageStyle,{marginLeft : 80}]} />
                            </View>
                        </View>
                        <View style={styles.details} >
                            <View style={styles.transaction}><Text style={styles.transactionText}> First Name</Text></View>
                            <View style={styles.transaction}><Text style={styles.transactionText}>{data.firstname}</Text></View>
                        </View>
                        <View style={styles.details}>
                            <View style={styles.transaction}><Text style={styles.transactionText}> Last Name</Text></View>
                            <View style={styles.transaction}><Text style={styles.transactionText}>{data.lastname}</Text></View>
                        </View>
                        <View style={styles.details}>
                            <View style={styles.transaction}><Text style={styles.transactionText}> User Name</Text></View>
                            <View style={styles.transaction}><Text style={styles.transactionText}>{data.username}</Text></View>
                        </View>

                        <View style={styles.details}>
                            <View style={styles.transaction}><Text style={styles.transactionText}>Account Number</Text></View>
                            <View style={styles.transaction}><Text style={[styles.transactionText,{fontWeight: 'bold'}]}>{data.accountnumber}</Text></View>
                        </View>
                        <View style={styles.details}>
                            <View style={styles.transaction}><Text style={styles.transactionText}>Role</Text></View>
                            <View style={styles.transaction}><Text style={styles.transactionText}>{data.role}</Text></View>
                        </View>
                        <View style={styles.details}>
                            <View style={styles.transaction}><Text style={styles.transactionText}>Address</Text></View>
                            <View style={styles.transaction}><Text style={styles.transactionText}>{data.address}</Text></View>
                        </View>
                        <View style={styles.details}>
                            <View style={styles.transaction}><Text style={styles.transactionText}>Phone</Text></View>
                            <View style={styles.transaction}><Text style={styles.transactionText}>{data.phone}</Text></View>
                        </View>
                        <View style={styles.details}>
                            <View style={styles.transaction}><Text style={styles.transactionText}>Email</Text></View>
                            <View style={styles.transaction}><Text style={styles.transactionText} ellipsizeMode="tail" numberOfLines={1}>{data.email}</Text></View>
                        </View>
                    </View>))}
            </Card>
        </>)
}

export default CustomerDetailPage;

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
        paddingBottom: 2
    },
    details: {
        flexDirection: 'row',

    },
    transaction: {
        flex: 1,
        marginLeft: 20,
        marginTop: 20
    },
    transactionText: {
        fontSize: 18
    },
    title: {
        marginTop: 20,
        fontSize: 25,
        left: 40
    }
})


