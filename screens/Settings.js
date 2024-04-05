import { View, StyleSheet, Text, Pressable, ScrollView } from "react-native";
import { useLayoutEffect } from "react";
import { Ionicons } from '@expo/vector-icons';
import { ProfileItems } from "../components/ProfileItems";
import Colors from "../util/Color";
import { Image } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from "@expo/vector-icons";
import CustomModal from "../components/CustomModal";
import CustomDialogBox from "../components/CustomDialogBox";
import { useState } from "react";
import { ProfileHeaderItems } from "../components/ProfileHeaderItems";
import { UserNameHooks } from "../Hooks/Hooks";
import { logoutUser } from "../redux/Reducers/Users";
import { useDispatch } from "react-redux";
import { Dimensions } from "react-native";
const Settings = ({ navigation }) => {
    
    const width = Dimensions.get('window').width;
    const dispatch = useDispatch();
    const logOutUser = () => {
        dispatch(logoutUser());
    }
    const [showModal, setModal] = useState(false);
    const showCustomModal = () => {
        setModal(!showModal);
    }
    const profileSelect = () => {

    }
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => {
                return <Ionicons name="settings" color={Colors.primaryColor400} size={25} style={{ left: 15, padding: 10 }} onPress={profileSelect} />
            }
        })
    }, [navigation])

    const { fetchSpecificUserData } = UserNameHooks();

    console.log('name', fetchSpecificUserData)

    let LoadedData = (

        <ScrollView>
            {fetchSpecificUserData && fetchSpecificUserData?.map((user =>
                <View key={user._id}>
                    <View>

                        <CustomModal modalOpen={showModal} setModalOpen={setModal} additionalStyle={{ paddingBottom: 500 }} >
                            <CustomDialogBox LeftButtonText="No" RightButtonText="Yes"
                                queryText="Do you Wish to logout?"
                                leftButtonHandler={() => setModal(!showModal)} rightButtonHandler={logOutUser} addtionalStyle={{ width: width <= 360 ? 320 : 370 }} />
                        </CustomModal>
                        <View style={styles.profileInfo}>
                            <View style={styles.profileInfoImageWrapper}>
                                <Image source={{ uri: user.file }} style={styles.imageStyle} />
                            </View>
                            <View style={styles.profileEditWrapper}>
                                <FontAwesome name="pencil-square-o" size={27} color="black" style={styles.editFontStyle} />
                            </View>
                            <View style={{ alignItems: 'center' }} key={user.id}>
                                <Text style={styles.demotextstyle1} key={user.id}>{user.firstname} {user.lastname}</Text>
                                <Text style={[styles.demotextstyle2, { padding: 5 }]} key={user._id}>{user.email}</Text>
                                <Text style={styles.demotextstyle2} key={user.id}>{user.phone}</Text>
                            </View>
                        </View>
                        <View>
                            <ProfileHeaderItems style={{ backgroundColor: Colors.primaryColor800, top: -25 }} style1={{ color: 'white' }} >GENERAL</ProfileHeaderItems>
                            {/* <ProfileItems items="Wallet Balance" style={styles.itemsMargin}show={true} name="account-balance-wallet" /> */}
                            <ProfileItems items="Change Password" style={styles.itemsMargin} show={true} name="lock"  userid={user._id}/>
                            {/* <ProfileItems items="Change Email Address" style={styles.itemsMargin} show={true} name="email" /> */}
                            {/* <ProfileItems items="Rate Us"  style={styles.itemsMargin}  show={true}  name="star-outline" /> */}
                        </View>
                        {/* </View> */}
                        {/* <ProfileHeaderItems style={{ backgroundColor: Colors.primaryColor800, top: -25 }} style1={{ color: 'white' }} >ABOUT APP</ProfileHeaderItems>
                        <ProfileItems items="About App" style={styles.itemsMargin} show={false} name="perm-device-information" /> */}
                    </View>

                    <View style={styles.logout}>
                        <Pressable onPress={showCustomModal}>
                            <Text style={styles.logoutText}>Sign Out</Text>
                        </Pressable>
                    </View>
                </View>
            ))
            }
        </ScrollView>
    )
    return (

        !fetchSpecificUserData ? <Text style={{ textAlign: 'center', top: 250 }}>Loading...Data Please Wait</Text> : LoadedData

    )

}

export default Settings;

const styles = StyleSheet.create({
    profileInfo: {
        alignItems: 'center',
        marginTop: 50
    },
    profileInfoImageWrapper:
    {
        borderColor: Colors.primaryColor800,
        borderWidth: 5,
        borderRadius: 100
    },
    imageStyle: {
        width: 100,
        height: 100,
        borderRadius: 100,
        margin: 5
    },
    profileEditWrapper: {
        bottom: 50,
        left: 45,
        borderColor: 'white',
        borderWidth: 5,
        borderRadius: 50,
        width: 50, height: 50
    },
    editFontStyle: {
        textAlign: 'center',
        padding: 7,
        backgroundColor: Colors.primaryColor800,
        borderRadius: 20, color: 'white'
    },
    demotextstyle1: {
        bottom: 40,
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.primaryColor800
    },
    demotextstyle2: {
        bottom: 40,
        color: Colors.primaryColor800,
        fontSize: 16,
        fontWeight: 'bold'
    },
    logout: {
        alignItems: 'center',
        backgroundColor : Colors.primaryColor800,
        paddingVertical:15,
        position:'relative',
        top:-12
    },
    logoutText: {
        color: Colors.primaryColor100,
        fontWeight: 'bold',
        bottom: 2,
        fontSize: 20
    }
    ,
    itemsMargin: {
        marginTop: 20,
    }
})