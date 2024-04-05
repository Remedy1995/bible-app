import { View, Text, StyleSheet } from "react-native";



const Hello = () => {
    return <View style={styles.container}>
        <Text style={styles.containerText}>Hello World</Text>
    </View>
}

export default Hello;

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: 'red',
            justifyContent : 'center',
            alignItems : 'center',
        },
        containerText : {
            color : 'white',
            fontWeight : 'bold',
            fontSize : 20
        }
    }
)