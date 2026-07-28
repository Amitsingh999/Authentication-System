import { STORAGE_KEYS } from "@/constants/storageKeys";
import { getData, setData } from "@/utils/Storage";

// Signup
export const signup = (user) => {

    const users = getData(STORAGE_KEYS.USERS);

    const exists = users.find(
        item => item.email === user.email
    );

    if (exists) {
        throw new Error("Email already exists");
    }

    const newUser = {
        fullName: user.fullName,
        email: user.email,
        mobile: user.mobile,
        password: user.password,
    };

    users.push(newUser);

    setData(STORAGE_KEYS.USERS, users);

    return newUser;
};

// Signin
export const signin = (email, password) => {

    const users = getData(STORAGE_KEYS.USERS);

    const user = users.find(
        item =>
            item.email === email &&
            item.password === password
    );

    if (!user) {
        throw new Error("Invalid Email or Password");
    }

    return user;
};



// Check Email (Forgot Password)
export const checkEmail = (email) => {

    const users = getData(STORAGE_KEYS.USERS);

    const user = users.find(
        (item) => item.email === email
    );

    if (!user) {
        throw new Error("Email not found");
    }

    return user;
};

// Update Password
export const updatePassword = (email, password) => {

    const users = getData(STORAGE_KEYS.USERS);

    const index = users.findIndex(
        (item) => item.email === email
    );

    if (index === -1) {
        throw new Error("User not found");
    }

    users[index].password = password;

    setData(STORAGE_KEYS.USERS, users);

    return true;
};