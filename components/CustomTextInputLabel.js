import { Text,StyleSheet } from "react-native";
import Colors from "../util/Color";


export default CustomTextInputLabel =({children,style})=>{
return (
    <Text style={[styles.labelStyle,style]}>{children}</Text>
)
}


const styles = StyleSheet.create({
labelStyle :{
    fontSize : 14 ,
     top : 20 ,
     left : 30 ,
     fontWeight : 'bold',
     color : 'white'
}
})