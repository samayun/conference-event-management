import { createContext, useContext, useState, useEffect } from "react";
import Loading from "../pages/Loading";
import userObject from "../utils/userObject";
import { onAuthStateChanged, getCurrentUser } from "../firebase";
import AdminDataService from '../services/admin.service';
const AuthContext = createContext({});

export const useAuth = () => (useContext(AuthContext));


const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});
    const [UserIsAdmin, setUserIsAdmin] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const isAdmin = async email => {
        try {
            let admin = await AdminDataService.getSingleAdmin(email);
            setUserIsAdmin(true);
            console.log("ADMIN TRUE")
            return true;
        } catch (error) {
            setUserIsAdmin(false)
            console.log("ADMIN FALSE")
            return false;
        }
    }

    const generateToken = () => {
        const User = getCurrentUser()
        console.log(User.email)
        User.getIdToken(false).then(token => {
            sessionStorage.setItem("token", token);
            localStorage.setItem("token", token);
            // CHECK ADMIN
            if (isAdmin(User.email)) {
                sessionStorage.setItem("isAdmin", true);
                localStorage.setItem("isAdmin", true);
            } else {
                sessionStorage.setItem("isAdmin", false);
                localStorage.setItem("isAdmin", false);
            }
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
    const isAdminPrevileged = () => !!UserIsAdmin

    const value = {
        currentUser, setCurrentUser,
        isLoading, setLoading,
        error, setError,
        UserIsAdmin, setUserIsAdmin, isAdminPrevileged
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