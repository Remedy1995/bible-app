import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import CustomDialogBox from "../../components/CustomDialogBox";
import CustomModal from "../../components/CustomModal";
import { Image } from 'react-native';
import UserDeposit from "../UserDeposit";
import Colors from "../../util/Color";
import { Alert } from "react-native";
import { Feather } from '@expo/vector-icons';
import { updateAccountBalance } from "../../redux/Reducers/Accounts";
import { MakeDepositService, MomoPaymentService, VerifyTransactionService } from "../../Services/Services";
import { FontAwesome } from '@expo/vector-icons';
import { useSelector, useDispatch } from "react-redux";
import { VerifyOtpService } from "../../Services/Services";
import { useNavigation } from "@react-navigation/native";
// import { storeUser, removeUser } from "../../Redux/AuthUser";
// import { CustomTextInput } from "../../Components/CustomTextInput";
import { Dimensions } from "react-native";
import { Button } from "../../components/Button";
import { Ionicons } from "@expo/vector-icons";
import { useState, useRef, forwardRef } from "react";

const VerificationCode = ({ route }) => {
    const otp_reference = route.params.reference;
    const [showModal, setModal] = useState(false);
    const navigation = useNavigation();
    const [showDepositScreen,setShowDepositScreen] = useState(false)
    const inputRefs = useRef([]);
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    const [modalText, setModalText] = useState("");
    const [allValues, setAllValues] = useState("");
    const [reference, setReference] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    console.log('data', width)
    console.log(height)
    const dispatch = useDispatch();
    let OtpCodes = "";
    const handleInputVerification = (text, index) => {
        if (text.length > 0) {
            const nextIndex = index + 1;
            if (nextIndex < inputRefs.current.length) {
                inputRefs.current[nextIndex].focus();
            }
            OtpCodes += text;
            //setAllValues(text)
        }



    }


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

  const resetProcess = setInterval(()=> {
        VerifyTransactionService(referenceObject).then((data) => {
            console.log('this has been verified', data.data.data.status)
            setResponse((currentStatus)=>[...currentStatus ,data.data.data.status]);


            if(data.data.data.status ==='failed'){
                setIsSubmitting(false)
                console.log('the operation has failed')
              Alert.alert(
                "Response",
                "Sorry an error occured please try again later",
                [
                    {
                        text : "Cancel"
                    },
                    {
                        text : "OK"
                    }

                ]
              )
                clearInterval(resetProcess);
              
            }
            
            else if(data.data.data.status ==='success'){
                setIsSubmitting(false)
                console.log('the operation has succeeded')
                Alert.alert(
                    "Response",
                    "Deposit has been successfully made",
                    [
                        {
                            text : "Cancel"
                        },
                        {
                            text : "OK"
                        }
    
                    ]
                  )
                clearInterval(resetProcess);
               
            RecordTransactionDB();
            }

        }).catch(error => {
            console.log('this is the error', error.response);
        })


    },10000)



}

