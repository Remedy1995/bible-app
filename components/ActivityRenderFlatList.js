import React from "react";
import ActivityDataCard from "./ActivityDataCard ";
import { useNavigation } from "@react-navigation/native";


export default ActivityRenderFlatList = ({ item }) => {
    const itemProps = {
        accountnumber :item?.accountnumber,
        date: item?.date,
        amount :item?.amount,
        id : item?._id,
        transactiondetails :item?.transactiondetails
    }
    return  <ActivityDataCard {...itemProps} activity={true} />
}
