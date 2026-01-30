import { auth, db } from "./firebase.js";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// SIGNUP
export async function signup(email, password, name) {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);

    // Set display name in Auth
    await updateProfile(userCred.user, {
        displayName: name
    });

    // Create user document in Firestore
    await setDoc(doc(db, "users", userCred.user.uid), {
        name: name,
        email: email,
        usedBytes: 0,
        limitBytes: 100 * 1024 * 1024, // 100 MB
        createdAt: Date.now()
    });

    return userCred;
}

// LOGIN
export function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}
