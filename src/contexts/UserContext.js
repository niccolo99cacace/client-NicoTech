import {createContext, useState} from "react";

const UserContext = createContext(null);

export function UserProvider({children}){

    const [userId,setUserId] = useState("eeeeeeeeeee");

    const updateUserId = (id) => {
        setUserId(id);
    }


    return (
    <UserContext.Provider value= {{userId, updateUserId}}>
    {children}
    </UserContext.Provider>
    )
}


export default UserContext;