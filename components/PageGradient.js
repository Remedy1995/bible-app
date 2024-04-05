import { LinearGradient  } from "expo-linear-gradient";
import { StyleSheet } from "react-native";

export default PageGradient = ({ children,style }) => {

    // <LinearGradient style={[styles.rootScreen,style]} colors={['#36D1DC', '#5B86E5']}
    return <LinearGradient style={[styles.rootScreen,style]} colors={['#FFFFFF', '#FFFFFF']}
        start={{ x: 0, y: 0}}
        end={{ x: 0, y: 1}}>
        {children}
    </LinearGradient>
}

const styles = StyleSheet.create ({
    rootScreen: {
        flex: 1,
    }
})