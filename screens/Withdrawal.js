import {
     StyleSheet, KeyboardAvoidingView, useWindowDimensions, Platform
} from "react-native";
import { Alert } from 'react-native';
import ErrorText from "../components/ErrorText";
// import DateFormat from "../util/helpers/DateFormat";
// import Title from "../components/Title";
import CardTitle from "../components/CardTitle";
import FormButton from "../components/FormButton";
// import { ActivityIndicator } from "react-native";
import { Dimensions } from "react-native";
import {
    HandleFieldsCustomerName,
    HandleFieldsAccountNumber,
    HandleFieldsAmount
} from "../util/validators/HandleFieldsValidators";
// import DateTimePicker from '@react-native-community/datetimepicker';
import Colors from "../util/Color";
import Card from "../components/TopCard";
// import StringContainsNumber from '../util/validators/validate'
import PageGradient from "../components/PageGradient";
import { useState } from "react";
import Input from "../components/Input";
import { makeWithdrawals } from "../redux/Reducers/Deposit";
import { MakeWithdrawalService } from "../Services/Services";
import { useDispatch, useSelector } from "react-redux";
import { AccountNumberHooks } from "../Hooks/Hooks";
import { updateAccountBalance,updateAdminBalance } from "../redux/Reducers/Accounts";
const Withdrawal = () => {
    const { accountNumber } = AccountNumberHooks();

    console.log('my distinct js', accountNumber);




    const data = useSelector((state) => state?.AllDeposits?.deposits);

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



        MakeWithdrawalService(dispatch(makeWithdrawals({ accountnumber: formData.accountnumber, amount: formData.amount }))).then(data => {
            if (data) {


                Alert.alert(
                    "Success",
                    data?.message,
                    [
                        {
                            text: "Cancel"
                        },
                        {
                            text: "OK"
                        }

                    ]
                )
                console.log('This is the remaining balance', data);
                dispatch(updateAccountBalance({
                    accountnumber: formData.accountnumber.trim(),
                    balance: data.new_balance.trim()
                }));
                //push our transaction to our update Admin Balance
                dispatch(updateAdminBalance({
                    amount: formData.amount.trim(),
                    transactionType: 'withdrawals'
                }))
            }
        }

        ).catch(error => {
            if (error.response) {
                console.log(error.response.data)
                Alert.alert(
                    "Error",
                    error.response.data.reason,
                    [
                        {
                            text: "Cancel"
                        },
                        {
                            text: "OK"
                        }

                    ]
                )
            }
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
            {/* <StatusBar hidden={true} /> */}

            <PageGradient>
                {/* <ImageBackground imageStyle={styles.imageStyle} resizeMode='cover'
                    style={styles.rootScreen}>
                    <Image
                        source={require('../assets/fin.jpg')}
                        style={{ height: 540, width: 500, borderRadius: 0, marginTop: 0 }} />

                </ImageBackground> */}





                <Card style={styles.card}>
                    <CardTitle>Withdrawal</CardTitle>


                    <KeyboardAvoidingView
                        style={{ flex: 1 }}
                        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
                    >
                        <Input placeholder="Jerry Jay" label="Customer Name" style={formData.hasError
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
                            Boolean(formData.hasError1) || Boolean(formData.hasError2) || formData.customerName === '' || formData.amount === ''
                            || formData.accountnumber === ''} ButtonTitle="Submit" loaderColor={Colors.primaryColor400} submitting={isSubmitting} />
                    </KeyboardAvoidingView>
                </Card>
            </PageGradient>


        </>

    )
}

export default Withdrawal;
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
        marginLeft: width > 360 ? 15 : 0,
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