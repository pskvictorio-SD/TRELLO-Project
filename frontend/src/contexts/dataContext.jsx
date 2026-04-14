import { createContext, useState } from "react";

export const dataContext = createContext();

export function DataContextProvider(props) {
    const [appData, setAppData] = useState([]);

    const value = {
        appData,
        setAppData
    }

    return (
        <dataContext.Provider value={value}>
            {props.children}
        </dataContext.Provider>
    )
}