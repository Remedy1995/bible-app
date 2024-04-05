import { View, Text, StyleSheet } from "react-native";
import ErrorText from "../../components/ErrorText";
import { KeyboardAvoidingView } from "react-native";
import Colors from "../../util/Color";
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch } from "react-redux";
import { authenticatedUser } from "../../redux/Reducers/Users";
import Input from "../../components/Input";
import FormButton from "../../components/FormButton";
import { useState } from "react";
import { HandleFieldsLoginUsername, HandleFieldsUserPassword } from "../../util/validators/HandleFieldsValidators";
import PageGradient from "../../components/PageGradient";
import { LoginService, LoginUserService } from "../../Services/Services";
import md5 from "md5";

const AuthLogin = ({ navigation }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState("");
    const [formdata, setFormData] = useState({
        username: "0543661399",
        password: "123456",
        isTouched: "",
        hasError: "",
        isTouched1: "",
        hasError1: ""
    })

    const Submit = () => {
        setErrorMessage("")
        setIsSubmitting(true);
        LoginUserService({
            phone: formdata.username,
            password: formdata.password
        }).then(login => {
            if (login) {
                // setError("");
                console.log('data', login);
                if (login.data.role === 'customer') {
                    dispatch(authenticatedUser({ phone: login.data.phone, role: login.data.role,
                     }));
                    return true;
                }
                else {
                    dispatch(authenticatedUser({ phone: login.data.phone, role: login.data.role }));
                    return true;
                }


                // if (formdata.username === '0246907298' && formdata.password === '12345678') {
                //     console.log('login successful');
                //     dispatch(authenticatedUser({ phone: formdata.username, role: 'customer' }))
                //     return true;
                // }



                // if (formdata.username === '0573664368' && formdata.password === '12345678') {
                //     console.log('login successful');
                //     dispatch(authenticatedUser({ phone: formdata.username, role: 'admin' }))
                //     return true;
                // }

            }
        }).catch(error => {
            if(error?.message){
                setErrorMessage(error.message);
            }
       
            console.log('an error', error.message);
            console.log('my error', errorMessage);
            if (error) {
                setIsSubmitting(false);
                //return false;
            }
            console.log(error?.response?.data.error)
            setErrorMessage(error?.response?.data.error);
        });


        // if (formdata.username === '0246907298' && formdata.password === '12345678') {
        //     console.log('login successful');
        //     dispatch(authenticatedUser({ phone: formdata.username, role: 'customer' }))
        //     return true;
        // }



        // if (formdata.username === '0573664368' && formdata.password === '12345678') {
        //     console.log('login successful');
        //     dispatch(authenticatedUser({ phone: formdata.username, role: 'admin' }))
        //     return true;
        // }

        // console.log('login error');

    }

    return (
        <PageGradient>
            <View style={styles.AuthContainer}>
                <View style={styles.AuthItems}>
                    <View style={{ left: 20 }}>
                    </View>

                    <KeyboardAvoidingView

                        behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
                        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
                    >
                        <FontAwesome name="user-circle-o" size={80} color={Colors.primaryColor400} style={{ top: 30, textAlign: 'center', left: 25 }} />
                        <Text style={styles.welcomeText}>SUSU - 37 GPRTU</Text>
                        <Text style={styles.continue}>Sign In to continue.</Text>
                        {errorMessage && (<Text style={{
                            color: Colors.primaryColor100, top: 60, fontSize: 20, width: 290, left: 40, borderRadius: 5,
                            textAlign: 'center', padding: 10
                        }}>{errorMessage}</Text>)}
                        <View style={{ top: 50 }}>
                            {formdata.isTouched && formdata.hasError && formdata.username &&
                                (<ErrorText additionalStyle={{ textAlign: 'center' }} > Incorrect User Name entered </ErrorText>)}
                            <Input placeholder="Enter Username" label="Username" style={[{ borderColor: Colors.primaryColor400, color: Colors.primaryColor400, borderWidth: 1.5 }, formdata.hasError &&
                                formdata.isTouched && formdata.username && styles.inputFormStyle]} textConfigs={{
                                    onChangeText: HandleFieldsLoginUsername.bind(this, setFormData),
                                    value: formdata.username
                                }} />

                        </View >

                        <View style={{ top: 50 }}>
                            {formdata.isTouched1 && formdata.hasError1 && formdata.password &&
                                (<ErrorText additionalStyle={{ marginTop: 20 }} > Password must be more than 8 characters </ErrorText>)}
                            <Input placeholder="Enter Password" label="Password" style={[{ borderColor: Colors.primaryColor400, color: Colors.primaryColor400, borderWidth: 1.5 }, formdata.hasError1 &&
                                formdata.isTouched1 && formdata.password && styles.inputFormStyle]} textConfigs={{
                                    onChangeText: HandleFieldsUserPassword.bind(this, setFormData),
                                    value: formdata.password,
                                    secureTextEntry : true
                                }} />
                        </View>
                        <FormButton onPress={Submit} additionalStyle={{ top: 50, padding: 13, backgroundColor: Colors.primaryColor100 }} textStyle={{ color: Colors.primaryColor800, fontSize: 18 }} disabled={Boolean(formdata.hasError) ||
                            Boolean(formdata.hasError1)} ButtonTitle="Sign In" submitting={isSubmitting} loaderColor={Colors.primaryColor800} />
                    </KeyboardAvoidingView>

                </View>

            </View>
        </PageGradient>

    )
}

export default AuthLogin;

const styles = StyleSheet.create({
    AuthContainer: {
        flex: 1,
        backgroundColor: Colors.primaryColor800
    },
    AuthItems: {
        justifyContent: 'center',
        alignItems: 'center',
        left: -15,
        marginTop: 150
    },
    welcomeText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: Colors.primaryColor400,
        top: 34,
        textAlign: 'center',
        margin: 5,
        left: 22
    },
    continue: {
        // color :Colors.primaryColor100
        top: 40,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15,
        color: Colors.primaryColor100,
        left: 18
    },
    createAccount: {
        flexDirection: 'row',
        top: 25
    },
    createNewAccountText: {
        fontSize: 14,
        color: Colors.primaryColor100,
        fontWeight: 'bold'
    },
    phoneIconStyle: {
        top: 50,
        left: 10
    },
    inputFormStyle: {
        borderWidth: 1,
        borderColor: 'red'
    }
})
