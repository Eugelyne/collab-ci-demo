// Quiz questions and answers
const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Paris", "London", "Rome"],
        correct: 1
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Saturn", "Jupiter", "Uranus"],
        correct: 2
    },
    {
        question: "Who painted the Starry Night?",
        options: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Claude Monet"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;

// Function to load the quiz
function loadQuiz() {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const submitButton = document.getElementById("submit");

    questionElement.textContent = quizData[currentQuestion].question;

    optionsElement.innerHTML = "";
    quizData[currentQuestion].options.forEach((option, index) => {
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

    submitButton.addEventListener("click", checkAnswer);
}

// Function to check the answer
function checkAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
        const isCorrect = selectedOption.value == quizData[currentQuestion].correct;
        if (isCorrect) {
            score++;
        }

        document.getElementById("result").textContent = isCorrect ? "Correct!" : "Incorrect.";
        document.getElementById("score").textContent = `Score: ${score} / ${currentQuestion + 1}`;

        currentQuestion++;
        if (currentQuestion < quizData.length) {
            loadQuiz();
        } else {
            document.getElementById("question").textContent = "Quiz Finished!";
            document.getElementById("options").innerHTML = "";
            document.getElementById("submit").style.display = "none";
            document.getElementById("result").textContent = "";
            document.getElementById("score").textContent = `Final Score: ${score} / ${quizData.length}`;
        }
    } else {
        alert("Please select an option.");
    }
}

// Start the quiz
loadQuiz();
