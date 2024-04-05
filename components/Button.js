import { Pressable, StyleSheet ,Text} from "react-native";
import Colors from "../util/Color";
export const Button = ({Submit ,style ,text,styles1,disabled}) => {
    return (
        <Pressable style={({ pressed }) => [styles.loginButton, pressed && styles.buttonPressed ,style]} disabled={disabled} onPress={Submit}>
            <Text style={[styles.loginText,styles1]}>{text}</Text>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    loginButton: {
        backgroundColor: Colors.primaryColor800,
        width: 298,
        paddingVertical: 13,
        marginTop: 20,
        borderRadius: 5,
        shadowOffset: { width: -2, height: 4 },
        shadowColor: '#C0C0C0',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        top : 5
    },
    loginText: {
        textAlign: 'center',
        color: Colors.primaryColor800,
        fontWeight: 'bold',
        fontSize: 16
    },
    buttonPressed: {
        opacity: 0.5
    }
})