import { auth, db } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

/* عناصر الصفحة */
const authPage = document.getElementById("authPage");
const appPage  = document.getElementById("appPage");
const authError = document.getElementById("authError");

/* إنشاء حساب */
window.register = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    authError.innerText = "ادخل البريد وكلمة المرور";
    return;
  }

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);

    // إنشاء حساب SaaS (Trial 14 يوم)
    await setDoc(doc(db, "users", cred.user.uid), {
      email,
      plan: "trial",
      trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      createdAt: new Date()
    });

  } catch (err) {
    authError.innerText = err.message;
  }
};

/* تسجيل دخول */
window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    authError.innerText = "بيانات الدخول غير صحيحة";
  }
};

/* تسجيل خروج */
window.logout = function () {
  signOut(auth);
};

/* فحص الاشتراك */
async function checkSubscription(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) return false;

  const data = snap.data();
  const now = new Date();

  if (data.plan === "trial") {
    return data.trialEndsAt.toDate() > now;
  }

  if (data.subscriptionEndsAt) {
    return data.subscriptionEndsAt.toDate() > now;
  }

  return false;
}

/* مراقبة حالة المستخدم */
onAuthStateChanged(auth, async user => {
  if (!user) {
    authPage.classList.remove("hidden");
    appPage.classList.add("hidden");
    return;
  }

  const active = await checkSubscription(user.uid);
  if (!active) {
    document.body.innerHTML = `
      <div style="text-align:center;margin-top:100px">
        <h2>🚫 انتهت مدة الاشتراك</h2>
        <button onclick="logout()">تسجيل خروج</button>
      </div>
    `;
    return;
  }

  authPage.classList.add("hidden");
  appPage.classList.remove("hidden");
});
