let hourDigit; // Tároljuk a helyes megoldást
let minuteDigit;
let numberA, numberB; // numberA és numberB változók bevezetése
let gameCount = 0; // Összes játszott játék számláló
let correctCount = 0; // Helyes válaszok számláló
let incorrectCount = 0; // Hibás válaszok számláló

document.getElementById("startButton").addEventListener("click", startGame);
document.getElementById("checkButton").addEventListener("click", checkAnswer);

function startGame() {
  // Növeljük a játszott játékok számát
  gameCount++;
  updateGameStats();

  // Reset input field
  const inputField = document.getElementById("hourInput");
  inputField.value = "";
  inputField.classList.remove("correct", "incorrect");
  document.getElementById("correctAnswer").style.display = "none";

  // Random clock image selection (e.g., 1-1, 1-12, etc.)
  numberA = getRandomNumber(1, 12); // Első számjegy
  numberB = getRandomNumber(1, 12); // Második számjegy
  const clockImage = `img/${numberA}-${numberB}.png`;
  document.getElementById("random-clock").src = clockImage;

  // Kisorsoljuk a számot 1-12 között
  const hourHand = getRandomNumber(1, 12);

  // Az m12.png képet használjuk mindig
  const hourHandImage = `img/m12.png`;
  const imgElement = document.getElementById("hour-hand");

  // Beállítjuk a kép forrását az m12.png-re
  imgElement.src = hourHandImage;

  // Szám alapján kiszámítjuk a forgatás mértékét (1-12 -> 30 fokos lépések)
  const rotationDegree = hourHand * 30; // 30 fokkal forgat minden egyes órához

  // Alkalmazzuk a forgatást a CSS transform property segítségével
  imgElement.style.transition = "transform 0.5s ease"; // Animáció beállítása
  imgElement.style.transform = `rotate(${rotationDegree}deg)`; // Forgatás beállítása

  // Random big hand rotation
  const randomRotation = getRandomRotation();
  const bigHandValue = randomRotation / 6; // 6 fokonként 1
  document.getElementById(
    "big-hand"
  ).style.transform = `rotate(${randomRotation}deg)`;

  // Számítások
  calculateHourAndMinuteDigits(hourHand, bigHandValue);

  // Log a játékállapothoz
  console.log("Játék szám: " + gameCount);
}

function calculateHourAndMinuteDigits(hourHand, bigHandValue) {
  if (numberA === hourHand) {
    hourDigit = numberB; // Ha numberA megegyezik a hourHanddel, a helyes érték a numberB
  } else if (numberA < hourHand) {
    const correctionNumber = hourHand - numberA;
    hourDigit = numberB + correctionNumber;
  } else {
    const correctionNumber = numberA - hourHand;
    hourDigit = numberB - correctionNumber;
  }

  if (hourDigit < 0) hourDigit += 12;
  if (hourDigit > 12) hourDigit = hourDigit % 12 || 12;
  if (hourDigit === 1) hourDigit = 12;

  minuteDigit = bigHandValue - hourHand * 5;
  if (minuteDigit < 0) minuteDigit += 60;
  if (minuteDigit >= 60) minuteDigit = minuteDigit % 60;

  console.log("Calculated hourDigit: ", hourDigit);
  console.log("Calculated minuteDigit: ", minuteDigit);
}

function checkAnswer() {
  const inputField = document.getElementById("hourInput");
  let userGuess = inputField.value;

  // Formázzuk a helyes választ két számjegyű formában (pl. 04, 06)
  let formattedHourDigit;
  if (hourDigit === 0) {
    formattedHourDigit = "12"; // Ha hourDigit 1, akkor 12-nek kell lennie a válaszban
  } else if (hourDigit < 10) {
    formattedHourDigit = `0${hourDigit}`; // Egy számjegy esetén 0-val kiegészítve
  } else {
    formattedHourDigit = `${hourDigit}`;
  }

  let formattedMinuteDigit =
    minuteDigit < 10 ? `0${minuteDigit}` : `${minuteDigit}`;
  let correctAnswer = formattedHourDigit + formattedMinuteDigit;

  if (userGuess === correctAnswer) {
    correctCount++;
    inputField.classList.add("correct");
    inputField.classList.remove("incorrect");
    document.getElementById("correctAnswer").style.display = "none";
  } else {
    incorrectCount++;
    inputField.classList.add("incorrect");
    inputField.classList.remove("correct");
    document.getElementById("correctValue").textContent = correctAnswer;
    document.getElementById("correctAnswer").style.display = "block";
  }

  // Frissítsük a statisztikákat
  updateGameStats();
}

// Helper function to update the game stats display
function updateGameStats() {
  document.getElementById("gameCount").textContent = gameCount;
  document.getElementById("correctCount").textContent = correctCount;
  document.getElementById("incorrectCount").textContent = incorrectCount;
}

// Helper function to generate a random number between min and max (inclusive)
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Helper function to generate a random rotation that is a multiple of 6
function getRandomRotation() {
  return Math.floor(Math.random() * 60) * 6; // 0-59 * 6 fokonként
}
function addToInput(num) {
  const inputField = document.getElementById("hourInput");
  inputField.value += num;
}

function clearInput() {
  document.getElementById("hourInput").value = "";
}
