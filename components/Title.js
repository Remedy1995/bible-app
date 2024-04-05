import { Text, StyleSheet } from "react-native";
import Colors from "../util/Color";

const Title = ({children ,style}) => {
return  <Text style={[styles.dashboard ,style]}>{children}</Text>
}


export default Title;

const styles = StyleSheet.create({
    dashboard: {
        color: Colors.primaryColor700,
        marginLeft: 20,
        marginTop: 20,
        fontSize: 18,
        fontWeight: '700',
        // textShadowColor: 'rgba(25,11,123,0.5)',
        // textShadowOffset: { width: 0.8, height: 1 },
        // textShadowRadius: 3,
    }
})


