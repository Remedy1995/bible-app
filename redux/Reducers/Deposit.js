import { createSlice } from "@reduxjs/toolkit";

const DepositSlice = createSlice({
    name: 'Deposits',
    initialState: {
        deposits: [],
        accountNumber :[]
    },
    reducers: {
        makeDeposits: (state, action) => {
            state.deposits.push({
                //customerName  : action.payload.customerName,
                accountnumber: action.payload.accountnumber,
                amount: action.payload.amount
            })

        },
        clearDeposits : (state,action) =>{
        state.deposits  = state.deposits.filter (deposits =>{
            return (
                deposits.accountnumber !== action.payload.accountnumber || 
                deposits.amount !== action.payload.amount
            )
        })
        },
        makeWithdrawals: (state, action) => {
            state.deposits.push({
                //customerName  : action.payload.customerName,
                accountnumber: action.payload.accountnumber,
                amount: action.payload.amount
            })
        }
        

    }
        
        
})

export const {makeDeposits , clearDeposits , makeWithdrawals } = DepositSlice.actions;
//export const clearDepositsArray = DepositSlice.actions.clearDepositsArray;
export default DepositSlice.reducer;