import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import CustomDialogBox from "../../components/CustomDialogBox";
import CustomModal from "../../components/CustomModal";
import { Image } from 'react-native';
import Colors from "../../util/Color";
import { Alert } from "react-native";
import { Feather } from '@expo/vector-icons';
import { updateAccountBalance } from "../../redux/Reducers/Accounts";
import { MakeDepositService, MomoPaymentService, SendOtpService, VerifyTransactionService } from "../../Services/Services";
import { FontAwesome } from '@expo/vector-icons';
import { useSelector, useDispatch } from "react-redux";
import { VerifyOtpService } from "../../Services/Services";
import { useNavigation } from "@react-navigation/native";
import { VerifyPhoneOtpService } from "../../Services/Services";
// import { storeUser, removeUser } from "../../Redux/AuthUser";
// import { CustomTextInput } from "../../Components/CustomTextInput";
import { Dimensions } from "react-native";
import { Button } from "../../components/Button";
import { Ionicons } from "@expo/vector-icons";
import { useState, useRef, forwardRef } from "react";

const VerificationPhone = ({ route }) => {
    const phoneNumber = route.params.phoneNumber;
    const [showModal, setModal] = useState(false);
    const navigation = useNavigation();
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




    const Resend = () => {
        //verify otp codes send an otp code to the server
        const SendOtp = {
            phone: phoneNumber,
            "sender_id": "37 GPRTU"
        }


        SendOtpService(SendOtp).then(sendOtp => {
            if (sendOtp) {
                console.log('verifyii', sendOtp.data.message)
                setModal((modal) => !modal)
                setModalText(sendOtp.data.message)
            }
        }).catch((error) => {
            console.log('there was an error ', error.response.data)
        })
    }









    const Submit = () => {
        //verify otp codes send an otp code to the server
        const OtpObject = {
            otp_code: OtpCodes.trim(),
            phone: phoneNumber.trim()
        }


        VerifyPhoneOtpService(OtpObject).then(verify => {
            console.log('verifyii', verify?.data)
            if (['1101', '1102', '1103', '1104', '1105', '1106'].includes(verify?.data?.code)) {
                console.log('print', verify?.data?.message)
                setModal(true)
                setModalText(verify?.data?.message)
            }
            else {
                console.log('data', verify?.data?.message)
                if (verify?.data?.message === 'Successful') {
                    navigation.navigate('UploadImage')
                }
                // setModal(true)
                // setModalText(verify?.data?.message)
            }
        }).catch(error => {
            console.log('there was an error ', error?.response?.data?.reason)
            setModal(true)
            setModalText(error?.response?.data?.reason)
        })
    }


    const InputWithForwardRef = forwardRef((props, ref) => {
        return (<View style={{ marginTop: 10, marginBottom: 10 }}>
            <TextInput ref={ref} maxLength={1} onChangeText={(text) => props.onTextChange(text, props.index)} style={styles.verificationBox} />
        </View>)
    });

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? 'padding' : 'height'}>
            <View style={styles.AuthContainer}>
                <CustomModal modalOpen={showModal} setModalOpen={setModal} additionalStyle={{ paddingBottom: 500 }} >
                    <CustomDialogBox LeftButtonText="Cancel" RightButtonText="OK"
                        queryText={modalText}
                        leftButtonHandler={() => setModal(!showModal)} rightButtonHandler={() => setModal(!showModal)} addtionalStyle={{ width: width <= 360 ? 320 : 370 }} />
                </CustomModal>
                {/* <Ionicons name="arrow-back-outline" size={28} color={Colors.primaryColor100} style={{ left: 20 }} /> */}
                <View style={[styles.AuthItems, { height: height }]}>
                    <Text style={styles.Registration}></Text>
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
                    <Button Submit={Resend} text="Resend Otp Code?" styles1={{ fontSize: 17, color: Colors.primaryColor800 }} style={{ backgroundColor: Colors.primaryColor100 }} />

                    <Button Submit={Submit} text="Done" styles1={{ fontSize: 17, color: 'white' }} />

                </View>
            </View>
        </KeyboardAvoidingView>

    )
}




export default VerificationPhone;

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