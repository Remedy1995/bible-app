import { StyleSheet , Text } from "react-native";

export default ErrorText = ({ children ,additionalStyle }) => {
    return <Text style={[additionalStyle,styles.labelStyle]}>{children}</Text>
}


const styles = StyleSheet.create({
    labelStyle : {
        color : 'red',
        marginLeft : 30,
        fontWeight : 'bold'
    }
})
