const question = document.querySelector(".question");
const answers = document.querySelector(".answers");
const spnQtd = document.querySelector(".spnQtd");
const textFinish = document.querySelector(".finish span");
const content = document.querySelector(".content");
const contentFinish = document.querySelector(".finish");
const btnRestart = document.querySelector(".finish button");

import questions from "./questions.js";

let currentIndex = 0;
let questionsCorrect = 0;

btnRestart.onclick = () => {
    content.style.display = "flex";
    contentFinish.style.display = "none";

    currentIndex = 0;
    questionsCorrect = 0;
    loadQuestion();
};

function nextQuestion(e) {
    const selectedButton = e.target;
    const correctButton = Array.from(document.querySelectorAll(".answer")).find(button => button.getAttribute("data-correct") === "true");

    if (selectedButton.getAttribute("data-correct") === "true") {
        questionsCorrect++;
        selectedButton.classList.add("correct-answer");
    } else {
        selectedButton.classList.add("incorrect-answer");
        // Mostra a resposta correta
        correctButton.classList.add("correct-answer");
    }

    // Desabilita todos os botões para evitar múltiplas respostas
    document.querySelectorAll(".answer").forEach(button => button.disabled = true);

    setTimeout(() => {
        if (currentIndex < questions.length - 1) {
            currentIndex++;
            loadQuestion();
        } else {
            finish();
        }
    }, 1000);
}

function finish() {
    textFinish.innerHTML = `Você acertou ${questionsCorrect} de ${questions.length}`;
    content.style.display = "none";
    contentFinish.style.display = "flex";
}

function loadQuestion() {
    spnQtd.innerHTML = `${currentIndex + 1}/${questions.length}`;
    const item = questions[currentIndex];
    answers.innerHTML = "";
    question.innerHTML = item.question;

    item.answers.forEach((answer) => {
        const div = document.createElement("div");

        div.innerHTML = `
            <button class="answer" data-correct="${answer.correct}">
                ${answer.option}
            </button>
        `;

        answers.appendChild(div);
    });

    document.querySelectorAll(".answer").forEach((item) => {
        item.addEventListener("click", nextQuestion);
    });
}

loadQuestion();