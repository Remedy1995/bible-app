import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import Users from "./Reducers/Users";
import Deposit from "./Reducers/Deposit";
import Accounts from "./Reducers/Accounts";
import State from "./Reducers/State";
import Transactions from "./Reducers/Transactions";
export default configureStore({

    middleware : (getDefaultMiddleware)=> getDefaultMiddleware({
     immutableCheck : false,
     serializableCheck : false
    }),
    reducer: {
        Allusers: Users,
        AllDeposits: Deposit,
        AllAccounts: Accounts,
        ManageState :State,
        Transactions : Transactions

    }
})