import { ActivityIndicator, StyleSheet ,View } from "react-native";


const ButtonLoader = ({color}) => {
    return (<View >
        <ActivityIndicator style={styles.loaderStyle} color={color} /></View>
    )
}


export default ButtonLoader;

const styles = StyleSheet.create ({
    loaderStyle : {
       transform: [{ scaleX: 2 }, { scaleY: 2 }],
      marginLeft : 20
    }
})