function RecordTransactionDB(){
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
            }
        }
        ).catch(error => {
            console.log('there is an error in deposits', error.message);
        });
    }


    const Submit = () => {
        //verify otp codes send an otop code to the server
        console.log('allValues', OtpCodes ,otp_reference)
        const OtpObject = {
            otp: OtpCodes.trim(),
            reference: otp_reference
        }

        VerifyOtpService(OtpObject).then((data) => {
            if (data) {

                // if (data?.data?.data?.display_text === 'Please enter the one-time password sent to your phone') {
                //     setModal(!showModal);
                //     setModalText(data?.data?.data?.display_text);
                //     navigation.navigate('Verification Screen', {
                //         reference: data?.data?.data?.reference
                //     });
              //  }
                //  if (data?.data?.data?.display_text === 'Please complete the authorisation process by inputting your PIN on your mobile device') {
                //    navigation.navigate('UserDeposit Screen');
                // }

                // else if (!data?.data?.status) {
                //     // setModal(!showModal);
                //     // setModalText(data?.data?.message);
                //     Alert.alert(
                //         "Response",
                //         data?.data?.message,
                //         [
                //             {
                //                 text : "Cancel"
                //             },
                //             {
                //                 text : "OK"
                //             }
            
                //         ]
                //       )
                //     console.log('my data', data?.data?.message)
                // }

                // console.log('momo payment made ', data);
                //     setModal(!showModal);
                //    setModalText(data?.message);



                if (data?.data?.data?.display_text === 'Please complete the authorisation process by inputting your PIN on your mobile device') {
                    setModal(!showModal);
                    setModalText(data?.data?.data?.display_text);
                    setReference(data?.data?.data?.reference);
                    setModal(!showModal);
                     setShowDepositScreen(true)
                console.log('data?.data?.data?.display_text');

                }

                else if (!data?.data?.status) {
                    setModal(!showModal);
                    setModalText(data?.data?.message);
                    console.log('my data', data?.data?.message)
                }



            }
            else {
                 setModal(!showModal);
               setModalText(data?.data?.display_text);
               console.log(data?.data?.display_text)

                Alert.alert(
                    "Response",
                    data?.data?.display_text,
                    [
                        {
                            text : "Cancel"
                        },
                        {
                            text : "OK"
                        }
        
                    ]
                  )
            }
        }).catch(error => {
            console.log('error', error)
        })


    }


    const InputWithForwardRef = forwardRef((props, ref) => {
        return (<View style={{ marginTop: 10, marginBottom: 10 }}>
            <TextInput ref={ref} maxLength={1} onChangeText={(text) => props.onTextChange(text, props.index)} style={styles.verificationBox} />
        </View>)
    });

    return (
      showDepositScreen ?<UserDeposit/> :<KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? 'padding' : 'height'}>
            <View style={styles.AuthContainer}>
            <CustomModal modalOpen={showModal} setModalOpen={setModal} additionalStyle={{ paddingBottom: 500 }} >
                    <CustomDialogBox LeftButtonText="Cancel" RightButtonText="OK"
                        queryText={modalText}
                        rightButtonHandler={ApproveMandate} addtionalStyle={{ width: width <= 360 ? 320 : 370 }} />
                </CustomModal>
                {/* <Ionicons name="arrow-back-outline" size={28} color={Colors.primaryColor100} style={{ left: 20 }} /> */}
                <View style={[styles.AuthItems, { height: height }]}>
                    <Text style={styles.Registration}>Verify Otp Code</Text>
                    <View style={styles.getStartedImageWrapper}>
                        <Image source={{ uri: 'https://media.istockphoto.com/id/1246021208/vector/login-password-verification-code-push-message-or-sms-for-2fa-authentication-with-shield-icon.jpg?s=170667a&w=0&k=20&c=ihwkClm4HwoJlwI8qPsvh6IUI-Ou5vq5Ur2ODT3jsfk=' }} style={[styles.getStartedPicture, {
                            width: 150, height: 150, borderRadius: 150
                        }]} />
                    </View>
                    <Text style={styles.phoneNumber}>Verification</Text>
                    <Text style={styles.textMessage}>You will get a six-digit verification code{`\n`} that is time-limited</Text>
                    <View style={{ flexDirection: 'row' }}>
                        {[...Array(6)].map((_, index) => (
                            <InputWithForwardRef key={index} ref={(ref) => (inputRefs.current[index] = ref)} index={index} onTextChange={handleInputVerification} />
                        ))}
                    </View>
                    <Text style={styles.resendCode}>Resend code?</Text>
                    <Button Submit={Submit} text="Done" styles1={{ fontSize: 17, color: 'white' }} />

                </View>
            </View>
        </KeyboardAvoidingView>
                        
    )
}




export default VerificationCode;

const styles = StyleSheet.create({
    AuthContainer: {
        flex: 1,
        top: 0
    },
    AuthItems: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    Registration: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.primaryColor800,
        // top: 0,
        position: 'absolute',
        top: 60
    },

    resendCode: {
        fontSize: 15,
        fontWeight: 'bold',
        color: Colors.primaryColor800,
        top: 20,
        margin: 10
    },
    phoneNumber: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.primaryColor800,
        marginTop: 20,
        marginLeft: 0,
        top: 10
    },
    textMessage: {
        fontSize: 16,
        fontWeight: 'normal',
        color: Colors.primaryColor800,
        lineHeight: 25,
        top: 20,
        marginTop: 2,
        //margin: 20,
    },
    getStartedImageWrapper: {
        marginTop: 0
    }
    , getStartedPicture: {
        //height: 420 
    },
    verificationBox: {
        borderColor: Colors.primaryColor200,
        borderWidth: 1,
        margin: 5,
        width: 40,
        height: 40,
        top: 20,
        borderRadius: 5,
        borderWidth: 2,
        textAlign: 'center',
        fontWeight: 'bold'
    }
})