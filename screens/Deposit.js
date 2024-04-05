import {
    View, Text, StyleSheet, ImageBackground, StatusBar, ScrollView, Image, Pressable, KeyboardAvoidingView, useWindowDimensions,
    Button, Platform
} from "react-native";
import ErrorText from "../components/ErrorText";
import DateFormat from "../util/helpers/DateFormat";
import { Alert } from "react-native";
import Title from "../components/Title";
import CardTitle from "../components/CardTitle";
import FormButton from "../components/FormButton";
import { ActivityIndicator } from "react-native";
import {
    HandleFieldsCustomerName,
    HandleFieldsAccountNumber,
    HandleFieldsAmount
} from "../util/validators/HandleFieldsValidators";
import DateTimePicker from '@react-native-community/datetimepicker';
import Colors from "../util/Color";
import Card from "../components/TopCard";
import StringContainsNumber from '../util/validators/validate'
import PageGradient from "../components/PageGradient";
import { useState } from "react";
import Input from "../components/Input";
import { makeDeposits, clearDeposits } from "../redux/Reducers/Deposit";
import { useDispatch, useSelector } from "react-redux";
import { updateAccountBalance ,updateAdminBalance} from "../redux/Reducers/Accounts";
import { MakeDepositService } from "../Services/Services";
import { Dimensions } from "react-native";
import { UserNameHooks } from "../Hooks/Hooks";


const Deposit = () => {
    const {fetchSpecificUserData} = UserNameHooks();

    console.log('my user information',fetchSpecificUserData);

    const data = useSelector((state) => state.AllDeposits.deposits);

    console.log('my data', data)
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        customerName: "",
        accountnumber: "",
        amount: "",
        isTouched: "",
        hasError: "",
        isTouched1: "",
        hasError1: "",
        isTouched2: "",
        hasError2: ""
    })

    const [isSubmitting, setIsSubmitting] = useState(false);
    const { width, height } = useWindowDimensions();

    const SubmitHandler = () => {
        // setIsSubmitting(true);
        // dispatch(makeDeposits(formData))
        // setTimeout(() => {
        //     setIsSubmitting(false);
        // }, 2000)



        MakeDepositService(dispatch
            (makeDeposits({
                accountnumber: formData.accountnumber.trim(),
                amount: formData.amount.trim()
            }))).then(deposit => {
                console.log(deposit);


                Alert.alert(
                    "Response",
                   deposit.message,
                    [
                        {
                            text : "Cancel"
                        },
                        {
                            text : "OK"
                        }
    
                    ]
                  )
                if (deposit) {
                    dispatch(updateAccountBalance({
                        accountnumber: formData.accountnumber.trim(),
                        balance: deposit.new_balance.trim()
                    }));

                    dispatch(updateAdminBalance({
                        amount : formData.amount.trim(),
                        transactionType : 'deposit'
                    }))
                }
            }
            ).catch(error => {
                console.log('there is an error in deposits', error.message);
            });
        //clear deposit after making deposits
        // dispatch(clearDeposits({
        //     accountNumber: formData.accountNumber,
        //     amount: formData.amount
        // }));


    }
    console.log(formData.hasError1)

    return (
        <>
            <StatusBar hidden={false} />

            <PageGradient >

           
                <View style={{ backgroundColor: Colors.primaryColor400, flex: 1 }}>
                    {/* <ImageBackground imageStyle={styles.imageStyle} resizeMode='cover'
                    style={styles.rootScreen}>
                    <Image
                        source={require('../assets/fin.jpg')}
                        style={{ height: 540, width: 500, borderRadius: 0, marginTop: 0 }} />

                </ImageBackground> */}
                    <Card style={styles.card}>
                        <CardTitle>Deposit </CardTitle>


                        <KeyboardAvoidingView
                            style={{ flex: 1, left: 10 }}
                            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
                        >
                            <Input placeholder="Jerry Jay" label="Email Address" style={formData.hasError
                                && formData.isTouched && formData.customerName && styles.inputFormStyle} textConfigs={{
                                    onChangeText: HandleFieldsCustomerName.bind(this, setFormData),
                                    value: formData.customerName
                                }} />
                            {formData.isTouched && formData.hasError && formData.customerName &&
                                (<ErrorText> Incorrect Customer Name entered </ErrorText>)}

                            <Input placeholder="JJ1112321343" label="Account Number" style={formData.hasError1 &&
                                formData.isTouched1 && formData.accountnumber && styles.inputFormStyle} textConfigs={{
                                    onChangeText: HandleFieldsAccountNumber.bind(this, setFormData),
                                    value: formData.accountnumber
                                }} />
                            {formData.isTouched1 && formData.hasError1 && formData.accountnumber &&
                                (<ErrorText> Incorrect Account Number entered </ErrorText>)}

                            <Input placeholder="Amount" label="Amount"
                                style={formData.hasError2 && formData.isTouched2 && formData.amount &&
                                    styles.inputFormStyle} textConfigs={{
                                        onChangeText: HandleFieldsAmount.bind(this, setFormData),
                                        value: formData.amount,
                                        keyboardType: 'numeric', maxLength: 10
                                    }} />
                            {formData.isTouched2 && formData.hasError2 && formData.amount &&
                                (<ErrorText> Incorrect Amount entered </ErrorText>)}
                            <FormButton onPress={SubmitHandler} disabled={Boolean(formData.hasError) ||
                                Boolean(formData.hasError1) || Boolean(formData.hasError2)} ButtonTitle="Submit" loaderColor={Colors.primaryColor400} submitting={isSubmitting} />
                        </KeyboardAvoidingView>
                    </Card>
                </View>
            </PageGradient>



        </>

    )
}

export default Deposit;
const width = Dimensions.get('screen').width;
const styles = StyleSheet.create({
    imageStyle: {
        opacity: 0.5
    },
    gradient: {
        opacity: 0.5
    },



    keyBoard: {
        flex: 1,
        minHeight: 450,
        marginTop: 0,
        marginBottom: 20,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        maxWidth: 380,
        marginHorizontal: 0,
        marginLeft: 8,
        marginRight: 0,
        elevation: 8,
        shadowColor: 'black',
        shadowOffset: { width: 10, height: 10 },
        shadowRadius: 6,
        shadowOpacity: 0.25,
        paddingBottom: 20
    },
    card: {
        backgroundColor: Colors.primaryColor400,
        flex: 1,
        minHeight: 450,
        marginTop: 40,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        maxWidth: 380,
        marginHorizontal: 0,
        marginLeft:  width > 360 ? 16 : 0,
        marginRight: 0,
        marginBottom: 100,
        elevation: 8,
        shadowColor: 'black',
        shadowOffset: { width: 10, height: 10 },
        shadowRadius: 6,
        shadowOpacity: 0.25,


    },
    rootScreen: {
        flex: 1
    },
    dateTimePicker: {
        height: 120,
        marginTop: -10
    },
    inputFormStyle: {
        borderWidth: 1,
        borderColor: 'red'
    }
})