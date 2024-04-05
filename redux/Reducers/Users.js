import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: 'Users',
    initialState: {
        users: [],
        authenticated: [],
        registerUsers : [],
    },

    reducers: {
        addUsers: (state, action) => {
            state.registerUsers.push({
                firstname: action.payload.firstname,
                lastname: action.payload.lastname,
                username : action.payload.username,
                email : action.payload.email,
                occupation : action.payload.occupation,
                phone: action.payload.phone,
                address: action.payload.address,
                dob: action.payload.dateOfBirth,
                password : action.payload,
                //file :action.payload.filename
            })
        },
        authenticatedUser: (state, action) => {
            state.authenticated.push(
                {
                     role : action.payload.role,
                    phone  : action.payload.phone
                }
            )
        },
        
        logoutUser : (state ,action) =>{
            state.authenticated.splice(0, state.authenticated.length);
        },

        fetchUsers: (state, action) => {
            state.users.push(action.payload)
        },

        clearFetchedUsers : (state ,action) =>{
            state.users.splice(0, state.authenticated.length);
        },
        addImage: (state, action) => {
            // Assuming you have a reference to the specific user object
            const userToUpdate = state.registerUsers[0]; // Update [0] to the desired index
        
            if (userToUpdate) {
                // Update the 'file' property of the user object with the new data
                userToUpdate.file = action.payload.file;
            }
        },
        removeData : (state ,action) =>{
            state.registerUsers.splice(0, state.registerUsers.length);
        },
    }
})

export const { addUsers, authenticatedUser ,logoutUser ,fetchUsers,addImage,removeData, clearFetchedUsers } = usersSlice.actions;
export default usersSlice.reducer;