import { initializeApp } from
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";

import { getAuth } from
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

import { getFirestore } from
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyChQFntrb_ewOFUl4wssdL8k_0kvlndTFQ",
  authDomain: "flutter-ai-playground-af830.firebaseapp.com",
  projectId: "flutter-ai-playground-af830",
  storageBucket: "flutter-ai-playground-af830.appspot.com",
  messagingSenderId: "957185649772",
  appId: "1:957185649772:web:c87254acedaf7ae85dbc49"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db   = getFirestore(app);
