import { STORAGE_KEYS } from "@/constants/storageKeys";
import { auth } from "@/lib/auth";
import { getData, setData } from "@/utils/Storage";

// Signup
import {
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword
} from "firebase/auth";



export const signup = async (data) => {

    const {
        email,
        password,
        fullName,
        mobile
    } = data;


    const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );


    const user = userCredential.user;


    return {
        uid: user.uid,
        email: user.email,
        fullName,
        mobile
    };

};

// Signin
export const signin = async (data) => {

    const {
        email,
        password
    } = data;

    const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
    );

    const user = userCredential.user;

    return {
        uid: user.uid,
        email: user.email,
    };

};


export async function forgotPassword(email) {
    return await sendPasswordResetEmail(auth, email);
}