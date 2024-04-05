import { View, Text, StyleSheet, TextInput, Pressable, ScrollView,TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { Colors } from "../../Utils/Colors";
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useSelector, useDispatch } from "react-redux";
import { storeUser, removeUser } from "../../Redux/AuthUser";
import { CustomTextInput } from "../../Components/CustomTextInput";
import { Button } from "../../Components/Button";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
const AuthSignUp = ({ navigation }) => {
    const dispatch = useDispatch();
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");

    const redirectToLogin = () => {
        console.log('hello world')
        navigation.navigate('sign-up');
    }
    const Submit = () => {
        console.log(mobile, password)
        if (mobile === '0543661399' && password === '1234') {
            console.log('login successful');
            //if login is successful store token
            dispatch(storeUser({ userToken: mobile }))
        }

        console.log('login error');
    }
    const authUser = useSelector((state) => state.authUser.user);
    console.log('hello', authUser);

    return (
        <ScrollView>
        <View style={styles.AuthContainer}>
        <Ionicons name="arrow-back-outline" size={28} color={Colors.primaryColor100}  style={{left : 20}}/>
            <View style={styles.AuthItems}>
                <Text style={styles.createAccount}>Create Account</Text>
                <Text style={styles.create}>Create a new account.</Text>
                <View>
                    <CustomTextInput value={mobile} onChangeData={(data) => setMobile(data)} iconName="phone" placeholder="Full Name"
                        style={{ bottom: 10 }} iconStyle={{ top: 35, left: 10 }} />
                </View>
                <View>
                    <CustomTextInput value={password} onChangeData={(data) => setPassword(data)} iconName="lock" iconStyle={{ top: 25, left: 10 }} placeholder="Password"
                        style={{ bottom: 23 }} />
                </View>
                <View>
                    <CustomTextInput value={password} onChangeData={(data) => setPassword(data)} iconName="lock" iconStyle={{ top: 10, left: 10 }} placeholder="Password"
                        style={{ bottom: 35 }} />
                </View>
                <View>
                    <CustomTextInput value={password} onChangeData={(data) => setPassword(data)} iconName="lock" iconStyle={{ top: 0, left: 10 }} placeholder="Password"
                        style={{ bottom: 47 }} />
                </View>
                <View>
                    <CustomTextInput value={password} onChangeData={(data) => setPassword(data)} iconName="lock" iconStyle={{ top:-15, left: 10 }} placeholder="Password"
                        style={{ bottom:60}} />
                </View>
                <Button Submit={Submit} style={{ top: -60 }}  text="SIGN UP" />
                <View style={styles.LoginAccount}>
                    <View><Text style={{ fontSize: 14 }}>Already have An Account?</Text></View>
                    <TouchableOpacity onPress={redirectToLogin}><Text style={styles.createNewAccountText}> Login</Text></TouchableOpacity>
                </View>
            </View>
        </View>
        </ScrollView>
        
    )
}




export default AuthSignUp;

const styles = StyleSheet.create({
    AuthContainer: {
        flex: 1,
        marginTop: 50,

    },
    AuthItems: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    createAccount: {
        fontSize: 25,
        fontWeight: 'bold',
        padding: 5,
        color: Colors.primaryColor100,
        top : - 4
    },
    create: {
        // color :Colors.primaryColor100
        bottom: 5
    },
    LoginAccount: {
        flexDirection: 'row',
        bottom : 50
    },
    createNewAccountText: {
        fontSize: 14,
        color: Colors.primaryColor100,
        fontWeight: 'bold'
    },
    phoneIconStyle: {
        top: 50,
        left: 10
    }
})
