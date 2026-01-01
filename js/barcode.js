let currentMode = "";

function openScanner(mode){
  currentMode = mode;
  scanner.classList.remove("hidden");

  navigator.mediaDevices.getUserMedia({video:{facingMode:"environment"}})
  .then(stream=>{
    video.srcObject = stream;
    video.play();
  });
}

// محاكاة قراءة باركود (مبدئي)
video?.addEventListener("click",()=>{
  let fakeCode = "منتج-" + Math.floor(Math.random()*1000);
  if(currentMode==="sale") saleName.value = fakeCode;
  if(currentMode==="buy") buyName.value = fakeCode;
  closeScanner();
});

function closeScanner(){
  scanner.classList.add("hidden");
  let stream = video.srcObject;
  stream?.getTracks().forEach(t=>t.stop());
}
