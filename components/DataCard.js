import { View, Text, StyleSheet } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import Colors from "../util/Color";
import { TouchableOpacity } from "react-native-gesture-handler";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import ActivityDetailPage from "../screens/CustomerDetailPage";
import { Dimensions } from "react-native";
import MiddleCard from "./MiddleCard";
import { manageState } from "../redux/Reducers/State";
import { useDispatch } from "react-redux";
const DataCard = ({ firstname, phone, username, accountnumber, id, customer, activity }) => {
    const dispatch = useDispatch();

    const navigation = useNavigation();
    const width = Dimensions.get('window').width;
    const navigateToTransactionDetail = () => {
        if (customer) {
            navigation.navigate('Customer Details', {
                data_id: id
            });
        }




        // navigation.navigate('HomeScreen', { screen: 'Active' });
    }
    return (
        <View style={[styles.flatlistContainer, { margin: width > 360 ? 7 : 25, top: width > 360 ? 0 : -30 ,width : width > 360 ? 345 : 300 }]}>
            <View style={[styles.flatListActivity, { left: width > 360 ? 10 : 0 }]}>
                <Feather name='activity' size={30} color={Colors.primaryColor800} />

            </View>
            <View style={styles.flatListTextContainer}>
                <Text style={styles.flatlistText} >
                    {accountnumber}
                </Text>
                {/* <Text style={styles.date}>{phone}</Text> */}
            </View>
            <View style={styles.flatListTextContainer}>
                <Text style={[styles.flatlistText, { right: 25, width: 100, paddingVertical: 0, bottom: 5 }]} numberOfLines={1} ellipsizeMode="tail">
                    {firstname}
                </Text>
            </View>

            <View>
                <Pressable android_ripple={{ color: Colors.primaryColor100 }} style={({ pressed }) => [styles.view, pressed ? styles.buttonPress : null]} onPress={navigateToTransactionDetail} ><Text style={styles.viewText}> <Feather name='eye' size={25} color={Colors.primaryColor800} /> </Text></Pressable>
            </View>
        </View>
    )
}

export default DataCard;

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
    flatlistContainer: {
        width: width > 360 ? 360 : 300,
        flex: 1,
        borderColor: Colors.primaryColor800,
        borderWidth: 2,
        height: 70,
        textShadowColor: 'rgba(25,11,123,0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
        //borderRadius: 1,
        flexDirection: 'row',
        shadowColor: 'blue',
        //padding: 1,
        backgroundColor: Colors.primaryColor800,
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 6,
        shadowOpacity: 0.25,
        elevation: 12,
        borderRadius: 10,
        left: width > 360 ? 15 : 5,
        // marginRight: 30,
        marginBottom: width > 360 ? 9 : -10,

    },
    flatlistText: {
        marginLeft: 15,
        margin: 2,
        color: Colors.primaryColor400,
        fontSize: 16,
        fontWeight: 'bold',
        top: 20

    },

    card: {
        flex: 1,
        // minHeight: 450,
        //marginTop: 30,
        //marginBottom: 30,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        marginLeft: 15,
        shadowColor: 'blue',
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 6,
        shadowOpacity: 0.25,
        paddingBottom: 2,
        elevation: 0.1,
        top: 0,
        height: 30

    },
    flatListTextContainer: {
        flex: 1,
        paddingBottom: 1,
        paddingHorizontal: 2
    },
    flatListActivity: {
        marginTop: 15,
        marginLeft: 10,
        backgroundColor: Colors.primaryColor400,
        height: 30,
        width: 30,
        borderRadius: 50
    },
    date: {
        color: Colors.primaryColor400,
        marginLeft: 15,
        fontWeight: 'bold',
        fontSize: 12
    },
    view: {
        backgroundColor: Colors.primaryColor400,
        width: 70,
        borderRadius: 10,
        padding: 7,
        top: width > 360 ? 2 : 0,
        left: width > 360 ? -30 : -10,
        marginTop: 12,


    },
    viewText: {
        fontSize: 17,
        textAlign: 'center',
        fontWeight: 'bold',
        top: 2,
        color: Colors.primaryColor800

    },
    buttonPress: {
        opacity: 0.5
    }
})