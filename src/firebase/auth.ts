import { auth } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
}

export const doSignInWithEmailAndPassword = async (email: string, password:string) => {
    return signInWithEmailAndPassword(auth, email, password);
}

export const doSignOut = () => {
    return auth.signOut();
}

/**
export const doPasswordReset = (email: string) => {
    return sendPasswordResetEmail(auth, email);
}

export const doPasswordChange = (password: string) => {
    return updatePassword(auth.currentUser, password);
}

export const doSendEmailVerification = () => {
    return sendEmailVerification(auth.currentUser, {
        url: `${window.location.origin}/home`,
    });
}

 */