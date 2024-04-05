import { ActivityIndicator, StyleSheet ,View } from "react-native";
import Colors from "../util/Color";

const PageLoader = ({color ,PageStyle}) => {
    return (<View >
        <ActivityIndicator style={[styles.loaderStyle,PageStyle]} color={Colors.primaryColor800} /></View>
    )
}


export default PageLoader;

const styles = StyleSheet.create ({
    loaderStyle : {
       transform: [{ scaleX: 5 }, { scaleY: 5 }],
      marginLeft : 20,
      position : 'absolute',
      zIndex : 100
    }
})
