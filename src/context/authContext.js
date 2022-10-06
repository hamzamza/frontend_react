import { createContext, useEffect, useReducer } from "react";
const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null
}

// to copu past in the other files
const LOGIN_START = "LOGIN_START"
const LOGIN_SUCCESS = "LOGIN_SUCCESS"
const LOGIN_FAILER = "LOGIN_FAILER"
const LOGOUT = "logout"
///

export const AuthContext = createContext(INITIAL_STATE)
const AuthReducer = (state, action) => {
    switch (action.type) {
        case LOGIN_START: {

            return { user: null, loading: true, error: null }
        }

        case LOGIN_SUCCESS: {
            return {
                user: action.payload,
                loading: false,
                error: null
            }
        }
        case LOGIN_FAILER: {
            return {
                user: null,
                loading: false,
                error: action.payload
            }
        }
        case LOGOUT: {
            return {
                user: null,
                loading: false,
                error: null
            }
        }

        default:
            break;
    }
}




export const AuthContextProvider = ({ children }) => {



    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

    useEffect(() => {

        localStorage.setItem("user", JSON.stringify(state.user))
    }, [state.user])

    return (
        <AuthContext.Provider value={{
            user: state.user,
            loading: state.loading,
            error: state.error,
            dispatch
        }}>
            {children}

        </AuthContext.Provider>

    )
}