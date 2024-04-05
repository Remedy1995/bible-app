import { createSlice } from "@reduxjs/toolkit";

const TransactionSlice = createSlice({
    name: 'Transactions',
    initialState: {
        allTransactions: [],
        recordTransactions : [],
    },

    reducers: {
        // addUsers: (state, action) => {
        //     state.registerUsers.push({
        //         firstname: action.payload.firstname,
        //         lastname: action.payload.lastname,
        //         username : action.payload.username,
        //         email : action.payload.email,
        //         occupation : action.payload.occupation,
        //         phone: action.payload.phone,
        //         address: action.payload.address,
        //         dob: action.payload.dateOfBirth,
        //         password : action.payload.password

        //     })
       // },
        // authenticatedUser: (state, action) => {
        //     state.authenticated.push(
        //         {
        //              role : action.payload.role,
        //             phone  : action.payload.phone
        //         }
        //     )
        // },
        
        // logoutUser : (state ,action) =>{
        //     state.authenticated.splice(0, state.authenticated.length);
        // },

        fetchTransactions: (state, action) => {
            state.allTransactions.push(action.payload)
        }
    }
})

export const { fetchTransactions} = TransactionSlice.actions;
export default TransactionSlice.reducer;