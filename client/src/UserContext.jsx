import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({children}) {
    // this creates a state for the user
    const [user, setUser] = useState(null);
    // ready saves the state of the user so that when the refresh button is clicked, the data remains the same
    const [ready, setReady] = useState(false);
    useEffect(() => {
        if (!user) {
            axios.get('/profile').then(({data}) => {
            setUser(data);
            setReady(true);
        });
    }
    }, []);
    return (
    <UserContext.Provider value={{user, setUser, ready}}>
        {children}
    </UserContext.Provider>
    );
}