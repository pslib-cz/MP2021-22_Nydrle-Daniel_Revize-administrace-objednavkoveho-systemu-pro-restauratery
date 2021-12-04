import React, {createContext, useReducer, useEffect, FC, ReactNode, ReactElement} from "react";
import { nanoid } from "nanoid";

const LOCAL_STORAGE_ID = "GKeep";

export const ADD_LIST = "ADD_LIST";
export const REMOVE_LIST = "REMOVE_LIST";
export const RENAME_LIST = "RENAME_LIST";
export const ADD_ITEM = "ADD_ITEM";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const RENAME_ITEM = "RENAME_ITEM";
export const TOGGLE_ITEM = "TOGGLE_ITEM";
export const TOGGLE_THEME = "TOGGLE_THEME";

const initialState: object = {
    lists: [
        {
            id: "",
            name: "list1",
            items: [
                {
                    id: "",
                    name: "item1",
                    isFinished: false
                }
            ]
        }
    ]
}

let storedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ID)!);

const dataReducer = (state: any, action: any) => {
    switch (action.type) {
        case TOGGLE_THEME: {
            return {...state, isDarkTheme: !state.isDarkTheme}
        }
        default:
            return state;
    }
}

export const Context = createContext({});

export const Provider = (props: any) => {
    
    const [store, dispatch] = useReducer(dataReducer, storedData || initialState);
    useEffect(()=> {
        localStorage.setItem(LOCAL_STORAGE_ID, JSON.stringify(store));
    }, [store])
    return (
        <Context.Provider value={[store, dispatch]}>
            {props.children}
        </Context.Provider>
    );
}