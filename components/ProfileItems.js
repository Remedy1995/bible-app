import { Text, View, Pressable, StyleSheet, Modal, ScrollView, KeyboardAvoidingView } from "react-native";
import Colors from "../util/Color";
import { MaterialIcons } from '@expo/vector-icons';
// import { KeyboardWrapper } from "./KeyboardWrapper";
import { AntDesign } from "@expo/vector-icons";
import { Alert } from "react-native";
import { useState } from "react";
import CustomModal from "./CustomModal";
import { TouchableOpacity } from "react-native-gesture-handler";
import { CustomTextInput } from "./CustomTextInput";
import CustomTextInputLabel from "./CustomTextInputLabel";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button } from "./Button";
import { useNavigation } from "@react-navigation/native";
import { Platform } from "react-native";
import { SafeAreaView } from "react-native";
import { Dimensions } from "react-native";
import { useEffect } from "react";
import { ChangeUserPasswordService } from "../Services/Services";

export const ProfileItems = ({ items, style, show, name, userid }) => {
    const width = Dimensions.get('window').width;
    const navigation = useNavigation();
    const [modalOpen, setModalOpen] = useState(false);
    const [oldpassword, setOldPassword] = useState("");
    const [newpassword, setNewpassword] = useState("");

    function ChangePassword() {
        console.log('userid', userid)
        ChangeUserPasswordService(userid, {
            oldpassword: oldpassword,
            newpassword: newpassword
        }).then((data) => {

            console.log('This is the result', data);


            Alert.alert(
                "Success",
                   data.success,
                [
                    {
                        text: "Cancel"
                    },
                    {
                        text: "OK"
                    }

                ]

            )

            //reset fields 

            setNewpassword("");
            setOldPassword("");
        }).catch(error => {
            console.log('My error', error?.response?.data.error)

            Alert.alert(
                "Error",
                error?.response?.data.error,
                [
                    {
                        text : "Cancel"
                    },
                    {
                        text : "OK"
                    }
    
                ]
              )
        })

        console.log('keyedpassword', oldpassword, newpassword);
    }
    const clickMe = () => {
        setModalOpen(true)
        console.log('This has been clicked', items)
    }
    let showModalTypeScreen = (
        <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
                <View style={{ flex: 1 }} ><Text style={styles.modalHeadertext}>{items.toUpperCase()}</Text>
                </View>
                <View><AntDesign name='closesquare' style={{ paddingRight: 30 }} size={40} color={Colors.primaryColor800} onPress={() => setModalOpen(!modalOpen)} />
                </View>
            </View>
            <View style={{
                left: width > 360 ? 30 : 0,
                marginTop: width > 360 ? 20 : 0
            }}><CustomTextInput placeholder="Old Password" /></View>
        </View>
    )
    if (items === "Change Password") {
        showModalTypeScreen =

            <View style={[styles.modalContainer, { top: '58%', height: '77%', marginRight: -40 }]}>
                <View style={styles.modalHeader}>
                    <View style={{ flex: 1 }} ><Text style={styles.modalHeadertext}>{items.toUpperCase()}</Text>
                    </View>
                    <View><AntDesign name='closesquare' style={{ right: 33 }} size={30} color={Colors.primaryColor800} onPress={() => setModalOpen(!modalOpen)} />
                    </View>
                </View>

                {/* <View style={{
                        left: width > 360 ? 30 : 0,
                        marginTop: width > 360 ? 20 : 0
                    }}> */}
                <View style={{ backgroundColor: Colors.primaryColor800, flex: 1, marginLeft: 0 }}>
                    <KeyboardAwareScrollView extraHeight={140} enableOnAndroid>

                        <CustomTextInputLabel>OLD PASSWORD</CustomTextInputLabel>
                        <CustomTextInput style={styles.customTextInputStyle} onChangeData={(data) => setOldPassword(data)}  secureTextEntry={true}/>
                        <CustomTextInputLabel>NEW PASSWORD</CustomTextInputLabel>

                        <CustomTextInput style={styles.customTextInputStyle} onChangeData={(data) => setNewpassword(data)} secureTextEntry={true} />

                        <Button text="CHANGE PASSWORD" styles1={{ top: -3 }} style={{ top: -2, left: 30, width: 280, borderRadius: 20, paddingVertical: 15, backgroundColor: Colors.primaryColor100 }}
                            Submit={ChangePassword} />
                    </KeyboardAwareScrollView>

                </View>

            </View>

    }

    if (items === "Edit Your Phone") {
        showModalTypeScreen =
            <View style={[styles.modalContainer, { top: '38%', height: '85%', zIndex: 1 }]}>
                <View style={styles.modalHeader}>
                    <View style={{ flex: 1 }} ><Text style={styles.modalHeadertext}>{items.toUpperCase()}</Text>
                    </View>
                    <View><AntDesign name='closesquare' style={{ paddingRight: 33 }} size={30} color={Colors.primaryColor000} onPress={() => setModalOpen(!modalOpen)} />
                    </View>
                </View>
                <CustomTextInputLabel>ENTER PHONE</CustomTextInputLabel>
                <CustomTextInput style={styles.customTextInputStyle} />
                <Button text="EDIT PHONE" styles1={{ top: -3 }} style={{ top: -2, left: 30, width: 280, borderRadius: 20, paddingVertical: 15 }} />
            </View>


    }
    if (items === "Change Email Address") {
        showModalTypeScreen =
            <View style={[styles.modalContainer, { top: '60%', height: '95%' }]}>
                <View style={styles.modalHeader}>
                    <View style={{ flex: 1 }} ><Text style={styles.modalHeadertext}>{items.toUpperCase()}</Text>
                    </View>
                    {/* <View>
                        <AntDesign name='closesquare' style={{ paddingRight: 33 }} size={30} color={Colors.primaryColor000} onPress={() => setModalOpen(!modalOpen)} />
                    </View> */}
                </View>
                <ScrollView>
                    <View style={{
                        left: width > 360 ? 30 : 0,
                        marginTop: width > 360 ? 10 : 0
                    }}>
                        <CustomTextInputLabel>ENTER EMAIL ADDRESS</CustomTextInputLabel>
                        <CustomTextInput style={styles.customTextInputStyle} />
                        <Button text="CHANGE EMAIL ADDRESS" styles1={{ top: -3 }} style={{ top: -2, left: 30, width: 280, borderRadius: 20, paddingVertical: 15 }} />
                    </View>
                </ScrollView>
            </View>
    }

    if (items === "About App") {
        showModalTypeScreen =

            <View style={[styles.modalContainer, { top: '58%', height: '77%', marginRight: -40 }]}>
                <View style={styles.modalHeader}>
                    <View style={{ flex: 1 }} ><Text style={styles.modalHeadertext}>{items.toUpperCase()}</Text>
                    </View>
                    <View><AntDesign name='closesquare' style={{ right: 33 }} size={30} color={Colors.primaryColor800} onPress={() => setModalOpen(!modalOpen)} />
                    </View>
                </View>

                {/* <View style={{
                        left: width > 360 ? 30 : 0,
                        marginTop: width > 360 ? 20 : 0
                    }}> */}
                <View style={{ backgroundColor: Colors.primaryColor800, flex: 1, marginLeft: 0 }}>
                    <View>
                        <Text>THIS APP IS A MOBILE APP FOR 37 GPRTU
                            FOR THE PURPOSES OF SUSU CONTRIBUTIONS
                            SUCH AS MAKING DEPOSITS AND WITHDRAWALS
                            ALSO TRACKS DAY TO DAY TRANSACTIONS.{"\n"}
                            APP SHOULD BE USED FOR ITS   DESIGNATED PURPOSES AND NOTHING ELSE
                            IT IS A CRIMINAL ACT TO MISUSE OR USE THIS APP IN AN ILLEGAL  ACTIVITY. </Text>
                    </View>

                </View>

            </View >

    }
    return (
        <>
            <View>
                <CustomModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
                    {showModalTypeScreen}
                </CustomModal>
            </View>
            <>
                <View>
                    <Pressable onPress={clickMe} style={({ pressed }) => pressed && { opacity: 0.5 }}>
                        <View style={[styles.ItemsContainer, style]}>
                            <View style={{ flex: 1 }}>
                                <MaterialIcons name={name} size={25} color={Colors.primaryColor800} />
                            </View>
                            <View style={{ flex: 1, marginLeft: -220 }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{items}</Text>
                            </View>
                            <View style={{ flex: 1, marginRight: -240 }}>
                                {show && (<AntDesign name='right' size={25} color={Colors.primaryColor500} />)}
                            </View>
                        </View>
                    </Pressable>
                </View>
            </></>


    )
}

const styles = StyleSheet.create({
    ItemsContainer: {
        flexDirection: 'row',
        top: -30,
        marginLeft: 12,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingBottom: 12
    },
    modalContainer: {
        top: '30%',
        height: '70%',
        backgroundColor: Colors.primaryColor100,

    }
    ,
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: 'white',

    },
    modalHeadertext: {
        marginLeft: 40,
        flex: 1,
        fontSize: 18,
        marginTop: 2,
        color: Colors.primaryColor800,
        fontWeight: 'bold'
    },

    appInfoText: {
        color: 'white',
        fontSize: 18,
        lineHeight: 25,
        fontWeight: 'bold',
        color: Colors.primaryColor100,
        margin:30,
        paddingRight : 5,
    },
    customTextInputStyle: {
        width: 280,
        marginLeft: 30,
        // borderColor : Colors.primaryColor100 ,
        // borderWidth : 1,
        borderRadius: 5,
        paddingBottom: 2,
        paddingLeft: 10,
        top: -10
    }
})
