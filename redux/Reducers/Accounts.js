import { createSlice } from "@reduxjs/toolkit";

const AccountSlice = createSlice({
    name: 'Accounts',
    initialState: {
        customerAccountBalance: [],
        adminAccountBalance:[]
    },

    reducers: {
        updateAccountBalance: (state, action) => {
            state.customerAccountBalance.push({
                accountnumber : action.payload.accountnumber,
                balance : action.payload.balance
            })
        },

        updateAdminBalance : (state,action)=>{
                state.adminAccountBalance.push({
                    transactionType : action.payload.transactionType,
                    amount:action.payload.amount 
                })
            }

    }
})

export const {updateAccountBalance ,updateAdminBalance} = AccountSlice.actions;
export default AccountSlice.reducer;