
import { View, StyleSheet } from "react-native";
import Colors from "../util/Color";

const MiddleCard = ({ children, addstyle }) => {
    let middleCardStyles = [styles.MiddleCard]

    // if (!isDashboard ) {
    //     middleCardStyles.push(styles.dashboardAnalyser)
    // }
    return <View style={[...middleCardStyles ,addstyle]}>
        {children}
    </View>
}

export default MiddleCard;
const styles = StyleSheet.create({
    MiddleCard: {
       // backgroundColor: Colors.primaryColor100,
        //marginTop: 0,
        //borderRadius: 10,
        maxWidth: 380,
        marginLeft: 12,
        //elevation: 8,
        // shadowColor: 'black',
        // shadowOffset: { width: 10, height: 10 },
        //shadowRadius: 6,
       // shadowOpacity: 0.25,
       // borderColor: Colors.primaryColor400,
       // borderWidth: 2,
    
    },
    dashboardAnalyser: {
        flex: 1
    }
})