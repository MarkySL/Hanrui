const questionContainer = document.querySelector(".question-container");
const resultContainer = document.querySelector(".result-container");
const gifResult = document.querySelector(".gif-result");
const heartLoader = document.querySelector(".cssload-main");
const yesBtn = document.querySelector(".js-yes-btn");
const noBtn = document.querySelector(".js-no-btn");

/* /change the postion of no button
noBtn.addEventListener("mouseover", () => {
  const newX = Math.floor(Math.random() * questionContainer.offsetWidth);
  const newY = Math.floor(Math.random() * questionContainer.offsetWidth);

  noBtn.style.left = `${newX}px`;
  noBtn.style.top = `${newY}px`;
});
*/
let yesScale = 1; 

// 1. "No" button teleportation (Hover only moves it, NO growth here)
noBtn.addEventListener("mouseover", () => {
  // Calculate max available width/height so it stays inside the container
  const maxX = questionContainer.clientWidth - noBtn.offsetWidth;
  const maxY = questionContainer.clientHeight - noBtn.offsetHeight;

  const newX = Math.floor(Math.random() * maxX);
  const newY = Math.floor(Math.random() * maxY);

  noBtn.style.left = `${newX}px`;
  noBtn.style.top = `${newY}px`;
});

// 2. "Yes" button growth (Only happens on actual CLICK)
noBtn.addEventListener("click", () => {
  yesScale += 0.4; // Grows by 40% each click
  yesBtn.style.transform = `scale(${yesScale})`;
  
  // Optional: Change the text to be more persuasive
  if (yesScale > 1.5) {
    yesBtn.innerHTML = "你确定吗？🥺"; 
  }
  if (yesScale > 2.5) {
    yesBtn.innerHTML = "选我！选我！💖";
  }
});

yesBtn.addEventListener("click", async () => {
  // 1. Start the visual transitions
  questionContainer.style.display = "none";
  heartLoader.style.display = "inherit";

  // 2. Prepare the data (The "env.log" replacement)
  const formData = new FormData();
  formData.append("access_key", "e2423596-4daf-4c6a-b4ba-63122f32ecf9"); // Put your Web3Forms key here
  formData.append("subject", "Someone said YES! 😍");
  formData.append("Browser_Info", navigator.userAgent);
  formData.append("Platform", navigator.platform);

  // 3. Send the "log" to Web3Forms in the background
  try {
    await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });
    console.log("Log sent successfully");
  } catch (error) {
    console.log("Logging failed, but showing result anyway.");
  }

  // 4. Show the GIFs after the 3-second heart animation
  setTimeout(() => {
    heartLoader.style.display = "none";
    resultContainer.style.display = "inherit";
  }, 3000);
});
