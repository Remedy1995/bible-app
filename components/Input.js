import { Text ,View ,TextInput ,StyleSheet  ,Platform ,KeyboardAvoidingView ,ScrollView } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Colors from "../util/Color";

const Input =({label ,style , textConfigs ,placeholder ,editable ,onPressIn })=>{
    return (
        <View>
            <Text style={styles.label}>{label}</Text>
            <TextInput   style={[styles.input,style]} placeholder={placeholder} {...textConfigs}
             editable={editable} onPressIn={onPressIn}/>   
            </View>     
    )
}

export default Input;

const styles =StyleSheet.create({

    Container :{
     marginTop : 20
    },
    input : {
       
        padding :14,
        marginLeft : 30,
       borderColor : Colors.primaryColor800,
       borderWidth : 1,
       borderRadius : 10,
       //elevation: 1,
      // shadowOffset: { width: 1, height: 1 },
      // shadowRadius: 6,
      // shadowOpacity: 0.25,
       shadowColor: 'white',
       fontSize : 16,
       margin :2,
       width :300,
       color :'black',
       opacity: 0.7

    },
    label :{
        marginLeft : 30,
        margin : 7,
        fontSize : 15,
        // opacity : 0.5,
        color : Colors.primaryColor800,
        fontWeight : 'bold'
       
    }
})