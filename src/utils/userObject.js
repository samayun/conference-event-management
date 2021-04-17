
export default function userObject(authUserData) {
    let defaultObj = {
        name: "",
        email: "",
        phoneNumber: "",
        photoURL: ""
    };
    defaultObj["name"] = authUserData["displayName"] || "Guest Rider"
    defaultObj["email"] = authUserData["email"]
    defaultObj["phoneNumber"] = authUserData["phoneNumber"]
    defaultObj["photoURL"] = authUserData["photoURL"]
    return defaultObj;
}