import {
    View, Text, StyleSheet, ImageBackground, StatusBar, ScrollView, Image, Pressable, KeyboardAvoidingView, useWindowDimensions,
    Button, Platform
} from "react-native";
import { Dimensions } from "react-native";
import ErrorText from "../components/ErrorText";
import CustImagePicker from "../components/CustImagePicker";
import DateFormat from "../util/helpers/DateFormat";
import { addUsers, authenticatedUser } from "../redux/Reducers/Users";
import SuccessToast from "../components/Toasts/SuccessToast";
import ErrorToast from "../components/Toasts/ErrrorToast";
import { RegisterUserService } from "../Services/Services";
import CustomDialogBox from "../components/CustomDialogBox";
import CustomModal from "../components/CustomModal";
import { ObjectPropHasAllValues } from '../util/validators/validate';
import { SendOtpService } from "../Services/Services";
import md5 from "md5";
import {
    HandleFieldsFirstName,
    HandleFieldsLastName,
    HandleFieldsPhoneNumber,
    HandleFieldsAddress,
    HandleFieldsUserName,
    HandleFieldsEmail,
    HandleFieldsOccupation
} from "../util/validators/HandleFieldsValidators";
import { useDispatch, useSelector } from "react-redux";
import FormButton from "../components/FormButton";
import DateTimePicker from '@react-native-community/datetimepicker';
import Colors from "../util/Color";
import Card from "../components/TopCard";
import StringContainsNumber from '../util/validators/validate'
import PageGradient from "../components/PageGradient";
import { useState } from "react";
import Input from "../components/Input";
import { TouchableOpacity } from "react-native-gesture-handler";
import CardTitle from "../components/CardTitle";
import { useNavigation } from "@react-navigation/native";


const UploadImage = () => {
    const navigation = useNavigation();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showMessage, setShowMessage] = useState("");
    const dispatch = useDispatch();
    const allUsers = useSelector((state) => state.Allusers.registerUsers);
    // console.log('all created', allUsers)
    const [showModal, setModal] = useState(false);
    console.log('recently added data', allUsers);
    const [formData, setFormData] = useState({
        firstname: "uihuihi",
        lastname: "uihiuhiu",
        phone: "0543661399",
        address: "uihuihi",
        dateOfBirth: "",
        username: "90ii90i90",
        email: "i9i90i0",
        occupation: "89-u-u98",
        isTouched: "",
        hasError: "",
        isTouched1: "",
        hasError1: "",
        isTouched2: "",
        hasError2: "",
        isTouched3: "",
        hasError3: "",
        isTouched4: "",
        hasError4: "",
        isTouched5: "",
        hasError5: "",
        isTouched6: "",
        hasError6: ""
    })

    const [date, setDate] = useState(new Date(Date.now()));
    const [showPicker, setShowPicker] = useState(false);
    const [showErrorNotification, setShowErrorNotification] = useState(false);
    const formatDate = DateFormat(date);
    const toggleDatePicker = () => {
        setShowPicker((state) => !state)
    }
    const onChange = (event, value) => {
        setDate(value);
        if (date) {
            setShowPicker(false)
        }

        if (Platform.OS === 'android') {
            console.log('eei')
        }
    };


    const submitHandler = () => {
        if (!ObjectPropHasAllValues(formData)) {
            setIsSubmitting(false);
            console.log('does not have all values')
        }
        else {
            console.log('has all values')
            formData.dateOfBirth = formatDate;
            console.log('you have clicked the form button', formData.dateOfBirth);
            // send the data to our redux store
            delete formData.hasError;
            delete formData.isTouched;
            delete formData.isTouched1;
            delete formData.isTouched2;
            delete formData.isTouched3;
            delete formData.isTouched4;
            delete formData.isTouched5;
            delete formData.isTouched6;
            delete formData.hasError1;
            delete formData.hasError2;
            delete formData.hasError3;
            delete formData.hasError4;
            delete formData.hasError5;
            delete formData.hasError6;
            formData.password = "123456";
            //let confirm whether phone number is valid by sending otp
            SendOtpService({
                phone: formData.phone,
                sender_id: "37 GPRTU"
            }).then((response) => {
                console.log('my otp has been sent', response.data.message)
                if (response.data.message === 'Invalid phone number') {
                    setModal((modal) => !modal);
                    setShowMessage(response.data.message)
                }
             
                    //push our formData to our redux store and navigate user to verifyphone  number
                    dispatch(addUsers(formData));
                    navigation.navigate('VerificationPhone',
                        {
                            phoneNumber: formData.phone
                        }
                    )
            }).catch((error) => {
                console.log('my error', error.response.data)
                //setShowMessage('Incorrect Phone number input try again')
            })



            //     const postData = dispatch(addUsers(formData));
            //     RegisterUserService(postData).then((register) => {
            //         setModal((modal)=>!modal);
            //         console.log('postData', register)
            //         setShowMessage(register.message);

            //         if (register) {
            //             setIsSubmitting(false);

            //         }
            //     }).catch(error => {
            //         if (error) {
            //             console.log('There was an error in registering user', error?.response?.data.error);
            //             setIsSubmitting(false);
            //         }
            //     })
        }
    }
    return (
        <>
            <StatusBar hidden={false} />
            <ScrollView>
                <Card style={styles.card}>
                    <CustomModal modalOpen={showModal} setModalOpen={setModal} additionalStyle={{ paddingBottom: 500 }} >
                        <CustomDialogBox LeftButtonText="Exit" RightButtonText="OK" modalStyle={{ left: 10 }}
                            queryText={showMessage}
                            leftButtonHandler={() => setModal(!showModal)} rightButtonHandler={() => setModal(!showModal)} addtionalStyle={{ width: width <= 360 ? 320 : 370 }} />
                    </CustomModal>
                    <CardTitle  additionalStyle={{left : 10,top : 20}}> Registration</CardTitle>
                   <CustImagePicker/>
                </Card>
            </ScrollView>




        </>

    )
}

export default UploadImage;
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
        minHeight: 550,
        marginTop: 70,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        maxWidth: 380,
        marginHorizontal: 0,
        marginLeft: width > 360 ? 20 : 0,
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