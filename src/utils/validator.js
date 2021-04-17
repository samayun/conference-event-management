export const isEmail = (value) => {
    if (
        !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value
        )
    ) {
        return "Email must be valid ";
    }
    return true;
};

export const validatePassword = (value) => {
    if (value.length < 6) {
        return "Password should be at-least 6 characters.";
    } else if (!(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/).test(value)) {
        return "Password should contain at least one uppercase letter, lowercase letter, digit, and special symbol."
    }
    return true;
};

