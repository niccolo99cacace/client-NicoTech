import {createContext, useState} from "react";

const AuthenticationContext = createContext(null);

export function AuthenticationProvider({children}){

    const [authentication,setAuthentication] = useState(false);

    const updateAuthentication = (res) => {
        setAuthentication(res);
    }


    return (
    <AuthenticationContext.Provider value= {{authentication, updateAuthentication}}>
    {children}
    </AuthenticationContext.Provider>
    )
}


export default AuthenticationContext;