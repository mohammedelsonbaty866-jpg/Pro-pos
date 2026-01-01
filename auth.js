// public/js/auth.js
import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// تسجيل الدخول
window.loginUser = function () {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  if (!email || !password) {
    alert("من فضلك أدخل البريد وكلمة المرور");
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      console.log("تم تسجيل الدخول");
    })
    .catch(err => {
      alert("خطأ: " + err.message);
    });
};

// تسجيل الخروج
window.logout = function () {
  signOut(auth);
};
