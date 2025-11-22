const logos = [
  { id: 1, name: "bentley", src: "Assets/bentley.svg" },
  { id: 2, name: "chevrolet", src: "Assets/chevrolet.svg" },
  { id: 3, name: "ferrari", src: "Assets/ferrari.svg" },
  { id: 4, name: "hyundai", src: "Assets/hyundai1362.jpg" },
  { id: 5, name: "lamborghini", src: "Assets/lambo.png" },
  { id: 6, name: "mercedes", src: "Assets/mercedes.svg" },
  { id: 7, name: "tesla", src: "Assets/Tesla_Motors.svg" },
  { id: 8, name: "toyota", src: "Assets/toyota.webp" },
  { id: 9, name: "volkswagen", src: "Assets/volkswagen.svg" },
  { id: 10, name: "opel", src: "Assets/opel.svg" },
];

let currentLogoIndex = 0;
let score = 0;
let isGameActive = true;

// dom elementer
const logoImg = document.getElementById("logo-img");
const guessInput = document.getElementById("guess-input");
const submitBtn = document.getElementById("submit-btn");
const nextBtn = document.getElementById("next-btn");
const feedbackDiv = document.getElementById("feedback");
const scoreSpan = document.getElementById("score");
const logoContainer = document.querySelector(".logo-container");
const inputSelection = document.querySelector(".input-selection");

function startGame() {
  logos.sort(() => Math.random() - 0.5);
  loadLogo();
}

function loadLogo() {
  if (currentLogoIndex >= logos.length) {
    endGame();
    return;
  }
  const currentLogo = logos[currentLogoIndex];
  logoImg.src = currentLogo.src;
  logoImg.style.display = "block";
  guessInput.value = "";
  guessInput.focus();
  feedbackDiv.textContent = "";
  feedbackDiv.className = "feedback-message";

  submitBtn.classList.remove("hidden");
  nextBtn.classList.add("hidden");
  guessInput.disabled = false;
  isGameActive = true;
}

function checkGuess() {
  if (!isGameActive) return;

  const userGuess = guessInput.value.trim().toLowerCase();
  const currentLogo = logos[currentLogoIndex];

  if (!userGuess) return;

  if (userGuess === currentLogo.name.toLowerCase()) {
    handleCorrectGuess();
  } else {
    handleWrongGuess();
  }
}

function handleCorrectGuess() {
  feedbackDiv.textContent = "Se der da! Helt riktig! ";
  feedbackDiv.className = "feedback-message correct";
  score++;
  scoreSpan.textContent = score;
  isGameActive = false;

  submitBtn.classList.add("hidden");
  nextBtn.classList.remove("hidden");
  guessInput.disabled = true;
  nextBtn.focus();
}

function handleWrongGuess() {
  feedbackDiv.textContent = "Aaaah det var feil! Prøv igjen ";
  feedbackDiv.className = "feedback-message wrong";

  guessInput.classList.add("shake");
  setTimeout(() => {
    guessInput.classList.remove("shake");
  }, 500);
}

function nextLogo() {
  currentLogoIndex++;
  loadLogo();
}

function endGame() {
  if (logoContainer) logoContainer.style.display = "none";
  if (inputSelection) inputSelection.style.display = "none";

  feedbackDiv.innerHTML = `
    <h2>🏁 Quizen er ferdig!</h2>
    <p>Din poengsum: <strong>${score}/${logos.length}</strong></p>
    <p>${
      score === logos.length
        ? "Perfekt! "
        : score >= logos.length * 0.7
        ? "Flott jobba! "
        : "Godt forsøk! "
    }</p>
  `;
  feedbackDiv.className = "feedback-message";
  feedbackDiv.style.display = "block";
  submitBtn.classList.add("hidden");
  nextBtn.classList.add("hidden");
}

submitBtn.addEventListener("click", checkGuess);

nextBtn.addEventListener("click", nextLogo);

guessInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    checkGuess();
  }
});

startGame();
