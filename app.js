
import { auth } from './firebase.js';
import { login as l, register as r, logout as o } from './auth.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

window.login=()=>l(email.value,password.value);
window.register=()=>r(email.value,password.value);
window.logout=o;

onAuthStateChanged(auth,u=>{
  authDiv.hidden=!!u;
  dashboard.hidden=!u;
});
