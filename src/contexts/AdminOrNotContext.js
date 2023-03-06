import {createContext, useState} from "react";

const AdminOrNotContext = createContext(null);

export function AdminOrNotProvider({children}){

    const [adminOrNot,setAdminOrNot] = useState(false);

    const updateAdminOrNot = (res) => {
        setAdminOrNot(res);
    }


    return (
    <AdminOrNotContext.Provider value= {{adminOrNot, updateAdminOrNot}}>
    {children}
    </AdminOrNotContext.Provider>
    )
}


export default AdminOrNotContext;