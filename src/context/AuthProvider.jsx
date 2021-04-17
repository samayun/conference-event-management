import { createContext, useContext, useState, useEffect } from "react";
import Loading from "../pages/Loading";
import userObject from "../utils/userObject";
import { onAuthStateChanged, getCurrentUser } from "../firebase";

const AuthContext = createContext({});

export const useAuth = () => (useContext(AuthContext));


const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({
        // email: "admin@sobji-dokan.com",
        // name: "Salman"
    });
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const generateToken = () => {
        const User = getCurrentUser()
        User.getIdToken(false).then(token => {
            sessionStorage.setItem("token", token);
            localStorage.setItem("token", token);
        })

    }

    const handleAfterSignInOutResponse = async (user) => {
        if (user) {
            // IF Found User Data means Authenticated 
            console.log(user.displayName)
            setCurrentUser(userObject(user));
            generateToken()
        } else {
            // User is signed out
            setCurrentUser({});
        }
    }

    const value = {
        currentUser, setCurrentUser,
        isLoading, setLoading,
        error, setError
    }

    useEffect(() => {
        // onAuthStateChanged will executed in login and logout
        const unsubscribe = onAuthStateChanged(handleAfterSignInOutResponse);
        // unsubscribe when unmounting the component
        return unsubscribe;
        // eslint-disable-next-line
    }, []);

    return (
        <AuthContext.Provider value={value} >
            {!isLoading ? children : <Loading />}
        </AuthContext.Provider>
    )

}

export default AuthProvider;