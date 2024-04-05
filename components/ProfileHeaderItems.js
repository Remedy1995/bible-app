import { View ,Text ,StyleSheet} from "react-native";
import Colors from "../util/Color";
export const ProfileHeaderItems = ({children,style,style1}) =>{
    return (
        <View style={[styles.generalStyle,style]}>
        <Text style={[styles.generalText,style1]}>{children}</Text>
    </View>
    )
}
const styles = StyleSheet.create ({
    generalStyle : {
        backgroundColor: Colors.primaryColor600,
         height: 50 ,
         top : -40,
         justifyContent : 'center'
   },
   generalText : {
    marginLeft : 12,
    fontSize : 18 ,
    fontWeight : 'bold',
    color :Colors.primaryColor100}

})


