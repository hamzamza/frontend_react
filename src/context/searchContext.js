import { createContext, useReducer } from "react";
const INITIAL_STATE = {
    city: undefined,
    dates: [],
    options: {
        adult: undefined,
        children: undefined,
        room: undefined
    },

}
const NEW_SEARCH = "NEW_SEARCH"
const RESETE_STATE = "RESETE_STATE"

export const SearchContext = createContext(INITIAL_STATE)
const SearchReducer = (state, action) => {
    switch (action.type) {
        case NEW_SEARCH: {
            console.log(action);
            return action.payload;
        }
        case RESETE_STATE:
            return INITIAL_STATE;
        default:
            break;
    }
}

export const SearchContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE)
    return (
        <SearchContext.Provider value={{
            city: state.city,
            dates: state.dates,
            options: state.options,
            dispatch
        }}>
            {children}
        </SearchContext.Provider>

    )
}