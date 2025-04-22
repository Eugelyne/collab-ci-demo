// Updated quiz data with categories
const quizData = {
    Science: [
        {
        question: "What is the chemical symbol for water?",
        options: ["H2O", "O2", "CO2", "NaCl"],
        correct: 0
    },
    {
        question: "What planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        correct: 1
    }
    ],
    History: [
        {
        question: "Who was the first President of the United States?",
        options: ["Abraham Lincoln", "Thomas Jefferson", "George Washington", "John Adams"],
        correct: 2

    },
    {
        question: "In which year did World War II end?",
        options: ["1945", "1939", "1918", "1963"],
        correct: 0
    }
    ]
};

let currentCategory = null;
let currentQuestionIndex = 0;
let score = 0;
let questions = [];

  // Function to select category
function selectCategory(category) {
    currentCategory = category;
    questions = quizData[category];
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("category-selection").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    loadQuiz();
}

  // Load quiz question
function loadQuiz() {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const submitButton = document.getElementById("submit");
    const resultElement = document.getElementById("result");
    const scoreElement = document.getElementById("score");
 
    resultElement.textContent = "";
    scoreElement.textContent = `Score: ${score} / ${currentQuestionIndex}`;

    if (currentQuestionIndex >= questions.length) {
        questionElement.textContent = "Quiz Finished!";
        optionsElement.innerHTML = "";
        submitButton.style.display = "none";
        scoreElement.textContent = `Final Score: ${score} / ${questions.length}`;
        return;
    }

    questionElement.textContent = questions[currentQuestionIndex].question;

    optionsElement.innerHTML = "";
    questions[currentQuestionIndex].options.forEach((option, index) => {
        const li = document.createElement("li");
        const radio = document.createElement("input");
        const label = document.createElement("label");
        radio.type = "radio";
        radio.name = "option";
        radio.value = index;
        label.textContent = option;
        li.appendChild(radio);
        li.appendChild(label);
        optionsElement.appendChild(li);
    });

    submitButton.style.display = "inline-block";
}

  // Check answer and progress
function checkAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    const resultElement = document.getElementById("result");

    if (!selectedOption) {
        alert("Please select an option.");
        return;
    }

    const isCorrect = parseInt(selectedOption.value) === questions[currentQuestionIndex].correct;
    if (isCorrect) {
        score++;
        resultElement.textContent = "Correct!";
    } else {
        resultElement.textContent = "Incorrect.";
    }

    currentQuestionIndex++;
    loadQuiz();
}

  // Initial setup: display category selection
function setupCategories() {
    const categoryContainer = document.getElementById("category-selection");
    categoryContainer.innerHTML = "";

    Object.keys(quizData).forEach(category => {
        const btn = document.createElement("button");
        btn.textContent = category;
        btn.onclick = () => selectCategory(category);
        categoryContainer.appendChild(btn);
    });

    document.getElementById("quiz-container").style.display = "none";
    categoryContainer.style.display = "block";
}

  // Event listener for submit button
document.getElementById("submit").addEventListener("click", checkAnswer);

  // Initialize app
setupCategories();
