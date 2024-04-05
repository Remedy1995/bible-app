import {
    View, Text, StyleSheet, ImageBackground, StatusBar, ScrollView, Image, Pressable, KeyboardAvoidingView, useWindowDimensions,
    Button, Platform
} from "react-native";
import ErrorText from "../components/ErrorText";
import PageLoader from "../components/PageLoader";
import DateFormat from "../util/helpers/DateFormat";
import Title from "../components/Title";
import CardTitle from "../components/CardTitle";
import FormButton from "../components/FormButton";
import CustomDialogBox from "../components/CustomDialogBox";
import CustomModal from "../components/CustomModal";
import { ActivityIndicator } from "react-native";
import { Alert } from "react-native";
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
import { useEffect, useState } from "react";
import Input from "../components/Input";
import { makeDeposits, clearDeposits } from "../redux/Reducers/Deposit";
import { useDispatch, useSelector } from "react-redux";
import { updateAccountBalance,updateAdminBalance } from "../redux/Reducers/Accounts";
import { MakeDepositService, MomoPaymentService, VerifyTransactionService } from "../Services/Services";
import { Dimensions } from "react-native";
import { UserNameHooks } from "../Hooks/Hooks";
import { useNavigation } from "@react-navigation/native";


const UserDeposit = () => {
    const { fetchSpecificUserData } = UserNameHooks();
    const navigation = useNavigation();
    const [showModal, setModal] = useState(false);
    const [reference, setReference] = useState("");
    console.log('my user information', fetchSpecificUserData);

    const data = useSelector((state) => state.AllDeposits.deposits);

    console.log('my data', fetchSpecificUserData[0]?.email.trim())
    const dispatch = useDispatch();
    const [modalText, setModalText] = useState("");
    const [response, setResponse] = useState([]);
    const [formData, setFormData] = useState({
        customerName: fetchSpecificUserData && fetchSpecificUserData[0].phone?.trim(),
        accountnumber: fetchSpecificUserData &&  fetchSpecificUserData[0].accountnumber?.trim(),
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


    function ApproveMandate() {
        setIsSubmitting(true)
        setModal(!showModal);
        //apoad5y8pcylc3x
        const referenceObject = {
            reference: reference
        }


        //let use setinterval to send request to the server at every one second
        // setInterval(checkTransactionStatus, 1000);


        // const checkTransactionStatus = () => {
        //    return [response]
        // }

        const resetProcess = setInterval(() => {
            VerifyTransactionService(referenceObject).then((data) => {
                console.log('this has been verified', data.data.data.status)
                setResponse((currentStatus) => [...currentStatus, data.data.data.status]);


                if (data.data.data.status === 'failed') {
                    setIsSubmitting(false)
                    console.log('the operation has failed')
                    Alert.alert(
                        "Response",
                        "Sorry an error occured please try again later",
                        [
                            {
                                text: "Cancel"
                            },
                            {
                                text: "OK"
                            }

                        ]
                    )
                    clearInterval(resetProcess);

                }

                else if (data.data.data.status === 'success') {
                    setIsSubmitting(false)
                    console.log('the operation has succeeded')
                    Alert.alert(
                        "Response",
                        "Deposit has been successfully made",
                        [
                            {
                                text: "Cancel"
                            },
                            {
                                text: "OK"
                            }

                        ]
                    )


                    


                    clearInterval(resetProcess);
                    setFormData((value) => ({
                        ...value, 
                        amount: ''
                    }));
                    RecordTransactionDB();
                }

            }).catch(error => {
                setIsSubmitting(false)
                clearInterval(resetProcess);
                Alert.alert(
                    "Error",
                    "Sorry An Error Occured",
                    [
                        {
                            text: "Cancel"
                        },
                        {
                            text: "OK"
                        }

                    ]);
                console.log('this is the error', error.response);
            })


        }, 10000)



    }

    // useEffect(()=>{

    //     if (response.includes('failed')){

    //         Alert.alert(
    //             "Response",
    //             "Sorry an error occured in making Payment please try again later",
    //             [
    //                 {
    //                     text : "Cancel"
    //                 },
    //                 {
    //                     text : "OK"
    //                 }

    //             ]
    //           )
    //     };

    //     if (response.includes('success')){

    //         Alert.alert(
    //             "Response",
    //             "You have successfully made Deposit",
    //             [
    //                 {
    //                     text : "Cancel"
    //                 },
    //                 {
    //                     text : "OK"
    //                 }

    //             ]
    //           )

    //     RecordTransactionDB();    
    //     };
    // },[response])

    console.log('look into progress', response.includes('failed'), response);








    function RecordTransactionDB() {
        MakeDepositService(dispatch
            (makeDeposits({
                accountnumber: formData.accountnumber.trim(),
                amount: formData.amount.trim()
            }))).then(deposit => {
                console.log(deposit);
                if (deposit) {
                    dispatch(updateAccountBalance({
                        accountnumber: formData.accountnumber.trim(),
                        balance: deposit.new_balance.trim()
                    }));


                    dispatch(updateAdminBalance({
                        amount : formData.amount,
                        transactionType : 'deposit'
                    }))
                }
            }
            ).catch(error => {
                console.log('there is an error in deposits', error.message);
            });
    }







    const SubmitHandler = () => {
        // setIsSubmitting(true);
        // dispatch(makeDeposits(formData))
        // setTimeout(() => {
        //     setIsSubmitting(false);
        // }, 2000)

        //g36epq5dtsuo54a

        console.log('my info this',formData.accountnumber,formData.customerName)
        const momoData = {
            email: '37GPRTU@susu.com',
            amount: formData.amount,
            phone: formData.customerName,
            provider: "mtn"
        }
        MomoPaymentService(momoData).then((data) => {
            if (data) {

                if (data?.data?.data?.display_text === 'Please enter the one-time password sent to your phone') {
                    setModal(!showModal);
                    setModalText(data?.data?.data?.display_text);
                    setReference(data?.data?.data?.reference);
                    navigation.navigate('Verification', {
                        reference: data?.data?.data?.reference
                    });
                }
                else if (data?.data?.data?.display_text === 'Please complete the authorisation process by inputting your PIN on your mobile device') {
                    setModal(!showModal);
                    setModalText(data?.data?.data?.display_text);
                    setReference(data?.data?.data?.reference);
                    setModal(!showModal);

                }

                else if (!data?.data?.status) {
                    setModal(!showModal);
                    setModalText(data?.data?.message);
                    console.log('my data', data?.data?.message)
                }

                console.log('momo payment made ', data);
                //     setModal(!showModal);
                //    setModalText(data?.message);
            }
            else {
                setModal(!showModal);
                setModalText(data?.data?.display_text);
            }
        }).catch(error => {
            console.log('err', error?.response)
        })

        // function RecordTransactionDB(){
        //         MakeDepositService(dispatch
        //             (makeDeposits({
        //                 accountnumber: formData.accountnumber.trim(),
        //                 amount: formData.amount.trim()
        //             }))).then(deposit => {
        //                 console.log(deposit);
        //                 if (deposit) {
        //                     dispatch(updateAccountBalance({
        //                         accountnumber: formData.accountnumber.trim(),
        //                         balance: deposit.new_balance.trim()
        //                     }));
        //                 }
        //             }
        //             ).catch(error => {
        //                 console.log('there is an error in deposits', error.message);
        //             });
        //         }
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
                <CustomModal modalOpen={showModal} setModalOpen={setModal} additionalStyle={{ paddingBottom: 500 }} >
                    <CustomDialogBox LeftButtonText="Cancel" RightButtonText="OK"
                        queryText={modalText}
                        leftButtonHandler={() => setModal(!showModal)} rightButtonHandler={ApproveMandate} addtionalStyle={{ width: width <= 360 ? 320 : 370 }} />
                </CustomModal>
                <View style={{ backgroundColor: Colors.primaryColor400, flex: 1 }}>
                    {/* <ImageBackground imageStyle={styles.imageStyle} resizeMode='cover'
                    style={styles.rootScreen}>
                    <Image
                        source={require('../assets/fin.jpg')}
                        style={{ height: 540, width: 500, borderRadius: 0, marginTop: 0 }} />

                </ImageBackground> */}
                    <Card style={styles.card}>
                        <CardTitle>Deposit With Momo </CardTitle>


                        <KeyboardAvoidingView
                            style={{ flex: 1, left: 10 }}
                            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
                        >


                            <Input placeholder="Jerry Jay" label="Phone" style={formData.hasError
                                && formData.isTouched && formData.customerName && styles.inputFormStyle} textConfigs={{
                                    onChangeText: HandleFieldsCustomerName.bind(this, setFormData),
                                    value: fetchSpecificUserData[0]?.phone.trim()
                                }} />
                            {formData.isTouched && formData.hasError && formData.customerName &&
                                (<ErrorText> Incorrect Customer Phone entered </ErrorText>)}

                            <Input placeholder="JJ1112321343" label="Account Number" style={formData.hasError1 &&
                                formData.isTouched1 && formData.accountnumber && styles.inputFormStyle} textConfigs={{
                                    onChangeText: HandleFieldsAccountNumber.bind(this, setFormData),
                                    value: fetchSpecificUserData[0]?.accountnumber.trim()
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

export default UserDeposit;
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
        marginLeft: width > 360 ? 16 : 0,
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