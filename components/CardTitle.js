import { Text ,StyleSheet} from "react-native";
import Colors from "../util/Color";
const CardTitle = ({children,additionalStyle})=>{
return (
<Text style={[styles.Signup,additionalStyle]}>{children}</Text>)
}

export default CardTitle;


const styles = StyleSheet.create({
    Signup: {
        color: Colors.primaryColor800,
        fontSize: 23,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 15,
        // textShadowColor: 'rgba(25,11,123,0.5)',
        textShadowOffset: { width: 0.5, height: 0.5 },
        textShadowRadius: 2,
        margin : 10
    }
})