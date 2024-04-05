import { View, Text, StyleSheet, FlatList, ImageBackground, Image } from "react-native";
import Title from "../components/Title";
import { Dimensions } from "react-native";
import Input from "../components/Input";
import PageGradient from "../components/PageGradient";
import Card from "../components/TopCard";
import FlatListHeader from "../components/FlatListHeader";
import RenderFlatList from "../components/RenderFlatList";
import ErrorText from "../components/ErrorText";
import { HandleFieldsSearchName } from "../util/validators/HandleFieldsValidators";
import { data } from "../data";
import Colors from "../util/Color";
import MiddleCard from "../components/MiddleCard";
import { useEffect, useState } from "react";
import {  AllCustomersService } from "../Services/Services";
import { AllUsersHooks } from "../Hooks/Hooks";
import PageLoader from "../components/PageLoader";


const Customers = () => {
    const [showLoader, setShowLoader] = useState(false);
    const [searchUser,setSearchUser] = useState(false);
    const [formData,setFormData] = useState({
        isTouched : "",
        hasError : "",
        username : ""
    })
    const width = Dimensions.get('screen').width;
    console.log('this is the customers screen');
    const {Allusers,error} = AllUsersHooks();
      
    console.log(formData.username);
   
    useEffect(() => {
        setShowLoader(true)
        console.log('searched', formData.username);
        const searchUser = Allusers && Allusers[0]?.filter((data) => data?.username === formData?.username.trim());
        console.log('hi', searchUser);
        if (Allusers.length > 0) {
            setShowLoader(false);
        }
        return formData.username.trim()?.length !== 0 ? setSearchUser(searchUser) : setSearchUser(Allusers[0]);

    }, [formData.username, Allusers[0]])
    return (
        <><PageGradient>
        {/* <ImageBackground imageStyle={styles.imageStyle} resizeMode='cover'
            style={styles.rootScreen}>
            <Image
                source={require('../assets/fin.jpg')}
                style={{ height: 620, width: 500, borderRadius: 0, marginTop: 0 }} />

        </ImageBackground> */}
   
        {/* <Card style={styles.card}>  */}
            {/* <Title style={styles.title}>All Transactions</Title> */}
            {/* <MiddleCard style={styles.middleCard} > */}
                <FlatListHeader subHeader="All Customers" subHeaderActive="See All" style={{ borderRadius : 15, left : width>360 ? 7 : 0 ,width : width>360 ? 360 : 305}}  />
                <Input placeholder="Search by Typing Username" label=""style={[formData.hasError
                && formData.isTouched && formData.username && styles.inputFormStyle, {
                paddingHorizontal: 16,
                width: width > 360 ? 350 : 300, top: -20, right: 13
            }]} textConfigs={{
                                onChangeText: HandleFieldsSearchName.bind(this, setFormData),
                                value: formData.username
                            }} />
                             {formData.isTouched && formData.hasError && formData.username &&
                            (<ErrorText additionalStyle={{ top : -20}}   > Incorrect Username entered </ErrorText>)}

                {/* <FlatList data={customers} renderItem={(item) => RenderFlatList(item)} keyExtractor={(item) => item._id} /> */}



                {showLoader ? <PageLoader PageStyle={{
                marginLeft: 155,
                marginTop: 50
            }} /> : formData.username !== '' && searchUser?.length === 0 ? (<Text style={{ textAlign: 'center' }}> No search results found</Text>) : (<FlatList data={searchUser} renderItem={(item) =>RenderFlatList(item)} keyExtractor={(item) => item._id} />)}
            {/* </MiddleCard> */}
        {/* </Card>  */}
        {/* <View style={{marginBottom : 140 , position:'absolute' ,zIndex:-999}}></View> */}
        </PageGradient></>
    )
}

export default Customers;
const styles = StyleSheet.create({
    description: {
        color: 'black',
        marginTop: 12,
    },
    flatListheaderStyle: {
        marginHorizontal: 5,
        maxWidth: 370,
        marginLeft: 20,
        marginTop: 15,
        borderColor: Colors.primaryColor400,
        borderWidth: 2
    },
    middleCardStyle: {
        marginTop: 20,
        width: 370,
        marginLeft: 5,
    },
    card: {
        flex: 1,
        minHeight: 450,
        marginTop: 0,
        marginBottom: 30,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        marginLeft: 15,
        shadowColor: 'black',
        shadowOffset: { width: 10, height: 10 },
        shadowRadius: 6,
        shadowOpacity: 0.25,
        paddingBottom: 2
    },
    middleCard: {
        marginLeft: 0,
        flex: 1
    },
    title: {
        marginTop: 5,
        margin: 8,
        marginLeft: 10
    },
    inputFormStyle: {
        borderWidth: 1,
        borderColor: 'red'
    }

})