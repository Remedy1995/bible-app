import { Modal, StyleSheet, View, Text,Pressable } from "react-native";
// import { Colors } from "../Utils/Colors";
// import { AntDesign } from "@expo/vector-icons";
// import { Button } from "./Button";
// import { CustomTextInput } from "./CustomTextInput";


export default CustomModal = ({ modalOpen, setModalOpen,children ,additionalStyle }) => {
    console.log('modal', modalOpen)
    return (

<Modal visible={modalOpen} animationType="fade" transparent={true}  >
<Pressable style={[{backgroundColor : 'rgba(0,0,0,0.8)' },additionalStyle]} onPress={()=>setModalOpen(!modalOpen)}>
           {children}
           </Pressable>
        </Modal>
    );

}

const styles = StyleSheet.create({
   
})