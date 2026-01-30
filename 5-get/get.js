import { signup } from "../js/auth.js";

const signupBtn = document.getElementById("signup-btn");

signupBtn.addEventListener("click", handleSignup);

async function handleSignup() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // Validation
  if (!name || !email || !password || !confirmPassword) {
    alert("Please fill all fields");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  showLoader();

  try {
    await signup(email, password, name);

    alert("Account created successfully");
    window.location.href = "../index.html";
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      alert("Account already exists");
    } else {
      alert(error.message);
    }
    hideLoader();
  }
}
