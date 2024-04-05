import { Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../util/Color";
export const OutlineButton = ({ onPress, icon, children }) => {

    return (<Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed]} onPress={onPress} >
        <Ionicons name={icon} size={18} color={Colors.primary100} />
        <Text>{children}</Text>
    </Pressable>)

}


const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 2,
        paddingVertical: 6,
        margin: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.primary100
    },
    pressed: {
        opacity: 0.7
    },
    icon: {
        marginRight: 6
    },
    text: {
        color: Colors.primary800
    }
})