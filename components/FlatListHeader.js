import { View, Text, StyleSheet } from "react-native";
import Colors from "../util/Color";
import { FontAwesome } from '@expo/vector-icons'; 
import { Dimensions } from "react-native";

const FlatListHeader = ({ subHeader, subHeaderActive, style }) => {
   
    return <View style={[styles.middleCardheader, style]}>
        <Text style={styles.subHeader}>{subHeader}</Text>
        <FontAwesome name="sliders" size={29} style={styles.sliderStyle} color={Colors.primaryColor400} />
        <Text style={styles.subHeaderActive}>{subHeaderActive} </Text>
        
    </View>
}

export default FlatListHeader;

const width = Dimensions.get('screen').width;
const styles = StyleSheet.create({
    middleCardheader: {
        backgroundColor: Colors.primaryColor800,
        height: 60,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
       borderBottomColor : Colors.primaryColor400,
        borderWidth :0.7,
        marginTop : 20,
        marginBottom : 10,
        marginLeft:width >360 ? 6 :26,
        marginRight :width >360 ? 6 :22
    },

    subHeader: {
        fontSize: 19,
        color: Colors.primaryColor400,
        fontWeight: 'bold',
        // textShadowColor: 'rgba(25,11,123,0.5)',
        //textShadowOffset: { width: 1, height: 1 },
        //textShadowRadius: 3,
        marginLeft: 0,
        marginTop: 12,
    },
    subHeaderActive: {
        borderRadius: 20,
        height: 30,
        width: 100,
        borderColor: Colors.primaryColor400,
        borderWidth: 2,
        marginTop: 14,
        fontSize: 16,
        marginRight: 7,
        textAlign: 'center',
        fontWeight: 'bold',
        padding : 3,
        color:Colors.primaryColor800,
        // textShadowColor: 'rgba(25,111,123,0.2)',
        // textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 3,
        backgroundColor: Colors.primaryColor400

    },
    sliderStyle : {
        marginTop : 10
    }
})