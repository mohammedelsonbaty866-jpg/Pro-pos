/*************************************************
 * PosPro SaaS - app.js
 * - حماية التطبيق
 * - فحص الاشتراك / Trial
 * - ربط كل شيء بـ UID
 *************************************************/

// ===== متغيرات عامة =====
let currentUser = null;

/*************************************************
 * فحص الاشتراك (Trial / Paid)
 *************************************************/
function checkSubscription(uid) {
  return db.collection("users").doc(uid).get().then(doc => {
    if (!doc.exists) return false;

    const data = doc.data();
    const now = new Date();

    // Trial
    if (data.plan === "trial" && data.trialEndsAt) {
      return data.trialEndsAt.toDate() > now;
    }

    // اشتراك مدفوع
    if (data.subscriptionEndsAt) {
      return data.subscriptionEndsAt.toDate() > now;
    }

    return false;
  }).catch(err => {
    console.error("Subscription check error:", err);
    return false;
  });
}

/*************************************************
 * مراقبة حالة تسجيل الدخول
 *************************************************/
auth.onAuthStateChanged(user => {
  if (!user) {
    showLogin();
    return;
  }

  checkSubscription(user.uid).then(active => {
    if (!active) {
      document.body.innerHTML = `
        <div style="
          display:flex;
          justify-content:center;
          align-items:center;
          height:100vh;
          font-family:Arial;
          background:#f5f6fa;
        ">
          <div style="
            background:#fff;
            padding:30px;
            border-radius:10px;
            text-align:center;
            max-width:400px;
            box-shadow:0 10px 25px rgba(0,0,0,.1);
          ">
            <h2>🚫 انتهت مدة الاشتراك</h2>
            <p style="color:#666">
              برجاء تجديد الاشتراك للاستمرار في استخدام PosPro
            </p>
            <button onclick="logout()" style="
              padding:10px 20px;
              border:none;
              border-radius:6px;
              background:#e74c3c;
              color:#fff;
              cursor:pointer;
            ">
              تسجيل خروج
            </button>
          </div>
        </div>
      `;
      return;
    }

    // اشتراك ساري
    currentUser = user;
    loadUserData();
    showApp();
  });
});

/*************************************************
 * تحميل بيانات المستخدم
 *************************************************/
function loadUserData() {
  if (!currentUser) return;

  db.collection("users").doc(currentUser.uid).get()
    .then(doc => {
      if (doc.exists) {
        const data = doc.data();
        console.log("User profile:", data);
        // تقدر هنا تحط الاسم / الخطة / الإعدادات
      }
    });
}

/*************************************************
 * واجهات العرض
 *************************************************/
function showLogin() {
  const login = document.getElementById("loginPage");
  const app = document.getElementById("app");

  if (login) login.style.display = "block";
  if (app) app.style.display = "none";
}

function showApp() {
  const login = document.getElementById("loginPage");
  const app = document.getElementById("app");

  if (login) login.style.display = "none";
  if (app) app.style.display = "block";
}

/*************************************************
 * تسجيل الخروج
 *************************************************/
function logout() {
  auth.signOut().then(() => {
    location.reload();
  });
}

/*************************************************
 * أمثلة (فواتير / مصروفات)
 * — مربوطة بـ UID —
 *************************************************/
function addInvoice(invoice) {
  return db.collection("users")
    .doc(currentUser.uid)
    .collection("invoices")
    .add({
      ...invoice,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
}

function addExpense(expense) {
  return db.collection("users")
    .doc(currentUser.uid)
    .collection("expenses")
    .add({
      ...expense,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
}
// public/js/app.js
import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

window.showLogin = function () {
  document.getElementById("loginPage").style.display = "block";
  document.getElementById("app").style.display = "none";
};

window.showApp = function () {
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("app").style.display = "block";
};

// التنقل بين الصفحات
window.showSection = function (id, btn) {
  document.querySelectorAll(".box").forEach(d => d.style.display = "none");
  document.getElementById(id).style.display = "block";

  document.querySelectorAll("nav button").forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");
};

// فحص الاشتراك
async function checkSubscription(uid) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) return false;

  const data = snap.data();
  const now = new Date();

  if (data.plan === "trial" && data.trialEndsAt) {
    return data.trialEndsAt.toDate() > now;
  }

  if (data.subscriptionEndsAt) {
    return data.subscriptionEndsAt.toDate() > now;
  }

  return false;
}

// مراقبة تسجيل الدخول
onAuthStateChanged(auth, async user => {
  if (!user) {
    showLogin();
    return;
  }

  const active = await checkSubscription(user.uid);

  if (!active) {
    document.body.innerHTML = `
      <div style="text-align:center;margin-top:100px">
        <h2>🚫 انتهى الاشتراك</h2>
        <p>برجاء تجديد الاشتراك</p>
        <button onclick="logout()">تسجيل خروج</button>
      </div>
    `;
    return;
  }

  showApp();
});
