import React from "react";
import { View ,StyleSheet ,Text} from "react-native";
import Colors from "../util/Color";
import FormButton from "./FormButton";
//the query text prop recieves a prop in a form of a question on what operation to do
//the left button text prop recieves a value to be passed to the left button
//the right button text prop recieves a value to be passed to the right button
//the left button handler recieves a prop function to toggle the dialog off 
//the right button handler recieves a prop function to make an operation
const CustomDialogBox = ({queryText , LeftButtonText ,RightButtonText , leftButtonHandler ,rightButtonHandler ,addtionalStyle,modalStyle}) =>{
    return(
        <View style={[styles.dialogBoxContainer,addtionalStyle,modalStyle]}>
        <View><Text style={styles.queryTextStyle}>{queryText}</Text></View>
        <View style={styles.buttonRow} >
            <FormButton additionalStyle={styles.cancelButton} onPress={leftButtonHandler} ButtonTitle={LeftButtonText} />
            <FormButton additionalStyle={styles.logoutButton}  onPress={rightButtonHandler}  ButtonTitle={RightButtonText} />
        </View>
    </View>
    )
}

export default CustomDialogBox;

const styles = StyleSheet.create({
dialogBoxContainer : {
    height: 200, 
    backgroundColor: 'white', 
    top: 200, 
    left: 20, 
     borderRadius: 10
 },
 queryTextStyle : {
    textAlign: 'center', 
    top: 40,
     fontSize: 20,
      fontWeight: 'bold' 
 },
 buttonRow : {
    flexDirection: 'row', 
    left: -17 
 },
 cancelButton: {
    top: 50,
    padding: 13,
    backgroundColor: Colors.secondaryColor100,
    flex: 1
},
logoutButton: {
    top: 50,
    padding: 13,
    backgroundColor: Colors.secondaryColor200,
    flex: 1
}
})
