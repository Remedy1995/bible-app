import { Text, StyleSheet, Pressable } from "react-native";
import ButtonLoader from "./ButtonLoader";
import Colors from "../util/Color";
const FormButton = ({ onPress, disabled,additionalStyle, ButtonTitle, submitting,textStyle ,loaderColor }) => {
    return (<Pressable style={(pressed) => pressed && [styles.button,{...additionalStyle},disabled ? styles.pressed : null]} onPress={onPress} disabled={disabled}>
        <Text style={[styles.buttonText,textStyle]}> {submitting ? <ButtonLoader color={loaderColor} /> : ButtonTitle}</Text></Pressable>)
}


export default FormButton;


const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primaryColor800,
        width: 300,
        padding: 18,
        marginLeft: 30,
        marginTop: 15,
        borderRadius: 12
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 18,
        color: Colors.primaryColor400,
        fontWeight: 'bold'
    },
    pressed: {
        opacity: 0.5
    }
})