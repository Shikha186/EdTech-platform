import { createContext, useContext } from "react";

export const StoreContext = createContext();


export const useStore = () => {
    return useContext(StoreContext);
};
