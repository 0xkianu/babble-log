import { React, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logIn,setUserAccount } from '../../features/babble/babbleSlice';

export const Protected= ({isLoggedIn, children}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        async function checkAuth() {
            await fetch("/check-auth")
                .then(response => response.json())
                .then((json) => {
                    if(json.isLoggedIn) {
                        dispatch(logIn());
                        dispatch(setUserAccount(json.username));
                    } else {
                        navigate("/login");
                    }
                    
            });
        }
        if (!isLoggedIn) {
           checkAuth();
        }
    })

    if (!isLoggedIn) {
        console.log("Not logged in");

    } else {
        return (
            <>
                {children}
            </>
        )
    }    
}