import React from "react";

export interface UserContextType {
    id?: string,
    name?: string
}

const UserContext = React.createContext<UserContextType>({

});

export default UserContext;