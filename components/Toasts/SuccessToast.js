import { View ,Text ,StyleSheet } from "react-native";
import Animated, { FadeInRight, FadeInUp, FadeOutUp } from "react-native-reanimated";
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { TouchableOpacity } from "react-native-gesture-handler";
const SuccessToast = ( {onPress ,successMessage ,  successStatus ,style})=>{
    return (
        <Animated.View entering={FadeInRight} exiting={FadeOutUp}
        style={[styles.notificationContainer,style]}>
        <View style={styles.notificationRow}>
            <FontAwesome5 name="info-circle" size={24} color="black" />
            <Text style={styles.success}>{ successStatus}</Text>
            <TouchableOpacity onPress={onPress} style={styles.close} >
            <AntDesign name="closesquare" size={24} color="black" />
            </TouchableOpacity>
        </View>
        <Text  style={styles.message} >{successMessage}</Text>
    </Animated.View>
    )
}

const styles = StyleSheet.create ({
    notificationRow: {
        // flex: 1,
        flexDirection: 'row',
        marginLeft: 10,
        padding: 10,
    },
    notificationContainer: {
        // backgroundColor: '#40A6DC',
        width : 500,
        marginLeft :20,
        marginTop : 20,
        shadowColor :'blue',
        shadowOffset : {width : 0 ,height : 1},
        shadowRadius : 25,
        elevation : 8,
        shadowOpacity : 0.5,
        borderRadius : 10,
        paddingBottom : 20
    },
    success: {
        marginLeft: 10,
        fontWeight: 'bold',
        fontSize : 16,
        color : 'white'
    },
    close :{
        marginLeft : 250
    },
    message : {
        marginTop :  -15,
        marginLeft : 50,
        fontSize : 15,
        color : 'white'
    }
})

export default SuccessToast;