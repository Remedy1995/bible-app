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
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
const GetStarted = () => {
    const navigation = useNavigation();
    const width = Dimensions.get('window').width;
    const dispatch = useDispatch();
    const Redirect = () => {
        navigation.navigate('phone-verification');
    }

    return (
       
            <View style={styles.AuthContainer}>
                {/* <Ionicons name="arrow-back-outline" size={28} color={Colors.primaryColor100} style={{ left: 20 }} /> */}
                <View style={styles.AuthItems}>
                    <Text style={styles.Registration}>Registration</Text>
                    <View style={styles.getStartedImageWrapper}>
                        <Image source={{ uri: 'https://img.freepik.com/free-vector/group-construction-workers-cartoon-characters_1308-90754.jpg?w=2000' }} style={[styles.getStartedPicture , {width: width - 20 }]} />
                    </View>
                    <Text style={styles.getStarted}>Let's get started</Text>

                    <Button Submit={Redirect} text="Sign Up" styles1={{fontSize : 17}} />

                </View>
            </View>
      

    )
}




export default GetStarted;

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
        top: 0
    },
    getStarted: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.primaryColor100,
        top: 10,
        margin :10,
       
    },
    getStartedImageWrapper: {
        top:15
    }
    ,getStartedPicture : {
         height: 420 
    }
})
