
import { auth } from './firebase.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

export function login(email,pass){
  return signInWithEmailAndPassword(auth,email,pass);
}
export function register(email,pass){
  return createUserWithEmailAndPassword(auth,email,pass);
}
export function logout(){
  return signOut(auth);
}
