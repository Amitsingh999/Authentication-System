import { auth } from "@/lib/auth";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    sendEmailVerification,
} from "firebase/auth";

/**
 * ==========================================================
 * Signup Service
 * ----------------------------------------------------------
 * Creates a new Firebase Authentication account and sends
 * an email verification link to the registered email.
 * ==========================================================
 */
export const signup = async (data) => {

    const {
        email,
        password,
        fullName,
        mobile,
    } = data;

    // Create a new user account in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );

    const user = userCredential.user;

    // Send email verification link
    await sendEmailVerification(user);

    // Return user information to the application
    return {
        uid: user.uid,
        email: user.email,
        fullName,
        mobile,
    };
};


/**
 * ==========================================================
 * Signin Service
 * ----------------------------------------------------------
 * Authenticates an existing user.
 * Allows login only if the email has been verified.
 * ==========================================================
 */
export const signin = async (data) => {

    const {
        email,
        password,
    } = data;

    // Authenticate user with Firebase
    const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
    );
    
    const user = userCredential.user;

    // Refresh user data to get latest verification status
    await user.reload();

    // Prevent login if email is not verified
    if (!user.emailVerified) {
        throw new Error(
            "Please verify your email before signing in."
        );
    }

    // Return authenticated user information
    return {
        uid: user.uid,
        email: user.email,
    };
};


/**
 * ==========================================================
 * Forgot Password Service
 * ----------------------------------------------------------
 * Sends a password reset email to the registered user.
 * ==========================================================
 */
export const forgotPassword = async (email) => {

    return await sendPasswordResetEmail(auth, email);

};