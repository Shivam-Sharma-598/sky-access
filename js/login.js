import { auth } from "./firebase.js";
import {
    signInWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 🔹 ensure fresh login (no old session)
signOut(auth);

// DOM
const loginBtn = document.getElementById("login-btn");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

loginBtn.addEventListener("click", async () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
        alert("Please fill all fields");
        return;
    }

    showLoader();

    try {
        await signInWithEmailAndPassword(auth, email, password);
        window.location.href = "../dashboard/dashboard.html";
    } catch (error) {
        if (error.code === "auth/user-not-found") {
            alert("Account does not exist");
        } else if (error.code === "auth/wrong-password") {
            alert("Incorrect password");
        } else {
            alert(error.message);
        }
        hideLoader();
    }
});
