import React from "react";
import DataCard from "./DataCard";
import { useNavigation } from "@react-navigation/native";


export default RenderFlatList = ({ item }) => {
    const itemProps = {
        accountnumber :item.accountnumber,
        phone: item.phone,
        username :item.username,
        id : item._id,
        firstname :item.firstname
    }
    return  <DataCard {...itemProps} customer={true} />
}
