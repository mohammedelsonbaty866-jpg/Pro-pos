<script>
// ===== FIREBASE CONFIG =====
const firebaseConfig = {
  apiKey: "AIzaSyChQFntrb_ewOFUl4wssdL8k_0kvlndTFQ",
  authDomain: "flutter-ai-playground-af830.firebaseapp.com",
  projectId: "flutter-ai-playground-af830",
  storageBucket: "flutter-ai-playground-af830.appspot.com",
  messagingSenderId: "957185649772",
  appId: "1:957185649772:web:c87254acedaf7ae85dbc49"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
// ===== OFFLINE ENABLE =====
db.enablePersistence()
  .catch(err => {
    console.log("Offline persistence error", err.code);
  });
// ===== AUTH =====
function login(){
  const email = loginEmail.value;
  const pass  = loginPass.value;

  auth.signInWithEmailAndPassword(email, pass)
    .then(()=>{})
    .catch(err=>alert(err.message));
}

function logout(){
  auth.signOut();
}

// ===== AUTH STATE =====
auth.onAuthStateChanged(user=>{
  if(!user){
    loginBox.classList.remove("hidden");
    app.classList.add("hidden");
    return;
  }

  loginBox.classList.add("hidden");
  app.classList.remove("hidden");
  loadData();
});

// ===== APP DATA =====
let sales=[],buys=[],expenses=[];
let currentUID = null;

// ===== LOAD DATA =====
function loadData(){
  currentUID = auth.currentUser.uid;

  db.collection("data").doc(currentUID).get().then(doc=>{
    if(doc.exists){
      const d = doc.data();
      sales = d.sales || [];
      buys = d.buys || [];
      expenses = d.expenses || [];
      redraw();
      update();
    }
  });
}

// ===== SAVE DATA =====
function saveData(){
  if(!currentUID) return;
  db.collection("data").doc(currentUID).set({
    sales,buys,expenses
  });
}

// ===== UI =====
function show(id,b){
  document.querySelectorAll('#app .box').forEach(x=>x.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
  document.querySelectorAll('nav button').forEach(x=>x.classList.remove("active"));
  b.classList.add("active");
}

function addSale(){
  if(!salePrice.value) return alert("ادخل السعر");
  let t = saleQty.value * salePrice.value;
  sales.push(t);
  salesList.innerHTML += `<div>${saleName.value || "صنف"} = ${t}</div>`;
  saveData();
  update();
}

function addPurchase(){
  if(!buyPrice.value) return alert("ادخل السعر");
  let t = buyQty.value * buyPrice.value;
  buys.push(t);
  purchaseList.innerHTML += `<div>${buyName.value || "صنف"} = ${t}</div>`;
  saveData();
  update();
}

function addExpense(){
  if(!expAmount.value) return alert("ادخل المبلغ");
  expenses.push(+expAmount.value);
  expenseList.innerHTML += `<div>${expDesc.value} = ${expAmount.value}</div>`;
  saveData();
  update();
}

function update(){
  let s=sales.reduce((a,b)=>a+b,0);
  let b=buys.reduce((a,b)=>a+b,0);
  let e=expenses.reduce((a,b)=>a+b,0);
  tSales.innerText=s;
  tBuys.innerText=b;
  tExp.innerText=e;
  tNet.innerText=s-b-e;
}

function redraw(){
  salesList.innerHTML="";
  purchaseList.innerHTML="";
  expenseList.innerHTML="";

  sales.forEach(v=>salesList.innerHTML+=`<div>${v}</div>`);
  buys.forEach(v=>purchaseList.innerHTML+=`<div>${v}</div>`);
  expenses.forEach(v=>expenseList.innerHTML+=`<div>${v}</div>`);
}
</script>
