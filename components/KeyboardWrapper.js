import { KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard } from "react-native";

export const KeyboardWrapper = ({ children }) => {
    return (<KeyboardAvoidingView>
        <ScrollView >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                {children}
            </TouchableWithoutFeedback>
        </ScrollView>
    </KeyboardAvoidingView>)
}