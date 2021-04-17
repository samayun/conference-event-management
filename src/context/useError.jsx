import { createContext, useContext, useState } from "react";
import ErrorComponent from "../pages/ErrorComponent";

export const ErrorContext = createContext("");

export const useError = () => useContext(ErrorContext);

export default function ErrorProvider({ children }) {
    const [error, renderError] = useState(null);

    if (error) {
        return <ErrorComponent error={error} />
    } else {
        return <ErrorContext.Provider value={{
            error, renderError
        }}>
            {children}
        </ErrorContext.Provider>
    }
}
