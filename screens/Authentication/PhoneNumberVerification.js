import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { Image } from 'react-native';
import { Colors } from "../../Utils/Colors";
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useSelector, useDispatch } from "react-redux";
import { storeUser, removeUser } from "../../Redux/AuthUser";
import { CustomTextInput } from "../../Components/CustomTextInput";
import { Dimensions } from "react-native";
import { Button } from "../../Components/Button";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
const PhoneNumberVerification = ({ navigation }) => {

    const width = Dimensions.get('window').width;
    console.log('data', width)
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
       
            <View style={styles.AuthContainer}>
                {/* <Ionicons name="arrow-back-outline" size={28} color={Colors.primaryColor100} style={{ left: 20 }} /> */}
                <View style={styles.AuthItems}>
                    <Text style={styles.Registration}>Registration</Text>
                    <View style={styles.getStartedImageWrapper}>
                        <Image source={{ uri: 'https://media.istockphoto.com/id/906787054/vector/child-as-a-carpenter.jpg?s=170667a&w=0&k=20&c=nkv2WWX2OrtPgsOKk_NLUEAoU5Q4a43V3_yDUWjuZt8=' }} style={[styles.getStartedPicture , {width: 150,height : 150} ]} />
                    </View>
                    <Text style={styles.phoneNumber}>Enter your phone number</Text>
                    <Text style={styles.textMessage}>We will send a code via sms {`\n`} to
                    your phone number </Text>
                   
                    <CustomTextInput value={password} onChangeData={(data) => setPassword(data)}  iconStyle={{ top:80, left: -120 }} keyboardType='number-pad' placeholder="Enter Phone Number" style={{marginTop : 40,padding: 15}}
                         />
               

                    <Button Submit={Submit} text="Send Message" styles1={{fontSize : 17}} />

                </View>
            </View>
      

    )
}




export default PhoneNumberVerification;

const styles = StyleSheet.create({
    AuthContainer: {
        flex: 1,
        backgroundColor: 'white'

    },
    AuthItems: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
       
    },
    Registration: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.primaryColor100,
        top: 0,
  
    },
    phoneNumber: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.primaryColor100,
        marginTop : 20,
        marginLeft : 0,
        top : 10
    },
    textMessage: {
        fontSize: 16,
        fontWeight: 'normal',
        color: Colors.primaryColor500,
        lineHeight : 25,
        top: 20,
        marginTop : 2,
        //margin: 20,
    },
    getStartedImageWrapper: {
        marginTop: 70
    }
    ,getStartedPicture : {
         //height: 420 
    }
})
