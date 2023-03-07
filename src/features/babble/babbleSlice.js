import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userAccount: '',
    isLoggedIn: false,
    myFolders: [],
    myBabbles: [],
};

export const babbleSlice = createSlice({
    name: 'babbles',
    initialState,
    reducers: {
        addFolder: (state, action) => {
            state.myFolders = [...state.myFolders, action.payload]
        },
        setBabbles: (state, action) => {
            state.myBabbles = action.payload
        },
        setFolders: (state, action) => {
            state.myFolders = action.payload
        },
        deleteBabbleById: (state, action) => {
            state.myBabbles = state.myBabbles.filter(babble => babble.id !== action.payload)
        },
        deleteFolderById: (state, action) => {
            state.myFolders = state.myFolders.filter(folder => folder.id !== action.payload)
        },
        setUserAccount: (state, action) => {
            state.userAccount = action.payload
        },
        logIn: (state) => {
            state.isLoggedIn = true;
        },
        logOut: (state) => {
            state.isLoggedIn = false;
            state.userAccount = '';
            state.myFolders = [];
            state.myBabbles = [];
        },
    },
});

export const { setBabbles,deleteBabbleById,addFolder,setFolders,deleteFolderById,setUserAccount,logIn,logOut } = babbleSlice.actions;
export const selectAllBabbles = (state) => state.babbles.myBabbles;
export const selectAllFolders = (state) => state.babbles.myFolders;
export const selectIsLoggedIn = (state) => state.babbles.isLoggedIn;
export const selectUserAccount = (state) => state.babbles.userAccount;
export default babbleSlice.reducer;