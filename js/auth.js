import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");

if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
      .then(() => alert("تم تسجيل الدخول"))
      .catch(err => alert(err.message));
  });
}

if (registerBtn) {
  registerBtn.addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => alert("تم إنشاء الحساب"))
      .catch(err => alert(err.message));
  });
}

export function logout() {
  signOut(auth);
}

onAuthStateChanged(auth, user => {
  if (user) {
    console.log("Logged in:", user.uid);
  } else {
    console.log("Not logged in");
  }
});
