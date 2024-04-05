import { View, StyleSheet } from "react-native";
const Card = ({ children ,style}) => {
    return (
        <View style={[styles.myCard,style]}>
            {children}
        </View>
    )
}

export default Card;

const styles = StyleSheet.create({
    myCard: {
        backgroundColor: 'white',
        Maxheight: 2,
        marginTop: 50,
        borderRadius: 13,
        maxWidth: 380,
        marginHorizontal: 24,
        marginLeft: 20,
        elevation: 8,
        shadowColor: 'black',
        shadowOffset: { width: 10, height: 10 },
        shadowRadius: 6,
        shadowOpacity: 0.25,
        paddingBottom: 20,
        left :2

    }
})