// Get elements
const toggleIngredientsBtn = document.getElementById('toggleIngredients');
const toggleStepsBtn = document.getElementById('toggleSteps');
const ingredientsList = document.getElementById('ingredientsList');
const stepsList = document.getElementById('stepsList');
const startCookingBtn = document.getElementById('startCooking');
const nextStepBtn = document.getElementById('nextStep');
const progressBar = document.getElementById('progressBar');
const timerDisplay = document.getElementById('timer');
const printBtn = document.getElementById('printRecipe');

let currentStep = -1; // no step highlighted initially
let timerInterval = null;
let totalPrepSeconds = 2700; // example: 5 minutes = 300 seconds
let timeLeft = totalPrepSeconds;

// Toggle Ingredients visibility
toggleIngredientsBtn.addEventListener('click', () => {
  if (ingredientsList.classList.contains('hidden')) {
    ingredientsList.classList.remove('hidden');
    toggleIngredientsBtn.textContent = 'Hide Ingredients';
  } else {
    ingredientsList.classList.add('hidden');
    toggleIngredientsBtn.textContent = 'Show Ingredients';
  }
});

// Toggle Steps visibility
toggleStepsBtn.addEventListener('click', () => {
  if (stepsList.classList.contains('hidden')) {
    stepsList.classList.remove('hidden');
    toggleStepsBtn.textContent = 'Hide Steps';
  } else {
    stepsList.classList.add('hidden');
    toggleStepsBtn.textContent = 'Show Steps';
  }
});

// Helper to clear all step highlights
function clearStepHighlights() {
  const steps = stepsList.querySelectorAll('li');
  steps.forEach(step => {
    step.style.backgroundColor = '';
    step.style.color = '';
    step.style.fontWeight = '';
  });
}

// Update progress bar width
function updateProgressBar() {
  const totalSteps = stepsList.children.length;
  if (currentStep < 0) {
    progressBar.style.width = '0%';
  } else {
    const percent = ((currentStep + 1) / totalSteps) * 100;
    progressBar.style.width = percent + '%';
  }
}

// Highlight current step
function highlightCurrentStep() {
  clearStepHighlights();
  if (currentStep >= 0 && currentStep < stepsList.children.length) {
    const step = stepsList.children[currentStep];
    step.style.backgroundColor = '#f0e68c';
    step.style.color = '#333';
    step.style.fontWeight = 'bold';
  }
}

// Timer functions
function startTimer() {
  timeLeft = totalPrepSeconds;
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      timerDisplay.textContent = 'Timer: Done!';
    }
  }, 1000);
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `Timer: ${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`;
}

// Start Cooking button handler
startCookingBtn.addEventListener('click', () => {
  currentStep = 0;
  highlightCurrentStep();
  updateProgressBar();
  // Show steps if hidden
  if (stepsList.classList.contains('hidden')) {
    stepsList.classList.remove('hidden');
    toggleStepsBtn.textContent = 'Hide Steps';
  }
  // Start timer
  if (!timerInterval) {
    startTimer();
  }
  // Enable next step button
  nextStepBtn.disabled = false;
});

// Next Step button handler
nextStepBtn.addEventListener('click', () => {
  const totalSteps = stepsList.children.length;
  if (currentStep < totalSteps - 1) {
    currentStep++;
    highlightCurrentStep();
    updateProgressBar();
  } else {
    // Last step reached - clear highlights, stop timer
    clearStepHighlights();
    currentStep = -1;
    updateProgressBar();
    stopTimer();
  }
  // Disable next step if no more steps
  nextStepBtn.disabled = currentStep === -1 || currentStep === totalSteps - 1;
});

// Initialize UI state
ingredientsList.classList.add('hidden');
stepsList.classList.add('hidden');
nextStepBtn.disabled = true;
updateProgressBar();
updateTimerDisplay();

// Print button handler
printBtn.onclick = () => {
  window.print();
};
