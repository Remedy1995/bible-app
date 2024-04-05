import { View, TextInput, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import Colors from "../util/Color";
import { KeyboardWrapper } from "./KeyboardWrapper";
import { KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native";

export const CustomTextInput = ({ value, onChangeData, iconName, placeholder ,secureTextEntry,style ,keyboardType ,maxLength,
iconStyle }) => {
    return (
        <>
            <Feather name={iconName} size={25} color={Colors.primaryColor100} style={iconStyle} />
           
            <TextInput style={[styles.inputText ,style]} placeholder={placeholder} placeholderTextColor={Colors.PrimaryColor500}
                onChangeText={onChangeData} value={value}
                secureTextEntry ={secureTextEntry}  keyboardType={keyboardType} maxLength={maxLength}/>
                
        </>
    )
}

const styles = StyleSheet.create({
    inputText: {
        backgroundColor: 'white',
        width: 298,
        paddingVertical: 15,
        marginTop: 20,
        borderRadius: 5,
        shadowOffset: { width: -2, height: 4 },
        shadowColor: '#C0C0C0',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        paddingLeft :30,
        fontSize : 20
    },
})